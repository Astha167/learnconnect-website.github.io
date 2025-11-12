import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Subject from './models/Subject.js';
import Content from './models/Content.js';

dotenv.config();

const resyncContent = async () => {
  try {
    await connectDB();
    console.log('🔗 Connected to MongoDB');

    // Fetch subjects
    const subjects = await Subject.find({});
    console.log(`📚 Found ${subjects.length} subjects`);

    // Delete old content
    await Content.deleteMany({});
    console.log('🧹 Cleared old content');

    // Find subjects dynamically
    const mathStd1 = subjects.find((s) => s.slug === 'mathematics-std-1');
    const englishStd1 = subjects.find((s) => s.slug === 'english-std-1');
    const mathStd2 = subjects.find((s) => s.slug === 'mathematics-std-2');
    const englishStd2 = subjects.find((s) => s.slug === 'english-std-2');

    if (!mathStd1 || !englishStd1 || !mathStd2 || !englishStd2) {
      throw new Error('❌ Missing one or more subjects. Please check database slugs.');
    }

    // ✅ Insert updated content (use your existing data here)
    const sampleContent = [
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'Articles',
        link: 'https://drive.google.com/file/d/1q7cLfZOi3YPDpIV2jllzTUaxs58eAqgg/view?usp=drive_link',
        order: 1,
      },
      {
        subject: englishStd1._id,
        type: 'quiz',
        title: 'Articles Quiz',
        link: 'https://forms.gle/WyfoR6KThjZbQKJM8',
        order: 2,
      },
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 1: Getting started with maths',
        link: 'https://drive.google.com/file/d/1Bc4WJzB9uQJt7NfDSWZGTrw0TuwukHXX/view',
        order: 1,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 1 Quiz',
        link: 'https://forms.gle/sP2KegoxTmLxXY3b9',
        order: 2,
      },
    ];

    await Content.insertMany(sampleContent);
    console.log('✅ Re-synced content successfully!');
    console.log('📦 Content count:', sampleContent.length);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error while resyncing content:', error);
    process.exit(1);
  }
};

resyncContent();
