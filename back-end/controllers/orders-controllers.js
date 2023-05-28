const fs = require("fs");

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Order = require("../models/cart");

const getOrderById = async (req, res, next) => {
    const { userEmail, orderId } = req.body;

    let orders;
    try {
    if (orderId) {
        orders = await Order.find({ _id: orderId });
    } else if (userEmail) {
        orders = await Order.find({ userEmail });      
    } else {
        const error = new HttpError('Invalid parameters.', 400);
        return next(error);
    }
    } catch (err) {
    const error = new HttpError('Something went wrong, could not find an order.', 500);
    return next(error);
    }

    if (orders.length === 0) {
    const error = new HttpError('Could not find order for the provided parameters.', 404);
    return next(error);
    }

    res.json({ orders: orders.map(order => order.toObject({ getters: true })) });
};



const createOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { userName, userEmail, userPhone, userAddress, total, order } = req.body;

    const orderItems = order.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
    }));

    const createdOrder = new Order({
        userName,
        userEmail,
        userPhone,
        userAddress,
        total,
        order: orderItems,
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrder.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Creating order failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ id: createdOrder._id });
};



exports.getOrderById = getOrderById;
exports.createOrder = createOrder;

