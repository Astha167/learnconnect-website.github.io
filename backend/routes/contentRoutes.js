import express from 'express';
import { incrementView, getViewedContent } from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id/view', protect, incrementView);
router.get('/viewed', protect, getViewedContent);

export default router;