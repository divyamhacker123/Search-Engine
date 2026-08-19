const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateRAGAnswer(query, contextDocs) {
    if (!contextDocs || contextDocs.length === 0) {
        return "I couldn't find enough relevant information in the index to answer that.";
    }
    const model = genAI.getGenerativeModel({ model: "google_genai:gemini-3.5-flash" });
    const contextString = contextDocs
        .map((doc, i) => `[Source ${i + 1}: ${doc.title}]\n${doc.content}`)
        .join('\n\n');

    const prompt = `You are an AI assistant integrated into a custom search engine. 
    Answer the user's query using ONLY the provided Context below. 
    If the answer is not in the context, explicitly state "I cannot answer this based on the current search results."

    Context:
    ${contextString}

    User Query: ${query}
    Answer:`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("LLM Error:", error);
        return "An error occurred while generating the AI overview.";
    }
}

module.exports = { generateRAGAnswer };