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
    const mathStd3 = subjects.find((s) => s.slug === 'mathematics-std-3');

    if (!mathStd1 || !englishStd1 || !mathStd2 || !englishStd2) {
      throw new Error('❌ Missing one or more required subjects. Please check your DB slugs.');
    }

    // Clear existing content
    await Content.deleteMany({});
    console.log('🧹 Cleared old content');

    // ✅ All your PPTs and Quizzes
    const sampleContent = [
      /* ----------------- Mathematics Std I ----------------- */
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
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 2: Numbers 10-20 and addition basics',
        link: 'https://drive.google.com/file/d/1ujI1mK9NPyt1vIn1P53yIqQBeJIJU-c1/view',
        order: 3,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 2 Quiz',
        link: 'https://forms.gle/vg5P2M7hiMdSJkBm9',
        order: 4,
      },
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 3: Single digit numbers and Shapes',
        link: 'https://drive.google.com/file/d/1FopyzD4JLCxFeHUCaBiiRKKa8DWINaQG/view',
        order: 5,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 3 Quiz',
        link: 'https://forms.gle/YbKbfo8ZQobNBAuKA',
        order: 6,
      },
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 4: Length and Weight',
        link: 'https://drive.google.com/file/d/1IlW7os_s_cXT8C5LmnHuGLwScOh2qD_r/view',
        order: 7,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 4 Quiz',
        link: 'https://forms.gle/wFpsME7wQrDGKKbd8',
        order: 8,
      },
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 5: Capacity and time',
        link: 'https://drive.google.com/file/d/10wNuHqbEavKAGFbXYemmuVveBECGc1sq/view',
        order: 9,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 5 Quiz',
        link: 'https://forms.gle/xp7JLPLQYYf1CBK69',
        order: 10,
      },
      {
        subject: mathStd1._id,
        type: 'ppt',
        title: 'Module 6: Length and Weight',
        link: 'https://drive.google.com/file/d/1-T3a3C8xpG-_G-PSjKawFcZIGU3hpXsB/view',
        order: 11,
      },
      {
        subject: mathStd1._id,
        type: 'quiz',
        title: 'Module 6 Quiz',
        link: 'https://forms.gle/iS8SReru4ejqcvneA',
        order: 12,
      },

      /* ----------------- Mathematics Std II ----------------- */
      {
        subject: mathStd2._id,
        type: 'ppt',
        title: 'Addition and Subtraction - Module 1',
        link: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
        order: 1,
      },
      {
        subject: mathStd2._id,
        type: 'quiz',
        title: 'Maths Module 1 Quiz',
        link: 'https://forms.gle/YOUR_FORM_ID_HERE',
        order: 2,
      },

      /* ----------------- Mathematics Std III ----------------- */
      {
        subject: mathStd3?._id,
        type: 'ppt',
        title: 'Module 1: Understanding Division',
        link: 'https://drive.google.com/file/d/1yacvyeI66Ku3fgtdhkpFsnGO2CBjceLP/view?usp=drive_link',
        order: 1,
      },
      {
        subject: mathStd3?._id,
        type: 'quiz',
        title: 'Module 1 Quiz: Division',
        link: 'https://forms.gle/adU3JxtJwhWZnEuA7',
        order: 2,
      },

      /* ----------------- English Std I ----------------- */
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
        subject: englishStd1._id,
        type: 'ppt',
        title: 'Conjunctions',
        link: 'https://drive.google.com/file/d/1qDnLswYK4Ld_4lWFuI-36QYkTZkXvhDC/view?usp=drive_link',
        order: 3,
      },
      {
        subject: englishStd1._id,
        type: 'quiz',
        title: 'Conjunctions Quiz',
        link: 'https://forms.gle/sm9h9H4Ppm8cfP39A',
        order: 4,
      },
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'Poems',
        link: 'https://drive.google.com/file/d/1DIrOf7tFm-dcx-DdkJF7debgIQ47U1RA/view?usp=sharing',
        order: 5,
      },
      {
        subject: englishStd1._id,
        type: 'quiz',
        title: 'Poems Quiz',
        link: 'https://forms.gle/EtZdoNRA6qXFx5GTA',
        order: 6,
      },

      /* ----------------- English Std II ----------------- */
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 1: A Pretty Game and A String Song',
        link: 'https://drive.google.com/file/d/1ZPxojCxEH21ZThrzpgvyX--QVa8Eubgx/view?usp=sharing',
        order: 1,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 1 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfT9BUuempv2ifN4RRmw5HKLDaBXcFDN1_t4p3YaMcM6ex87w/viewform',
        order: 2,
      },
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 2: Go and Come',
        link: 'https://drive.google.com/file/d/1fM4Fbz5qGGKOmnsZTOkwi7H7Vvz-jgzQ/view?usp=sharing',
        order: 3,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 2 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfUk_IRHtFrkL3mCk84MjNvNpN6_1qjHu2IQZxnv-CeG8P0RQ/viewform',
        order: 4,
      },
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 3: Let’s Wait',
        link: 'https://drive.google.com/file/d/1IyLbBGA51w36bVq_J_kPACbYh8JSo3Ye/view?usp=sharing',
        order: 5,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 3 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSexXYIleeo4IMKKxKwspzxG_c8frvd5ilwVQLA7494Gyo6DVQ/viewform',
        order: 6,
      },
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 4: Look Before You Leap',
        link: 'https://drive.google.com/file/d/1z4zAv8CGFn9XBFHnfvWjGOWpzREgDrBp/view?usp=sharing',
        order: 7,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 4 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSd06MlxUnfJstPCR4mJYSffEF37sDGwSixLyw1QHIS8pZ-OwA/viewform',
        order: 8,
      },
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 5: Sindabad The Sailor',
        link: 'https://drive.google.com/file/d/1E4PFOCWW3rG80xVcb8nUdKfez0vkjn-r/view?usp=sharing',
        order: 9,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 5 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSepdQvZq_B8VPPQwwA7jM5u2X7jsJi1aBmHb7XdLJy3VOgQ5w/viewform',
        order: 10,
      },
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Module 6: Tenali Raman Draws A Picture',
        link: 'https://drive.google.com/file/d/1yVPKIoN19Y-SfnkXRQQjw1eoWvYPMK2g/view?usp=sharing',
        order: 11,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'Module 6 Quiz',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLScLRgiZrVvIty03JsA_5GlX8AA5kZS023mTba81zoLqYonxjw/viewform',
        order: 12,
      },
    ];

    await Content.insertMany(sampleContent);
    console.log('✅ All sample content added successfully!');
    console.log(`📦 Total content count: ${sampleContent.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error while syncing content:', error);
    process.exit(1);
  }
};

resyncContent();
