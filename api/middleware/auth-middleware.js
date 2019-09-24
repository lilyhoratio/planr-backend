const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets.js");

module.exports = {
  restricted,
  generateToken,
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Credentials are invalid." });
      } else {
        req.user = {
          email: decodedToken.email,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided." });
  }
}

function generateToken(user) {
  const payload = {
    email: user.email,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
