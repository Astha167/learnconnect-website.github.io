import express from 'express';
import { reseedDatabase } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Optional: Only allow admin users (if you have role-based auth)
router.post('/reseed', protect, reseedDatabase);

export default router;
