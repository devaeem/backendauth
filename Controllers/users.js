const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.resgister = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already exists");
    }
    const salt = await bcrypt.genSalt(10);
    console.log(user);
    user = new User({
      username,
      password,
    });
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("Resgister success");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.listuser = async (req, res) => {
  try {
    const user = await User.find({}).select('-password').exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readuser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({_id:id}).select('-password').exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.edituser = async (req, res) => {
  try {
      var id = req.body.values.id;
      var password = req.body.values.password;
      console.log(id);
      console.log(password);
       const salt = await bcrypt.genSalt(10);
      var enPasword = await bcrypt.hash(password, salt);
       const user = await User.findOneAndUpdate({_id:id}
        ,{password:enPasword});
      
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeuser = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOneAndDelete({_id:id});
    res.send("ลบข้อมูลเรียบร้อย");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


exports.changStatus = async (req, res) => {
  try {
   console.log(req.body)
   const user = await User.findOneAndUpdate({_id:req.body.id}
    ,{enabled:req.body.enabled});
    // const user = await User.findOneAndDelete({_id:id});
      res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};


exports.changRole = async (req, res) => {
  try {
   console.log(req.body)
      const user = await User.findOneAndUpdate({_id:req.body.id}
    ,{role:req.body.role});
    // const user = await User.findOneAndDelete({_id:id});
     res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

