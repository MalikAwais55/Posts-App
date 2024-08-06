const jwt = require("jsonwebtoken");
const { keyURI } = require("../config/vars");

exports.authorize = (req, res, next) => {
  const requiredPath = req.path.split("/");
  const path = requiredPath[requiredPath.length - 1];

  if (path === "login" || path === "register") {
    next();
  } else {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Authorization token is missing",
      });
    }
    console.log(token, "token")
    try {
      const decoded = jwt.verify(token, keyURI);
      req.user = decoded.userId;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({
        message: "Invalid or expired token",
      });
    }
  }
};
