const Animal = require("../models/Animal");

const getAllAnimal = async (req, res) => {
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
    const animal = await Animal.find(query);
    return res.status(200).json(animal);
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(400).json({ message: "Animal not found!" });
    }
    return res.status(200).json(animal);
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const addAnimal = async (req, res) => {
  console.log("add data");
  const { name, image, description, location, age, type, file } = req.body;
  const { _id } = req.user;

  try {
    const animal = await Animal.create({
      name,
      image,
      description,
      location,
      age,
      type,
      file,
      user: _id,
    });
    return res.status(200).json({
      success: { message: "Animal successful created!" },
    });
  } catch (error) {
    return res.json({
      errors: { message: Object.entries(error.errors)[0][1].message },
    });
  }
};

const updateAnimalById = async (req, res) => {
  console.log("updateAnimalById");
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return res.json({ errors: { message: "Animal not found!" } });
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not found!" } });
  }

  //Make sure the logged in user matches the note user
  if (animal.user !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
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

const deleteAnimalById = async (req, res) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    return res.json({ errors: { message: "Animal not found!" } });
  }

  // Check for user
  if (!req.user) {
    return res.json({ errors: { message: "User not found!" } });
  }

  //Make sure the logged in user matches the note user
  if (animal.user !== req.user._id && req.user.userType == "user") {
    return res.json({ errors: { message: "User not authorized!" } });
  }

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
  getAllAnimal,
  getAnimalById,
  addAnimal,
  updateAnimalById,
  deleteAnimalById,
};
