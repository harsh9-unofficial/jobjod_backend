const Skill = require("../models/skillModel");

// Create Skill
exports.createSkill = async (req, res) => {
  try {
    const { userId, skill } = req.body; // Extract userId and skill from request body

    // Validate input
    if (!userId || !skill) {
      return res.status(400).json({ message: "userId and skill are required" });
    }

    // Create the skill in the database
    const newSkill = await Skill.create({
      userId, // Ensure userId is being correctly passed
      skill, // Ensure skill is being correctly passed
    });

    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSpecificData = async (req, res) => {
  const userId = req.userId; // Access userId from the authenticated token

  try {
    // Fetch user data from the database by the provided ID
    const userData = await Skill.findAll(userId);

    // If the user is not found
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the user data in the response
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

// Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Skill
exports.updateSkill = async (req, res) => {
  const { userId, skill } = req.body;
  try {
    const skills = await Skill.findOne(req.userId);
    if (!skills) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's information (excluding password)
    const updatedSkill = await skills.update({
      userId,
      skill,
    });
    res.status(200).json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
  try {
    await Skill.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
