function NotFoundHandler(app){
    app.use((req, res, next) => {
        res.status(404).json({
            status: 'error',
            message: 'Not Found Route',
        });
    });
}
module.exports = NotFoundHandler
// This code defines a middleware function for handling 404 Not Found errors in an Express.js application