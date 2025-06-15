const apiClient = require("./../utils/llmService.js").default;

exports.getRecommendations = async (req, res) => {
  try {
    const books = req.body.map(entry => entry.book.title); // get the list of book titles=
    if (books.length === 0) {=
      return res.status(400).json({ error: "Invalid input." });
    }

    const bookList = books.join(", "); // convert list of books into a single string list
    // Create a prompt for the cohere ai to use
    const prompt = `Based on the following list of books: ${bookList}, recommend some similar books the I might enjoy. Give your response in JSON format. I only need the book's name, publishers and author. Include literally nothing else, just the JSON request itself.
    Don't give me the genre, just books, authors, and publishers. Just a list of books and nothing else. Do not recommend me an entire series, if you do just pick the first book.`;
    
    // Construct the body for the REST API request
    const body = {
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt,
            }
          ]
        }
      ],
      "model": "command-a-03-2025",
    }

    // Send request, extract text, and return it
    const response = await apiClient.post("chat/", body);
    const text = response.data.message.content[0].text;
    res.json(text);

  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to get recommendations."});
  }
}