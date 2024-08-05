const jwt = require("jsonwebtoken");
const { keyURI } = require("../config/vars");

exports.authorize = (req, res, next) => {
  const requiredPath = req.path.split("/");
  const path = requiredPath[requiredPath.length - 1];
  console.log(path, "Path");

  if (path === "login" || path === "register") {
    next();
  } else {
    console.log(req.headers, "req.headers");
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Authorization token is missing",
      });
    }
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
