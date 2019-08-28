const express = require("express");
const connectDB = require("./config/db");
var path = require("path");

const app = express();
//database connection
connectDB();

app.use(express.json({ extended: false }));
app.use("/", express.static(__dirname + "/public/apidoc"));

app.use("/api", require("./api"));

const PORT = 2000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started on port on ${PORT}`);
});
