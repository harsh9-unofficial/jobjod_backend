const Experience = require("../models/experienceModel");

// Create Experience
exports.createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all experiences for the logged-in user (using userId from token)
exports.getExperiencesForLoggedInUser = async (req, res) => {
  const userId = req.userId; // Access userId from the authenticated token

  try {
    // Fetch experiences based on the logged-in user's userId
    const experiences = await Experience.findAll({ where: { userId } });

    if (!experiences.length) {
      return res
        .status(404)
        .json({ message: "No experiences found for this user" });
    }

    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Experience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Experience
exports.deleteExperience = async (req, res) => {
  try {
    await Experience.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
