require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");


////THIS IS SOCKET.IO STUFF
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
  }
});

server.listen(3001, () => {
  console.log("Socket running on port 3001");
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('question', (data) => {
    io.emit(data.quizSessionID + "question", data.question);
  });

  socket.on('answers', (data) => {
    io.emit(data.quizSessionID + "answer", data.answerSet);
  });

  socket.on('response', (data) => {
    io.emit(data.quizSessionID + "response", data);
  });

  socket.on('end', (data) => {
    io.emit(data.quizSessionID + "end");
  });

  socket.on('nextQuestion', (data) => {
    io.emit(data.quizSessionID + "nextQuestion", "Next Question Loaded");
  });
});

////THIS IS SOCKET.IO STUFF


// Sync DB
db.sequelize.sync().then(async () => {
  console.log("Database synced.");
});
//db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the recipe backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/LLM.routes")(app);
require("./app/routes/class.routes")(app);
require("./app/routes/quiz.routes")(app);
require("./app/routes/question.routes.js")(app);
require("./app/routes/answer.routes.js")(app);
require("./app/routes/quizSession.routes")(app);
require("./app/routes/response.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3201;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}


module.exports = app;
