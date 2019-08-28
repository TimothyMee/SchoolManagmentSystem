const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const Staff = require("../models/Staff");
const Student = require("../models/Students");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    let user = "";
    if (role === config.get(Student)) {
      user = await Student.findOne({ email });
    } else {
      user = await Staff.findOne({ email });
    }

    if (!user) {
      return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    }
    if (role === config.get(Student)) {
      const payload = {
        student: {
          id: user.id
        }
      };
    } else {
      const payload = {
        staff: {
          id: user.id
        }
      };
    }
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  login
};
