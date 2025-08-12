const apiClient = require("./../utils/llmService.js");
const db = require("../models");
const Class = db.class;

exports.getRecommendations = async (req, res) => {
  try {
    if (req.body.subject === undefined || req.body.subject === '' || req.body.type === undefined || req.body.type === '') {
      return res.status(400).json({ error: "Invalid input." });
    }
    const type = req.body.type;
    const subject = req.body.subject;
    // Create a prompt for the cohere ai to use
    let prompt;
    if(type === "quiz")
    prompt = `Generate me a ${type} with 10 question about '${subject}' in the following format:{"questionText":""}
    with 4 answers for each question with at least one correct answer in the following format:
    {"answerText":"", "isCorrect":true}. Give your response in JSON format.`;
    else
    prompt = `Generate me a ${type} with 10 question about '${subject}' in the following format:{"questionText":""}
    with 4 answers for each question in the following format:
    {"answerText":"", "isCorrect":true}. Give your response in JSON format.`;
    // Construct the body for the REST API request
    const body = {
      "messages": [
        {
				"role": "system",
				"content": "You are a Academic assistant"
			  },
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

exports.generateQuizForClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (id === undefined || id <= 0) {
      return res.status(400).json({ error: "Invalid input." });
    }
    let name;
    Class.findByPk(id)
    .then(async (data) => {
      name = data.name;
      // Create a prompt for the cohere ai to use
      let prompt = `Generate me a Quiz in the following format: {"name":"","subject":""} with 10 question
      that is over a unit that would be covered in a Class Titled ${name} in the following format:{"questionText":""}
      with 4 answers for each question with at least one correct answer in the following format:
      {"answerText":"", "isCorrect":true}. Give your response in JSON format ONLY!.`;
      // Construct the body for the REST API request
      const body = {
        "messages": [
          {
          "role": "system",
          "content": "You are a Academic assistant"
          },
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
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Class with id=" + id,
      });
    });
    

  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Failed to get recommendations."});
  }
}