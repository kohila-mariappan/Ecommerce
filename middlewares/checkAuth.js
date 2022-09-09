const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied!, no token entered");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send({ error: "auth failed, check auth-token222" });
  }
};