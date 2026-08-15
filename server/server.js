const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./config/db');
const loadWikipediaArticles = require('./services/wikiLoader');

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();
    await loadWikipediaArticles();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();