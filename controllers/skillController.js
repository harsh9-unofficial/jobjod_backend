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
