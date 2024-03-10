import bcrypt from 'bcrypt';
import User from "../models/users.js";
import token from '../utils/token.js';

export const login = async (req, res) => {
  try {
    const {userName, password} = req.body;
    const user = await User.findOne({userName});

    if(!user) {
      return res.status(400).json({error: 'No such user exists'});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      return res.status(400).json({error: "Password is incorrect"});
    }

    token(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      gender: user.gender,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.log('Issue in login', error.message);
    res.status(500).json({error: "Internal server error"});
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logout successfully"});
  } catch (error) {
    console.log('Issue in logout', error.message);
    res.status(500).json({error: "Internal Server Error"});
  }
};

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if(password !== confirmPassword) {
      return res.status(400).json({error: "Passwords don't match"});
    }

    const user = await User.findOne({userName});

    if(user) {
      return res.status(400).json({error: "UserName already exists"});
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender == "Male" ? boyProfilepic : girlProfilePic
    });

    if(newUser) {
      //generate jwt
      token(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic
      });
    } else {
      res.status(401).json({error: "Invalid user data"});
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error: 'Internal Server error'});
  }
};
