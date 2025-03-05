const Education = require("../models/educationModel");

// Create Education
exports.createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all experiences for the logged-in user (using userId from token)
exports.getEducationForLoggedInUser = async (req, res) => {
  const userId = req.userId; // Access userId from the authenticated token

  try {
    // Fetch experiences based on the logged-in user's userId
    const educationRecords = await Education.findAll({ where: { userId } });

    if (!experiences.length) {
      return res
        .status(404)
        .json({ message: "No experiences found for this user" });
    }

    res.status(200).json(educationRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all education records
exports.getAllEducation = async (req, res) => {
  try {
    const educationRecords = await Education.findAll();
    res.status(200).json(educationRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Education
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Education
exports.deleteEducation = async (req, res) => {
  try {
    await Education.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Education record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
