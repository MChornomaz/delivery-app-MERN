const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurant-routes");
const ordersRoutes = require("./routes/orders-routes");
const HttpError = require("./models/http-error");
const Restaurant = require('./models/restaurant')

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

app.use("/api/orders", ordersRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route.", 404);
    throw error;
});


mongoose
    .connect(
        `mongodb+srv://chornomazmaksym:OuNdZnvkbLQsvQug@cluster0.hcds7cq.mongodb.net/delivery?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen( 5000);
    })
    .catch((err) => {
        console.log(err);
    });


    