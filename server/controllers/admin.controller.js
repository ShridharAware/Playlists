const { adminService } = require("../services");

exports.createAdmin = async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUsers = async (req, res) => {
  try {
    res.status(200).json(await adminService.getUsers());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const user = await adminService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
