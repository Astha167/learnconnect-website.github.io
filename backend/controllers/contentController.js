import Subject from '../models/Subject.js';
import Content from '../models/Content.js';
import User from '../models/User.js';

/* ------------------- ✅ Get All Content for a Subject ------------------- */
// @desc    Get all content for a subject by slug
// @route   GET /api/content/:slug
// @access  Public
const getContentBySubject = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the subject using its slug
    const subject = await Subject.findOne({ slug });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Fetch all content for that subject
    const content = await Content.find({ subject: subject._id }).sort({ order: 1 });

    if (!content.length) {
      return res.status(200).json({ message: 'No content available for this subject', content: [] });
    }

    res.status(200).json({
      subject: subject.name,
      content,
    });
  } catch (error) {
    console.error('❌ Error fetching content:', error);
    res.status(500).json({ message: 'Server error while fetching content' });
  }
};

/* -------------------- Your existing functions below -------------------- */
const incrementView = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const user = await User.findById(req.user._id);

    if (user.viewedContent.includes(content._id)) {
      return res.json({ views: content.views, alreadyViewed: true });
    }

    content.views += 1;
    await content.save();

    user.viewedContent.push(content._id);
    await user.save();

    res.json({ views: content.views, alreadyViewed: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getViewedContent = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ viewedContent: user.viewedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getContentBySubject, incrementView, getViewedContent };
