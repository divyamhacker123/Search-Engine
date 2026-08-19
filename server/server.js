const dotenv = require('dotenv');
// 1. Load the environment variables BEFORE requiring any other local modules
dotenv.config(); 

const app = require('./app');
const connectDB = require('./config/db');
const loadWikipediaArticles = require('./services/wikiLoader');

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    await loadWikipediaArticles();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();