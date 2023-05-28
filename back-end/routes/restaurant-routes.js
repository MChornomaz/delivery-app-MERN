const express = require("express");

const restaurantController = require("../controllers/restaurant-controllers");


const router = express.Router();

router.get("/", restaurantController.getRestaurants);


module.exports = router;
