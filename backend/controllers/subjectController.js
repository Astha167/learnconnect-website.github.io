import Subject from '../models/Subject.js';
import Content from '../models/Content.js';

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).sort({ class: 1, name: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get subject by slug with its content
// @route   GET /api/subjects/:slug
// @access  Public
const getSubjectBySlug = async (req, res) => {
  try {
    const subject = await Subject.findOne({ slug: req.params.slug });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Get all content for this subject, sorted by order
    const content = await Content.find({ subject: subject._id }).sort({ order: 1 });

    res.json({
      subject,
      content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new subject (for admin/setup)
// @route   POST /api/subjects
// @access  Public (you can protect this later)
const createSubject = async (req, res) => {
  try {
    const { name, slug, class: classNum, description, imageUrl } = req.body;

    const subject = await Subject.create({
      name,
      slug,
      class: classNum,
      description,
      imageUrl,
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add content to a subject (for admin/setup)
// @route   POST /api/subjects/:slug/content
// @access  Public (you can protect this later)
const addContent = async (req, res) => {
  try {
    const subject = await Subject.findOne({ slug: req.params.slug });

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const { type, title, link, order } = req.body;

    const content = await Content.create({
      subject: subject._id,
      type,
      title,
      link,
      order,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllSubjects, getSubjectBySlug, createSubject, addContent };