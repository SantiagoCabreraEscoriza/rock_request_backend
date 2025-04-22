class ApiError extends Error{
    /**
     * 
     * @param {string} message 
     * @param {number} statusCode 
     */
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

function errorMiddleware(err, req, res, next){
    const statusCode = err.statusCode || 500;

    res.status(statusCode).send({
        error: {
            message: err.message,
            statusCode: err.statusCode
        }
    })
}

module.exports = { errorMiddleware, ApiError }