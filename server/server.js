const express = require("express");
const cors = require("cors");
const axios = require("axios");
// Ensure SearchEngine.js exists in the same directory!
const SearchEngine = require("./SearchEngine"); 

const app = express();
const engine = new SearchEngine();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Topics to index when server starts
const topics = [
    "Artificial Intelligence",
    "Machine Learning",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "Operating System",
    "Database",
    "Computer Science",
    "Data Structures",
    "Algorithms",
    "Binary Tree",
    "Graph",
    "Dynamic Programming"
];

// Wikipedia strictly requires a User-Agent header
const wikiHeaders = {
    "User-Agent": "MyCustomSearchEngine/1.0 (contact@example.com)"
};

// ------------------------
// Load Wikipedia Articles
// ------------------------

async function loadWikipediaArticles() {
    console.log("Loading Wikipedia articles...");
    let count = 0;

    for (const topic of topics) {
        try {
            // Search for article
            const searchResponse = await axios.get(
                "https://en.wikipedia.org/w/api.php",
                {
                    headers: wikiHeaders,
                    params: {
                        action: "query",
                        list: "search",
                        srsearch: topic,
                        format: "json",
                        origin: "*"
                    }
                }
            );

            const searchResults = searchResponse.data.query.search;

            if (searchResults.length === 0) {
                continue;
            }

            const pageid = searchResults[0].pageid;

            // Fetch full article
            const articleResponse = await axios.get(
                "https://en.wikipedia.org/w/api.php",
                {
                    headers: wikiHeaders,
                    params: {
                        action: "query",
                        prop: "extracts",
                        pageids: pageid,
                        explaintext: true,
                        exintro: true,
                        format: "json",
                        origin: "*"
                    }
                }
            );

            const page = articleResponse.data.query.pages[pageid];

            engine.addDocument(
                page.pageid.toString(),
                page.title,
                page.extract
            );

            count++;
            console.log(`Indexed: ${page.title}`);

        } catch (err) {
            console.log("Failed:", topic, err.message);
        }
    }

    console.log(`\nFinished indexing ${count} Wikipedia articles.\n`);
}

// ------------------------
// Autocomplete
// ------------------------

app.get("/api/autocomplete", (req, res) => {
    const query = req.query.q || "";

    if (query.length === 0) {
        return res.json({
            suggestions: []
        });
    }

    const suggestions = engine.getAutocompleteSuggestions(query);

    res.json({
        suggestions
    });
});

// ------------------------
// Search
// ------------------------

app.get("/api/search", (req, res) => {
    const query = req.query.q || "";

    if (query.length === 0) {
        return res.json({
            results: []
        });
    }

    const results = engine.search(query);

    res.json({
        results
    });
});

// ------------------------
// Start Server
// ------------------------

async function startServer() {
    await loadWikipediaArticles();

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer();