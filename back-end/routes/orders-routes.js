const express = require("express");
const { check } = require("express-validator");

const ordersControllers = require("../controllers/orders-controllers");

const router = express.Router();

router.post("/history", ordersControllers.getOrderById);


router.post(
    "/",
    [
        check("userName").not().isEmpty(),
        check("userEmail").not().isEmpty(),
        check("userAddress").not().isEmpty(),
        check("total").not().isEmpty(),
    ],
    ordersControllers.createOrder
);


module.exports = router;
