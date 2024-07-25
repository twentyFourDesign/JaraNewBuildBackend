const { statusCode } = require("../../utils/statusCode");


const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode|| statusCode.serverError).json({msg:err.message || 'Server Error'})
};

class ErrorResponse extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const asyncErrorHandler = (passedFunction) => (req, res, next) => {
    Promise.resolve(passedFunction(req, res, next)).catch((err)=>{
        next(err)
    });
};

module.exports = {errorMiddleware,ErrorResponse,asyncErrorHandler}