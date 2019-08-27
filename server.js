const express = require("express");
const connectDB = require("./config/db");

const app = express();
//database connection
connectDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api", require("./api"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port on ${PORT}`);
});
