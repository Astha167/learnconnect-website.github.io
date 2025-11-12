import Content from '../models/Content.js';
import Subject from '../models/Subject.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Import your sample content seeding function dynamically
import addContent from '../addContent.js'; // adjust the path if needed

export const reseedDatabase = async (req, res) => {
  try {
    console.log('🔁 Running addContent.js reseed script...');
    await addContent();
    res.json({ message: '✅ Database reseeded successfully!' });
  } catch (error) {
    console.error('❌ Error reseeding:', error);
    res.status(500).json({ message: '❌ Failed to reseed', error: error.message });
  }
};
