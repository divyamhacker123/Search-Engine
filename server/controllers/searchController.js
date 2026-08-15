const engine = require('../services/searchInstance');

const getAutocomplete = (req, res) => {
    const query = req.query.q || "";
    if (query.length === 0) {
        return res.json({ suggestions: [] });
    }
    const suggestions = engine.getAutocompleteSuggestions(query);
    res.json({ suggestions });
};
const getSearch = (req, res) => {
    const query = req.query.q || "";
    if (query.length === 0) {
        return res.json({ results: [] });
    }
    const results = engine.search(query);
    res.json({ results });
};

module.exports = { getAutocomplete, getSearch };