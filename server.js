const express = require("express")
const db = require("./routes/db.config");
const dotenv = require("dotenv").config();
const app =  express();
const cookie = require("cookie-parser");
const PORT = process.env.PORT || 31000;
const server = require("http").Server(app)
// const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");


// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    }
  }));
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(express.json());



app.use("/", require("./routes/pages"));

server.listen(PORT); 
console.log("Server is running on", PORT)