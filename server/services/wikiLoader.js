const axios = require("axios");
const engine = require("./searchInstance");

const topics = [
    "Artificial Intelligence", "Machine Learning", "JavaScript", "React",
    "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "Python",
    "Java", "C++", "Operating System", "Database", "Computer Science",
    "Data Structures", "Algorithms", "Binary Tree", "Graph"
];

const wikiHeaders = {
    "User-Agent": "MyCustomSearchEngine/1.0 (contact@example.com)"
};

async function loadWikipediaArticles() {
    console.log("Loading Wikipedia articles...");
    let count = 0;

    for (const topic of topics) {
        try {
            const searchResponse = await axios.get("https://en.wikipedia.org/w/api.php", {
                headers: wikiHeaders,
                params: { action: "query", list: "search", srsearch: topic, format: "json", origin: "*" }
            });

            const searchResults = searchResponse.data.query.search;
            if (searchResults.length === 0) continue;

            const pageid = searchResults[0].pageid;
            const articleResponse = await axios.get("https://en.wikipedia.org/w/api.php", {
                headers: wikiHeaders,
                params: { action: "query", prop: "extracts", pageids: pageid, explaintext: true, exintro: true, format: "json", origin: "*" }
            });

            const page = articleResponse.data.query.pages[pageid];
            
            engine.addDocument(page.pageid.toString(), page.title, page.extract);
            
            count++;
            console.log(`Indexed: ${page.title}`);
        } catch (err) {
            console.log("Failed:", topic, err.message);
        }
    }
    console.log(`\nFinished indexing ${count} Wikipedia articles.\n`);
}

module.exports = loadWikipediaArticles;