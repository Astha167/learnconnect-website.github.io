import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // ✅ Added admin routes

// Seeder
import seedDatabase from './seedData.js'; // ✅ Safe seeder import

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

/* ----------------------- ✅ CORS CONFIGURATION ----------------------- */

const allowedOrigins = [
  'http://localhost:5173', // local dev
];

// Allow all Vercel deployments for *your* project only
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const vercelRegex = /^https:\/\/learnconnect-website-github-.*\.vercel\.app$/;
      const mainVercel = 'https://learnconnect-website-github-io.vercel.app';

      if (
        allowedOrigins.includes(origin) ||
        vercelRegex.test(origin) ||
        origin === mainVercel
      ) {
        callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        callback(new Error('CORS not allowed for this origin'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

/* -------------------------------------------------------------------- */

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: log every request
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

/* ----------------------- ✅ ROUTES ----------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes); // ✅ Mounted admin routes here

/* ----------------------- ✅ HEALTH CHECK ----------------------- */
app.get('/', (req, res) => {
  res.json({ message: '✅ LearnConnect API is running!' });
});

/* ----------------------- ⚠️ ERROR HANDLING ----------------------- */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

/* --------------------- ✅ SEED DATABASE ONCE --------------------- */
// ⚠️ Comment this line out after first deployment if you don’t want reseeding each time
seedDatabase();

/* --------------------- 🚀 START SERVER --------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
