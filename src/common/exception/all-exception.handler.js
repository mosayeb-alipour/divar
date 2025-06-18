function AllExceptionHandler(app){
    app.use((err,req, res, next) => {
        let status = err?.status ?? err?.statusCode ?? err?.code;
        if (!status || isNaN(+status) || status > 511 || status < 200) status = 500
        res.status(status).json({
            message: err?.message ?? err?.stack ?? "Internal Server Error"
        });
    });
}
module.exports = AllExceptionHandler
// This code defines a middleware function for handling 404 Not Found errors in an Express.js application