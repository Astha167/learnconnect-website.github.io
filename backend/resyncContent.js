import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Subject from './models/Subject.js';
import Content from './models/Content.js';

dotenv.config();

const resyncContent = async () => {
  try {
    await connectDB();
    console.log('🔗 Connected to MongoDB');

    // Fetch subjects dynamically
    const subjects = await Subject.find({});
    console.log(`📚 Found ${subjects.length} subjects`);

    const mathStd1 = subjects.find((s) => s.slug === 'mathematics-std-1');
    const englishStd1 = subjects.find((s) => s.slug === 'english-std-1');
    const mathStd2 = subjects.find((s) => s.slug === 'mathematics-std-2');
    const englishStd2 = subjects.find((s) => s.slug === 'english-std-2');
    const mathStd3 = subjects.find((s) => s.slug === 'mathematics-std-3'); // optional

    console.log('🧩 Subjects found:');
    console.log({
      mathStd1: !!mathStd1,
      englishStd1: !!englishStd1,
      mathStd2: !!mathStd2,
      englishStd2: !!englishStd2,
      mathStd3: !!mathStd3,
    });

    // Clear existing content
    await Content.deleteMany({});
    console.log('🧹 Cleared old content');

    // Helper to safely assign subject IDs
    const safe = (subject, obj) => {
      if (!subject) {
        console.warn(`⚠️ Skipping content: Subject not found for "${obj.title}"`);
        return null;
      }
      return { ...obj, subject: subject._id };
    };

    // All content data
    const rawContent = [
      // Math Std I
      safe(mathStd1, {
        type: 'ppt',
        title: 'Module 1: Getting started with maths',
        link: 'https://drive.google.com/file/d/1Bc4WJzB9uQJt7NfDSWZGTrw0TuwukHXX/view',
        order: 1,
      }),
      safe(mathStd1, {
        type: 'quiz',
        title: 'Module 1 Quiz',
        link: 'https://forms.gle/sP2KegoxTmLxXY3b9',
        order: 2,
      }),
      safe(mathStd1, {
        type: 'ppt',
        title: 'Module 2: Numbers 10–20 and addition basics',
        link: 'https://drive.google.com/file/d/1ujI1mK9NPyt1vIn1P53yIqQBeJIJU-c1/view',
        order: 3,
      }),
      safe(mathStd1, {
        type: 'quiz',
        title: 'Module 2 Quiz',
        link: 'https://forms.gle/vg5P2M7hiMdSJkBm9',
        order: 4,
      }),

      // English Std I
      safe(englishStd1, {
        type: 'ppt',
        title: 'Articles',
        link: 'https://drive.google.com/file/d/1q7cLfZOi3YPDpIV2jllzTUaxs58eAqgg/view',
        order: 1,
      }),
      safe(englishStd1, {
        type: 'quiz',
        title: 'Articles Quiz',
        link: 'https://forms.gle/WyfoR6KThjZbQKJM8',
        order: 2,
      }),
      safe(englishStd1, {
        type: 'ppt',
        title: 'Conjunctions',
        link: 'https://drive.google.com/file/d/1qDnLswYK4Ld_4lWFuI-36QYkTZkXvhDC/view',
        order: 3,
      }),
      safe(englishStd1, {
        type: 'quiz',
        title: 'Conjunctions Quiz',
        link: 'https://forms.gle/sm9h9H4Ppm8cfP39A',
        order: 4,
      }),

      // Math Std II
      safe(mathStd2, {
        type: 'ppt',
        title: 'Addition and Subtraction - Module 1',
        link: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
        order: 1,
      }),
      safe(mathStd2, {
        type: 'quiz',
        title: 'Maths Module 1 Quiz',
        link: 'https://forms.gle/YOUR_FORM_ID_HERE',
        order: 2,
      }),

      // English Std II
      safe(englishStd2, {
        type: 'ppt',
        title: 'Module 1: A Pretty Game and A String Song',
        link: 'https://drive.google.com/file/d/1ZPxojCxEH21ZThrzpgvyX--QVa8Eubgx/view?usp=sharing',
        order: 1,
      }),
      safe(englishStd2, {
        type: 'quiz',
        title: 'Module 1 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfT9BUuempv2ifN4RRmw5HKLDaBXcFDN1_t4p3YaMcM6ex87w/viewform',
        order: 2,
      }),
      safe(englishStd2, {
        type: 'ppt',
        title: 'Module 2: Go and Come',
        link: 'https://drive.google.com/file/d/1fM4Fbz5qGGKOmnsZTOkwi7H7Vvz-jgzQ/view?usp=sharing',
        order: 3,
      }),
      safe(englishStd2, {
        type: 'quiz',
        title: 'Module 2 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfUk_IRHtFrkL3mCk84MjNvNpN6_1qjHu2IQZxnv-CeG8P0RQ/viewform',
        order: 4,
      }),
    ];

    // Filter out nulls (subjects that didn't exist)
    const sampleContent = rawContent.filter(Boolean);

    await Content.insertMany(sampleContent);
    console.log('✅ All valid content added successfully!');
    console.log(`📦 Total content count: ${sampleContent.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error while syncing content:', error);
    process.exit(1);
  }
};

resyncContent();
