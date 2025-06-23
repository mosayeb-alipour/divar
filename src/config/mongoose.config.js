const {default: mongoose} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// Load environment variables from .env file
// If you have a .env file, make sure to create it in the root directory with your environment variables.
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.error(err?.message ?? 'Failed DB connection');
});