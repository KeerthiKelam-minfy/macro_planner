import User from "../models/User.js";

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

const updateProfile = async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });
  res.json(user);
};

export { getProfile, updateProfile };
