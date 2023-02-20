const express = require("express");
const cors = require("cors");

const { message } = require('./app/middleware/message');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", message ,(req, res) => {
  res.json({ message: "Welcome to Vans Sneaker Store." });
});

require("./app/routes/vans.routes.js")(app);

const PORT = process.env.PORT || 2023;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});