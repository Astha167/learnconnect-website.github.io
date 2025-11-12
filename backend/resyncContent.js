import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Subject from './models/Subject.js';
import Content from './models/Content.js';

dotenv.config();

const resyncContent = async () => {
  try {
    await connectDB();
    console.log('🔗 Connected to MongoDB');

    // Load all subjects
    const subjects = await Subject.find({});
    console.log(`📘 Found ${subjects.length} subjects`);

    // Helper: safely find subject ID by slug
    const findSub = (slug) => subjects.find((s) => s.slug === slug)?._id;

    const mathStd1 = findSub('mathematics-std-1');
    const englishStd1 = findSub('english-std-1');
    const mathStd2 = findSub('mathematics-std-2');
    const englishStd2 = findSub('english-std-2');

    const sampleContent = [
      { subject: mathStd1, type: 'ppt', title: 'Numbers 10–20', link: 'https://drive.google.com/file/d/1ujI1mK9NPyt1vIn1P53yIqQBeJIJU-c1/view', order: 1 },
      { subject: mathStd1, type: 'quiz', title: 'Numbers 10–20 Quiz', link: 'https://forms.gle/vg5P2M7hiMdSJkBm9', order: 2 },
      { subject: englishStd1, type: 'ppt', title: 'Articles', link: 'https://drive.google.com/file/d/1q7cLfZOi3YPDpIV2jllzTUaxs58eAqgg/view', order: 1 },
      { subject: englishStd1, type: 'quiz', title: 'Articles Quiz', link: 'https://forms.gle/WyfoR6KThjZbQKJM8', order: 2 },
    ];

    // Filter out invalid entries (undefined subjects)
    const validContent = sampleContent.filter((c) => c.subject);

    if (validContent.length === 0) {
      console.log('⚠️ No valid content to sync.');
      process.exit(0);
    }

    console.log(`🧩 Syncing ${validContent.length} content items...`);

    for (const item of validContent) {
      const existing = await Content.findOne({ title: item.title });
      if (existing) {
        await Content.updateOne({ _id: existing._id }, { $set: item });
        console.log(`🔁 Updated: ${item.title}`);
      } else {
        await Content.create(item);
        console.log(`✅ Added: ${item.title}`);
      }
    }

    console.log('✨ Resync complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error while syncing content:', error);
    process.exit(1);
  }
};

export default resyncContent;
