const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.getRecommendations = async (req, res) => {
  try {
    const books = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ error: "Invalid input. 'books' must be a non-empty array." });
    }

    const bookList = books.join(", ");
    const prompt = `Based on the following list of books: ${bookList}, recommend some similar books the I might enjoy. Give your response in JSON format. I only need the book's name, publishers and author. Include literally nothing else, just the JSON request itself.`;

    const response = await cohere.generate({
      prompt,
      model: "command",
    });
    
    res.json({ recommendations: response.generations[0].text.trim() });
  } catch (error) {
    console.error("Cohere API error:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};