const express = require('express');
// This is a simple Express.js application that sets up a server and listens on port 3000.
const dotenv = require('dotenv');
dotenv.config();
// Load environment variables from .env file
// If you have a .env file, make sure to create it in the root directory with your environment variables.
async function main() {
    const app = express();
    const port = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
    // Middleware conection to MongoDB
    require ('./src/config/mongoose.config.js');
    // Middleware to parse JSON bodies
    app.use(express.json());
    
    // Sample route
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    
    // Start the server
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
    }
    main();