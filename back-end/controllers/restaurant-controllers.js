

const HttpError = require("../models/http-error");
const Restaurant = require("../models/restaurant");

const getRestaurants = async (req, res, next) => {
    let restaurants;
    try {
        restaurants = await Restaurant.find({});
    } catch (err) {
        const error = new HttpError(
            "Fetching users failed, please try again later.",
            500
        );
        return next(error);
    }
    res.json({ restaurants: restaurants.map((restaurant) => restaurant.toObject({ getters: true })) });
};





exports.getRestaurants = getRestaurants;

