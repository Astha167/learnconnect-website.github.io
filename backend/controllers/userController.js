// @desc    Get current user profile
// @route   GET /api/user/me
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      username: req.user.username,
    };

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUserProfile };