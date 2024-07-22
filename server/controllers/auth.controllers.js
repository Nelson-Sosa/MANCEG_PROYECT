const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  User.create({ username, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
        }

        // Extract the username from the user object
        const { username, _id } = user;

        // Generate the JWT token
        const token = jwt.sign({ id: _id }, "secret", { expiresIn: "1h" });

        // Return the username and token in the response
        res.json({ username, token });
      });
    })
    .catch((err) => res.status(400).json(err));
};
