const jwt = require("jsonwebtoken");
const userCheck = require("../Models/user");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).send("No token provided");
    }
    const decoded = jwt.verify(token, "jwtsecret");
    req.userCheck = decoded.userCheck;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid token");
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    console.log(req.userCheck.username);
    const userAdmin = await userCheck.findOne({username: req.userCheck.username})
    .select('-password')
    .exec()
    if(userAdmin.role !== "admin"){
      res.status(403).send("Admin access denied");
    }else{
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(403).send("Admin access denied");
  }
};
