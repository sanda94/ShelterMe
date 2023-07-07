const mongoose = require("mongoose");
const AnimalFound = require("../models/AnimalFound");

const getAllAnimalFound = async (req, res) => {
  const { q, t } = req.query;
  let query;
  if (t != "") {
    query = {
      $or: [
        { name: { $regex: new RegExp(q, "i") } },
        { location: { $regex: new RegExp(q, "i") } },
      ],
      type: {
        $in: [t],
      },
    };
  } else {
    query = {
      $or: [
        { name: { $regex: new RegExp(q, "i") } },
        { location: { $regex: new RegExp(q, "i") } },
      ],
    };
  }
  try {
    const animal = await AnimalFound.find(query);
    return res.status(200).json(animal);
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const getAllAnimalFoundByUser = async (req, res) => {
  const { u } = req.query;
  try {
    const animal = await AnimalFound.find({ user: u });
    return res.status(200).json(animal);
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const getAnimalFoundById = async (req, res) => {
  try {
    const animal = await AnimalFound.findById(req.params.id);

    if (!animal) {
      return res.json({ errors: { message: "Animal not found!" } });
    }
    return res.status(200).json(animal);
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const addAnimalFound = async (req, res) => {
  // console.log(req.user);
  const {
    name,
    image,
    description,
    location,
    phoneNumber,
    age,
    type,
    longitude,
    latitude,
    file,
  } = req.body;
  const { _id } = req.user;

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  try {
    const animal = await AnimalFound.create({
      name,
      image,
      description,
      location,
      phoneNumber,
      age,
      type,
      longitude,
      latitude,
      file,
      user: _id,
    });

    return res.status(200).json({
      success: { message: "Animal successfully created!" },
    });
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const updateAnimalFoundById = async (req, res) => {
  const animal = await AnimalFound.findById(req.params.id);

  if (!animal) {
    return res.json({ errors: { message: "Animal not found!" } });
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized!" } });
  }
  console.log(req.user);
  //Make sure the logged in user matches the note user
  if (animal.user !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  try {
    const updatedAnimal = await AnimalFound.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json({
      success: { message: "Animal successfully updated!" },
    });
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const deleteAnimalFoundById = async (req, res) => {
  console.log(req.user);
  const animal = await AnimalFound.findById(req.params.id);

  if (!animal) {
    return res.json({ errors: { message: "Animal not found!" } });
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  // // Make sure the logged in user matches the note user
  // if (animal.user !== req.user._id && req.user.userType == "user") {
  //   return res.json({ errors: { message: "User not authorized!" } });
  // }

  try {
    await animal.remove();

    return res.status(200).json({
      success: { message: "Animal successfully deleted!" },
    });
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

module.exports = {
  getAllAnimalFound,
  getAllAnimalFoundByUser,
  getAnimalFoundById,
  addAnimalFound,
  updateAnimalFoundById,
  deleteAnimalFoundById,
};
