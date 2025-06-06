const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

exports.getRecommendations = async (req, res) => {
  try {
    const books = req.body.map(entry => entry.book?.title);
    if (books.length === 0) {
      return res.status(400).json({ error: "Invalid input." });
    }
    const bookList = books.join(", ");
    const prompt = `Based on the following list of books: ${bookList}, recommend some similar books the I might enjoy. Give your response in JSON format. I only need the book's name, publishers and author. Include literally nothing else, just the JSON request itself.
    Don't give me the genre, just books, authors, and publishers. Just a list of books and nothing else`;
    const response = await cohere.chat({
      "model": "command-a-03-2025",
      "role": "user",
      "message": prompt
    });
    res.json(response.text);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to get recommendations" });
  }
};