const jwt = require("jsonwebtoken");
const jwtSecret ="541657132c6ca0bf0672c3def16682ee44e6f8bfd417df755b5669d57ad7bd1e1422a7";


exports.adminAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "Admin") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.userAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

exports.registerCookie = (res, jwt, email, role) => {
  const maxAge = 3 * 60 * 60;
  const token = jwt.sign({ email: email, role: role }, jwtSecret, {
    expiresIn: maxAge,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: maxAge * 1000, // in miliseconds (because its a timestamp)
  });
};
