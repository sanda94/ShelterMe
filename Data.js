const Animal = require("../models/Animal");
const AnimalFound = require("../models/AnimalFound");
const Login = require("../models/Login");

const getAllCount = async (req, res) => {
  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized" } });
  }

  //Make sure the logged in user matches the user
  if (req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  try {
    const logins = await Login.find().count();
    const animal = await Animal.find().count();
    const animalFound = await AnimalFound.find().count();

    const userData = [
      {
        name: "Users",
        value: logins,
      },
      {
        name: "Animals",
        value: animal,
      },
      {
        name: "Animals Found",
        value: animalFound,
      },
    ];

    return res.status(200).json(userData);
  } catch (err) {
    return res.json({ errors: err });
  }
};

module.exports = {
  getAllCount,
};
