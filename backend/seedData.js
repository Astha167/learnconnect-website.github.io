import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Subject from './models/Subject.js';
import Content from './models/Content.js';
import connectDB from './config/db.js';

dotenv.config();

const subjects = [
  {
    name: 'Mathematics Std I',
    slug: 'mathematics-std-1',
    class: 1,
    description: 'Math for Class 1 students',
  },
  {
    name: 'English Std I',
    slug: 'english-std-1',
    class: 1,
    description: 'English for Class 1 students',
  },
  {
    name: 'Mathematics Std II',
    slug: 'mathematics-std-2',
    class: 2,
    description: 'Math for Class 2 students',
  },
  {
    name: 'English Std II',
    slug: 'english-std-2',
    class: 2,
    description: 'English for Class 2 students',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Subject.deleteMany();
    await Content.deleteMany();

    console.log('📦 Cleared existing data');

    // Insert subjects
    const createdSubjects = await Subject.insertMany(subjects);
    console.log('✅ Subjects added successfully!');

    console.log('\n📚 Created Subjects:');
    createdSubjects.forEach((subject) => {
      console.log(`- ${subject.name} (${subject.slug})`);
    });

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📝 Next step: Add content (PPTs and Quizzes) for each subject');
    console.log('You can do this through the API or manually in MongoDB Atlas\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();