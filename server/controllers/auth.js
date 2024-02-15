const user = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require('morgan')

//localhost:5000/api/register
exports.register = async (req, res) => {
  try {
    //1. Check user is already ??
    const { username, password } = req.body;

    let userCheck = await user.findOne({ username });
    if (userCheck) {
      return res.send("user already registered").status(400);
    }
    //2. Encrypt
    const salt = await bcrypt.genSalt(10);
    userCheck = new user({
      username,
      password,
    });
    userCheck.password = await bcrypt.hash(password, salt);

    //3. Save
    await userCheck.save();
    res.send("registers successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Check user  ??
    const { username, password } = req.body;
    let userCheck = await user.findOneAndUpdate({ username }, { new: true });
    if (userCheck) {
      const isMatch = await bcrypt.compare(password, userCheck.password);
      if (!isMatch) {
        return res.status(400).send("Username or Password Invalid !!!");
      }
      // 2. Payload
      let payload = {
        userCheck: {
          username: userCheck.username,
          role: userCheck.role
        },
      };
      // 3. Generate token
      jwt.sign(payload, "jwtsecret", { expiresIn: '1d' },(err, token) => {
        if (err) throw err;
        req.user = payload.user;
        res.json({token, payload})
      });
    }else{
        return res.status(400).send('user not found!!!')
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


exports.currentUser = async (req, res) => {
  try {
    console.log('currentUser', req.userCheck);
    // Check if there is user data in req.user
    if (!req.userCheck) {
      return res.status(401).json({ msg: 'No user found!' });
    }
    // Send user data back to the user
    const userCheck = await user.findOne({username:req.userCheck.username})
    .select('-password')
    .exec()
    res.send(userCheck)
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};