import Content from '../models/Content.js';
import User from '../models/User.js';

// @desc    Increment view count for content (only if user hasn't viewed before)
// @route   POST /api/content/:id/view
// @access  Private
const incrementView = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const user = await User.findById(req.user._id);

    // Check if user has already viewed this content
    if (user.viewedContent.includes(content._id)) {
      return res.json({ views: content.views, alreadyViewed: true });
    }

    // Increment view count
    content.views += 1;
    await content.save();

    // Add to user's viewed content
    user.viewedContent.push(content._id);
    await user.save();

    res.json({ views: content.views, alreadyViewed: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's viewed content IDs
// @route   GET /api/content/viewed
// @access  Private
const getViewedContent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ viewedContent: user.viewedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { incrementView, getViewedContent };