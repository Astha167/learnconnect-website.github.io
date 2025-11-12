import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject.js';
import Content from './models/Content.js';
import connectDB from './config/db.js';

dotenv.config();

const addSampleContent = async () => {
  try {
    await connectDB();

    // Get all subjects
    const mathStd1 = await Subject.findOne({ slug: 'mathematics-std-1' });
    const englishStd1 = await Subject.findOne({ slug: 'english-std-1' });
    const mathStd2 = await Subject.findOne({ slug: 'mathematics-std-2' });
    const englishStd2 = await Subject.findOne({ slug: 'english-std-2' });
    const mathStd3 = await Subject.findOne({ slug: 'mathematics-std-3' }); // Optional

    if (!mathStd1 || !englishStd1 || !mathStd2 || !englishStd2) {
      throw new Error('❌ Missing one or more required subjects. Please check your DB.');
    }

    const sampleContent = [
      /* ---------------- Mathematics Std I ---------------- */
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
        title: 'Module 2: Numbers 10–20 and addition basics',
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
        title: 'Module 5: Capacity and Time',
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

      /* ---------------- Mathematics Std II ---------------- */
      {
        subject: mathStd2._id,
        type: 'ppt',
        title: 'Module 1: Numbers up to 100',
        link: 'https://drive.google.com/file/d/1Cblg0KkZ_kGd6snmAHDgVYbYQJW6uXxz/view',
        order: 1,
      },
      {
        subject: mathStd2._id,
        type: 'quiz',
        title: 'Module 1 Quiz',
        link: 'https://forms.gle/HQJ5UnPTtiJoWrSBA',
        order: 2,
      },
      {
        subject: mathStd2._id,
        type: 'ppt',
        title: 'Module 2: Subtraction Basics',
        link: 'https://drive.google.com/file/d/1vUAp0cUOco21HygVVu0CKFJENpZ13G8y/view',
        order: 3,
      },
      {
        subject: mathStd2._id,
        type: 'quiz',
        title: 'Module 2 Quiz',
        link: 'https://forms.gle/4VSVnkY1gVEwKzLf7',
        order: 4,
      },
      {
        subject: mathStd2._id,
        type: 'ppt',
        title: 'Module 3: Multiplication and Division',
        link: 'https://drive.google.com/file/d/1f7Ypz5CdpXMRM58HyNHIoFADZjEpChrv/view',
        order: 5,
      },
      {
        subject: mathStd2._id,
        type: 'quiz',
        title: 'Module 3 Quiz',
        link: 'https://forms.gle/rr1f1Y2KkhJefCht6',
        order: 6,
      },

      /* ---------------- English Std I ---------------- */
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

      /* ---------------- English Std II ---------------- */
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfT9BUuempv2ifN4RRmw5HKLDaBXcFDN1_t4p3YaMcM6ex87w/viewform?usp=sharing',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfUk_IRHtFrkL3mCk84MjNvNpN6_1qjHu2IQZxnv-CeG8P0RQ/viewform?usp=sharing',
        order: 4,
      },
    ];

    // Clear existing content
    await Content.deleteMany();

    // Insert content
    await Content.insertMany(sampleContent);

    console.log('✅ All content added successfully!');
    console.log(`📦 Total items inserted: ${sampleContent.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding content:', error);
    process.exit(1);
  }
};

addSampleContent();
