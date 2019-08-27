const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    // let user = await User.findOne({ email });
    // if (!user) {
    //   return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    // }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    // }
    // const payload = {
    //   user: {
    //     id: user.id
    //   }
    // };
    // jwt.sign(
    //   payload,
    //   config.get("jwtSecret"),
    //   { expiresIn: 36000 },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token: token });
    //   }
    // );
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  login
};
