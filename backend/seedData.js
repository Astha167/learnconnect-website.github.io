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

    const count = await Subject.countDocuments();

    if (count === 0) {
      await Subject.insertMany(subjects);
      console.log('✅ Database seeded successfully!');
      console.log('\n📚 Created Subjects:');
      subjects.forEach((s) => console.log(`- ${s.name} (${s.slug})`));
    } else {
      console.log(`⚡ Database already has ${count} subjects. Skipping seeding.`);
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

export default seedDatabase;
