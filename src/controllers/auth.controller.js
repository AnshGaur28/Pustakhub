const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
// const Profile  = require("../../../pustakhub-frontend/src/pages/profilePage.jsx");
const loginController = async (req, res) => {
  try {
    const inputData = req.body;
    //  verify the email and password of the user
    const user = await User.find({
      email: inputData.email,
    });
    if (!user) {
      res.status(401).send({ message: "No such user was found" });
    }
    //  if such a user is found
    console.log(user[0]);
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(inputData.password, saltRounds);
    const token = jwt.sign(
      {
        username : user[0].username ,
        email: user[0].email,
        password: hashedPassword,
        role: user[0].role,
        mobile : user[0].mobile,
        userId : user[0]._id
      },
      "JWT_SECRET"
    );
    return res
      .status(200)
      .json({ message: "Logged in successfully 😊 👌" , jwt : token });
  } catch (error) {
    console.log("Login Controller Failed" , error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const registerController = async (req, res) => {
  try {
    const {mobile , username , email , password , role} = req.body ;
    const existingUser = await User.findOne({email}) || await User.findOne({mobile}) ;
    if(existingUser){
        return res.status(400).send({message : "User with email or mobile already exists"})
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    const newUser = new User({
        username ,
        email ,
        password : hashedPassword, 
        mobile,
        role,
    }) ;
    await newUser.save()
    const token = jwt.sign({userId : newUser._id} , 'JWT_SECRET' ,{expiresIn : '1h'});
    return res.status(201).json({ success: true, user: newUser , jwt: token});
  } 
  catch (error) {
    // console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { loginController, registerController };
