const errorHandler = (error, req, res, next) => {
    console.error(error);

    res.status(error.status || 500).json({
        status: false,
        message: error.message || "Internal Server Error",
    });
};

module.exports = errorHandler;