const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "rannlab", (error, user) => {
      if (error) return reject(error);

      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(400).send({ message: "authorization token was not provided or not valid" });

  const token = req.headers.authorization.split(" ")[1];

  let user;

  try {
    user = await verifyToken(token);
  } catch (error) {
    res.send(500).send({ message: "authorization token was not provided or not valid" });
  }

  req.user = user.user;

  return next();
};