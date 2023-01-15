const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err };
    if (err.name === "CastError") {
        error = new ErrorResponse(`${err.value} is not a valid ID`, 404);
    }
    if (err.code === 11000) {
        const error = new ErrorResponse(`Duplicate field value entered`, 400);
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        const error = new ErrorResponse(message, 400);
    }
    if (err) {
        console.log(err);
        res.status(error.statusCode || 500).render("login", {
            message: error.message || "Server Error",
        });
    }
    next();
};

module.exports = errorHandler;