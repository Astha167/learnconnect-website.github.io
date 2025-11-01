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

    // Sample content structure (replace with your actual Google Drive and Form links)
    const sampleContent = [

      // Mathematics Std I
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

      // Mathematics Std II
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

      // English Std II
      {
        subject: englishStd2._id,
        type: 'ppt',
        title: 'Reading and Writing - Module 1',
        link: 'https://drive.google.com/file/d/YOUR_FILE_ID_HERE/view',
        order: 1,
      },
      {
        subject: englishStd2._id,
        type: 'quiz',
        title: 'English Module 1 Quiz',
        link: 'https://forms.gle/YOUR_FORM_ID_HERE',
        order: 2,
      },
    ];

    // Clear existing content
    await Content.deleteMany();

    // Insert sample content
    await Content.insertMany(sampleContent);

    console.log('✅ Sample content added successfully!');
    console.log('\n📝 IMPORTANT: Replace "YOUR_FILE_ID_HERE" and "YOUR_FORM_ID_HERE"');
    console.log('with your actual Google Drive and Google Form links!\n');
    console.log('Content added:');
    console.log(`- Mathematics Std I: ${sampleContent.filter(c => c.subject.equals(mathStd1._id)).length} items`);
    console.log(`- English Std I: ${sampleContent.filter(c => c.subject.equals(englishStd1._id)).length} items`);
    console.log(`- Mathematics Std II: ${sampleContent.filter(c => c.subject.equals(mathStd2._id)).length} items`);
    console.log(`- English Std II: ${sampleContent.filter(c => c.subject.equals(englishStd2._id)).length} items`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding content:', error);
    process.exit(1);
  }
};

addSampleContent();