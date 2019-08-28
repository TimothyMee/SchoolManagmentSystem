const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.decode(token, config.get("jwtSecret"));
    if (decoded.type === config.get("roles.student")) {
      req.student = decoded.student;
    } else {
      req.staff = decoded.staff;
    }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
