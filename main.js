const express = require('express');
// This is a simple Express.js application that sets up a server and listens on port 3000.
const dotenv = require('dotenv');
dotenv.config();
const NotFoundHandler = require('./src/common/exception/not-found.handler.js');
const AllExceptionHandler = require('./src/common/exception/all-exception.handler.js');
const SwaggerConfig = require('./src/config/swagger.config.js');
const mainRouter = require('./src/app.routes.js');
const cookieParser = require('cookie-parser');
require ('./src/config/mongoose.config.js');
async function main() {
    const app = express();
    const port = process.env.PORT; 
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
    SwaggerConfig(app)
    app.use(mainRouter);
    NotFoundHandler(app) 
    AllExceptionHandler(app);
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
    }
    main();