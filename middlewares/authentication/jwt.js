const jwt = require("jsonwebtoken");
let key = "dbhujcbetyegwd673t2e8372ye328idbufybe8ywefdgvd";

const createToken = async (payload) => {
  const token = await jwt.sign(payload, key, { expiresIn: "7d" });
  return token ? token : console.log("Failed To Generate Token");
};

const verifyToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(404).json({ error: "Authorization Token Not Found" });
  } else {
    let decodeToken = await jwt.decode(token);
    return decodeToken
      ? next()
      : res.status(400).json({ error: "Token Is Invalid Or Expired" });
  }
};
module.exports = { createToken, verifyToken };
