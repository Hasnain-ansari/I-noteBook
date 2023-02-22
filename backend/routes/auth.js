const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator"); 
//this bcrypt package help to encrypt the password
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Harryisagoodb$oy';


// ROUTE:1 create a user using : POST "/api/auth/createuser" No Login Require
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid username").isLength({ min: 5 }),
    body("password", "password must be minimum 4 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors return bad requet and the error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,  errors: errors.array() });
    }

    //else create the new user and save the inputs in the database
    //check whwter the user exist already
    //we are using try catch for any errors
    try {
      let user = await User.findOne({ email: req.body.email });
      //findone is methid to find some queries here we aree finding if the email alredy exist if exist then return 400 bad request else  create the user
      if (user) {
        //here we are sending error message
        return res.status(400).json({success,  error: "Sorry! user with this email already exist" });
      }

      //this is a way to add some string called salt with the password to generate the hash value of passward and salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //creating new user with required name email and password
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        User:{
          id: User.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);

      //here we are just checking the response if we are getting the user or not
      // res.json(user);
      success = true;
      res.json({success, authToken});


    } catch (error) {
        // catching the error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);



//ROUTE:2 Authenticate a user using : POST "/api/auth/login" No Login Require
router.post( "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
    
  ],
  async (req, res) => {
    let success = false;
    //if there are errors return bad requet and the error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        success = false;
        res.status(400).json({error: "please try to login with valid credentials"})
      }
      
      const comparePassword = await bcrypt.compare(password, user.password);
      if(!comparePassword){
        success = false;
         res.status(400).json({success, error: "please try to login with valid credentials"})

      }

      const data = {
        User:{
          id: User.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken});



    } catch (error) {

      console.error(error.message);
      res.status(500).send("Internal server error");

    }

  });





//ROUTE:3 Get logged in user detail using : POST "/api/auth/getuser" Login Required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    
    const userId = req.user;
    console.log({userId});
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
      console.error(error.message);
      res.status(500).send({error: "internal server error"});
  }

});

module.exports = router;

