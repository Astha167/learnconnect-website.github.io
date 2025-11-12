import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import addContent from '../addContent.js';   // Full reseed
import resyncContent from '../resyncContent.js'; // Partial sync

dotenv.config();

/**
 * Simple admin authentication check using your JWT user info.
 * Adjust as needed for your actual user model.
 */
const verifyAdmin = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Only allow your admin email (replace with your own)
    return decoded.email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
};

/**
 * POST /api/admin/reseed
 * Re-seed the entire database (like running addContent.js)
 */
export const reseedDatabase = async (req, res) => {
  try {
    if (!verifyAdmin(req)) {
      return res.status(403).json({ message: '❌ Access denied. Admin only.' });
    }

    console.log('🔁 Running full reseed...');
    await addContent();
    res.json({ message: '✅ Database reseeded successfully!' });
  } catch (error) {
    console.error('❌ Error reseeding database:', error);
    res.status(500).json({ message: 'Error reseeding database', error: error.message });
  }
};

/**
 * POST /api/admin/resync
 * Re-sync only changed/added content (like running resyncContent.js)
 */
export const resyncDatabase = async (req, res) => {
  try {
    if (!verifyAdmin(req)) {
      return res.status(403).json({ message: '❌ Access denied. Admin only.' });
    }

    console.log('🔄 Running partial resync...');
    await resyncContent();
    res.json({ message: '✅ Content resynced successfully!' });
  } catch (error) {
    console.error('❌ Error resyncing content:', error);
    res.status(500).json({ message: 'Error resyncing content', error: error.message });
  }
};
