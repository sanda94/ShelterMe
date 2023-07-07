// Third-party libraries & modules
const bcrypt = require("bcrypt");

// Custom libraries & modules
const LoginModel = require("../models/Login");
const { generateJWT } = require("../helpers/WebTokens");

// Function for create login
const createLogin = async (req, res) => {
  const { userName, emailAddress, password, userType } = req.body;

  // Check if user id already exist
  const login = await LoginModel.findOne({ emailAddress });

  if (login) {
    return res.json({ errors: { message: "User already exist!" } });
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 8);

  // Create new login
  const newLogin = new LoginModel({
    userName,
    emailAddress,
    password: hashedPassword,
    userType,
  });

  try {
    // Save login
    await newLogin.save();
    return res.status(201).json({
      created: true,
      success: { message: "Successfully created a login!" },
    });
  } catch (err) {
    return res.json({ errors: err });
  }
};

// Function for initialize the login
const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email doesn't exist
  const login = await LoginModel.findOne({ emailAddress: email });

  if (!login) {
    return res.json({ errors: { message: "Wrong email address!" } });
  }

  if (login.userType === "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  // Check if password matches
  const passMatch = await bcrypt.compare(password, login.password);
  if (!passMatch) {
    return res.json({ errors: { message: "Wrong password!" } });
  }

  // Generate a login token
  const loginToken = generateJWT(login);

  // Custom user data
  const userData = {
    userId: login._id,
    userName: login.userName,
    emailAddress: login.emailAddress,
    userType: login.userType,
  };

  return res
    .status(200)
    .json({ authentication: true, token: loginToken, data: userData });
};

// Function for initialize the login
const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email doesn't exist
  const login = await LoginModel.findOne({ emailAddress: email });

  if (!login) {
    return res.json({ errors: { message: "Wrong email address!" } });
  }

  if (login.userType !== "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  // Check if password matches
  const passMatch = await bcrypt.compare(password, login.password);
  if (!passMatch) {
    return res.json({ errors: { message: "Wrong password!" } });
  }

  // Generate a login token
  const loginToken = generateJWT(login);

  // Custom user data
  const userData = {
    userId: login._id,
    userName: login.userName,
    emailAddress: login.emailAddress,
    userType: login.userType,
  };

  return res
    .status(200)
    .json({ authentication: true, token: loginToken, data: userData });
};

// Function for get all logins
const getAllLogins = async (req, res) => {
  const { q, t } = req.query;

  let query;
  if (t != "") {
    query = {
      $or: [
        { userName: { $regex: new RegExp(q, "i") } },
        { emailAddress: { $regex: new RegExp(q, "i") } },
      ],
      userType: {
        $in: [t],
      },
    };
  } else {
    query = {
      $or: [
        { userName: { $regex: new RegExp(q, "i") } },
        { emailAddress: { $regex: new RegExp(q, "i") } },
      ],
    };
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized" } });
  }

  //Make sure the logged in user matches the user
  if (req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized" } });
  }

  try {
    const logins = await LoginModel.find(query);

    return res.status(200).json(logins);
  } catch (err) {
    return res.json({ errors: err });
  }
};

// Function for get login by user id
const getLoginByUserId = async (req, res) => {
  const login = await LoginModel.findById(req.params.id);

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized" } });
  }

  //Make sure the logged in user matches the user
  if (login._id !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized" } });
  }

  try {
    // Custom user data
    const userData = {
      userId: login._id,
      userName: login.userName,
      emailAddress: login.emailAddress,
      userType: login.userType,
      bio: login.bio,
      file: login.file,
    };

    return res.status(200).json(userData);
  } catch (err) {
    return res.json({ errors: err });
  }
};

// Function for update existing login
const updateLoginByUserId = async (req, res) => {
  const { password } = req.body;

  // Check if login is available
  const login = await LoginModel.findById(req.params.id);

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized" } });
  }

  //Make sure the logged in user matches the user
  if (login._id !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized" } });
  }

  if (login) {
    // If provided password empty use existing password as the new one
    if (password === "" || password === undefined) {
      req.body.password = login.password;
    } else {
      // Password hashing
      const hashPass = await bcrypt.hash(password, 8);
      req.body.password = hashPass;
    }
  } else {
    return res.json({ errors: { message: "Login not available!" } });
  }

  try {
    await LoginModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      created: true,
      success: { message: "Successfully updated the user!" },
    });
  } catch (err) {
    res.json({ errors: err });
  }
};

// Function for update existing login
const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  // Check if login is available
  const login = await LoginModel.find({ emailAddress: email });

  console.log(login);

  if (login.length > 0) {
    // If provided password empty use existing password as the new one
    if (password === "" || password === undefined) {
      req.body.password = login.password;
    } else {
      // Password hashing
      const hashPass = await bcrypt.hash(password, 8);
      req.body.password = hashPass;
    }
  } else {
    return res.json({ errors: { message: "User not available!" } });
  }

  try {
    await LoginModel.updateOne(
      { emailAddress: email },
      {
        $set: {
          password: req.body.password,
        },
      }
    );

    res.status(200).json({
      created: true,
      success: { message: "Successfully updated the user!" },
    });
  } catch (err) {
    res.json({ errors: err });
  }
};

// Function for delete login by user id
const deleteLoginByUserId = async (req, res) => {
  const login = await LoginModel.findById(req.params.id);

  // Check if login is available
  if (!login) {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  if (login._id === req.user._id) {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  //Make sure the logged in user matches the user
  if (login._id !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  try {
    await LoginModel.findByIdAndDelete(login._id);
    res.status(200).json({
      created: true,
      success: { message: "Use successfully deleted!" },
    });
  } catch (err) {
    res.json({ errors: err });
  }
};

module.exports = {
  createLogin,
  AdminLogin,
  UserLogin,
  getAllLogins,
  getLoginByUserId,
  updateLoginByUserId,
  updatePassword,
  deleteLoginByUserId,
};
