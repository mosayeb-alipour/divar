const express = require('express');
// This is a simple Express.js application that sets up a server and listens on port 3000.
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config.js');
const mainRouter = require('./src/app.routes.js');
dotenv.config();
// Load environment variables from .env file
// If you have a .env file, make sure to create it in the root directory with your environment variables.
async function main() {
    const app = express();
    const port = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
    // Middleware conection to MongoDB
    require ('./src/config/mongoose.config.js');
    app.use(express.json()); // Middleware to parse JSON request bodies
    app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies
    swaggerConfig(app)
    // Sample route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use(mainRouter);
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
    }
    main();