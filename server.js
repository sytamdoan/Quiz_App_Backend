require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");


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

//require("./app/routes/auth.routes.js")(app);
//testingg
;//require("./app/routes/author.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/LLM.routes")(app);
require("./app/routes/class.routes")(app);
require("./app/routes/quiz.routes")(app);
require("./app/routes/quizSession.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
