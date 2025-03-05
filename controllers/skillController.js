const Skill = require("../models/skillModel");

// Create Skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
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
  try {
    const skill = await Skill.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(skill);
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
