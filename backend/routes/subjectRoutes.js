import express from 'express';
import {
  getAllSubjects,
  getSubjectBySlug,
  createSubject,
  addContent,
} from '../controllers/subjectController.js';

const router = express.Router();

router.get('/', getAllSubjects);
router.post('/', createSubject);
router.get('/:slug', getSubjectBySlug);
router.post('/:slug/content', addContent);

export default router;