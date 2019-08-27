const express = require("express");
const { check } = require("express-validator");
var router = express.Router();

router.get("/home", (req, res) => {
  res.send("API Running");
});
module.exports = router;
