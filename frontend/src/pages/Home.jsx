import { useState, useEffect } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import SubjectCard from '../components/SubjectCard';

const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get('/subjects');
      setSubjects(data);
    } catch (err) {
      setError('Failed to load subjects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to LearnConnect! 🎓
          </h1>
          <p className="text-xl text-gray-600">
            Discover a curated collection of educational books with interactive quizzes
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-2xl text-gray-600">Loading subjects...</div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
              {error}
            </div>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No subjects available yet.</p>
            <p className="text-gray-500">Please contact your administrator to add subjects.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              EXPLORE OUR LIBRARY!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subjects.map((subject) => (
                <SubjectCard key={subject._id} subject={subject} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;