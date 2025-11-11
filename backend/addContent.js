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
    const mathStd3 = await Subject.findOne({ slug: 'mathematics-std-3' }); // Added missing variable

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

      // English Std I
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
        title: 'Articles',
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
        title: 'Conjunctions',
        link: 'https://forms.gle/sm9h9H4Ppm8cfP39A',
        order: 4,
      },
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'English',
        link: 'https://drive.google.com/file/d/1-IgOJItYKNd6_vA0xpbJTLyinrTDs31n/view?usp=drive_link',
        order: 5,
      },
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'Lessons and Content',
        link: 'https://drive.google.com/file/d/1PFxXUlOSizYjRwqbhUbHuNHNnXECc43m/view?usp=drive_link',
        order: 6,
      },
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'Poems',
        link: 'https://drive.google.com/file/d/1DIrOf7tFm-dcx-DdkJF7debgIQ47U1RA/view?usp=sharing',
        order: 7,
      },
      {
        subject: englishStd1._id,
        type: 'quiz',
        title: 'Articles',
        link: 'https://forms.gle/EtZdoNRA6qXFx5GTA',
        order: 8,
      },
      {
        subject: englishStd1._id,
        type: 'ppt',
        title: 'English Stories',
        link: 'https://drive.google.com/file/d/1OfhX047g0Npg-NryXcSY-pCujF8mZVoM/view?usp=sharing',
        order: 9,
      },
      {
        subject: englishStd1._id,
        type: 'quiz',
        title: 'Conjunctions',
        link: 'https://forms.gle/pPGqaue2hkMf4Dia8',
        order: 10,
      },

      // Mathematics Std III
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 1: Understanding Division',
        link: 'https://drive.google.com/file/d/1yacvyeI66Ku3fgtdhkpFsnGO2CBjceLP/view?usp=drive_link',
        order: 1,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 1 Quiz: Division',
        link: 'https://forms.gle/adU3JxtJwhWZnEuA7',
        order: 2,
      },
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 2: Smart Guess and Patterns in Numbers',
        link: 'https://drive.google.com/file/d/1f7Ypz5CdpXMRM58HyNHIoFADZjEpChrv/view?usp=drive_link',
        order: 3,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 2 Quiz: Smart Guess and Patterns in Numbers',
        link: 'https://forms.gle/rR4kDWNQAhradLQ4A',
        order: 4,
      },
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 3: Understanding Money',
        link: 'https://drive.google.com/file/d/1foxQG79O6QcrLPEccA50yBSu04Q8sEpU/view?usp=drive_link',
        order: 5,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 3 Quiz: Money',
        link: 'https://forms.gle/rr1f1Y2KkhJefCht6',
        order: 6,
      },
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 4: Understanding Time',
        link: 'https://drive.google.com/file/d/1wPMgFVdTke0lzF8lNAILx-Rs7ILMTHET/view?usp=drive_link',
        order: 7,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 4 Quiz: Time',
        link: 'https://forms.gle/cW2bU7G6RqNDXpiC8',
        order: 8,
      },
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 5: Length, Weight, and Capacity',
        link: 'https://drive.google.com/file/d/1lNnG717yVBWkiPtMnXfRbiIq54BBY_eg/view?usp=drive_link',
        order: 9,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 5 Quiz: Length, Weight, and Capacity',
        link: 'https://forms.gle/AmLkPUd1wAoyKg2G6',
        order: 10,
      },
      {
        subject: mathStd3._id,
        type: 'ppt',
        title: 'Module 6: Numbers Up to 1000',
        link: 'https://drive.google.com/file/d/1F3Jwt0_ob16POLUIg9fE5a3HzyH3SSax/view?usp=drive_link',
        order: 11,
      },
      {
        subject: mathStd3._id,
        type: 'quiz',
        title: 'Module 6 Quiz: Numbers Up to 1000',
        link: 'https://forms.gle/MoNMeHMXJ9e6A6mT7',
        order: 12,
      },

      // English Std II
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfT9BUuempv2ifN4RRmw5HKLDaBXcFDN1_t4p3YaMcM6ex87w/viewform?usp=sharing&ouid=110288018067614651783',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSfUk_IRHtFrkL3mCk84MjNvNpN6_1qjHu2IQZxnv-CeG8P0RQ/viewform?usp=sharing&ouid=110288018067614651783',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSexXYIleeo4IMKKxKwspzxG_c8frvd5ilwVQLA7494Gyo6DVQ/viewform?usp=sharing&ouid=110288018067614651783',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSd06MlxUnfJstPCR4mJYSffEF37sDGwSixLyw1QHIS8pZ-OwA/viewform?usp=sharing&ouid=110288018067614651783',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSepdQvZq_B8VPPQwwA7jM5u2X7jsJi1aBmHb7XdLJy3VOgQ5w/viewform?usp=sharing&ouid=110288018067614651783',
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
        link: 'https://docs.google.com/forms/d/e/1FAIpQLScLRgiZrVvIty03JsA_5GlX8AA5kZS023mTba81zoLqYonxjw/viewform?usp=sharing&ouid=110288018067614651783',
        order: 12,
      },

    ];

    // Clear existing content
    await Content.deleteMany();

    // Insert sample content
    await Content.insertMany(sampleContent);

    console.log('✅ Sample content added successfully!');
    console.log('\n📝 IMPORTANT: Replace "YOUR_FILE_ID_HERE" and "YOUR_FORM_ID_HERE" with your actual Google Drive and Google Form links!\n');

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
