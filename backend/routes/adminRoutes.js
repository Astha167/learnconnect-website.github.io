import express from 'express';
import { reseedDatabase, resyncDatabase } from '../controllers/adminController.js';

const router = express.Router();

/**
 * @route   POST /api/admin/reseed
 * @desc    Run addContent.js logic (full reseed)
 * @access  Admin only
 */
router.post('/reseed', reseedDatabase);

/**
 * @route   POST /api/admin/resync
 * @desc    Run resyncContent.js logic (partial sync)
 * @access  Admin only
 */
router.post('/resync', resyncDatabase);

export default router;
