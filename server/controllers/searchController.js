const engine = require('../services/searchInstance');
const { generateRAGAnswer } = require('../services/llmService');

const getAutocomplete = (req, res) => {
    const { q } = req.query;
    const suggestions = engine.getAutocompleteSuggestions(q);
    res.json({ suggestions });
};

const getSearch = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
        // 1. Retrieve standard keyword matches from the Inverted Index
        const standardResults = engine.search(q);

        // 2. Take the top 3 most relevant documents to act as RAG context
        // (Sending too many documents can exceed token limits or confuse the LLM)
        const topDocsForContext = standardResults.slice(0, 3);

        // 3. Generate the AI Overview asynchronously
        let aiOverview = "No results found to generate an overview.";
        if (topDocsForContext.length > 0) {
            aiOverview = await generateRAGAnswer(q, topDocsForContext);
        }

        // 4. Return the combined payload to the client
        res.json({
            query: q,
            aiOverview: aiOverview,
            results: standardResults
        });

    } catch (error) {
        console.error("Search Controller Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getAutocomplete, getSearch };