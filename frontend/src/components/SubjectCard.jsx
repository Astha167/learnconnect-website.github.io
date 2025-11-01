import { Link } from 'react-router-dom';

const SubjectCard = ({ subject }) => {
  const getEmoji = (name) => {
    if (name.toLowerCase().includes('math')) return '🔢';
    if (name.toLowerCase().includes('english')) return '📖';
    return '📚';
  };

  const getGradient = (name, classNum) => {
    if (name.toLowerCase().includes('math') && classNum === 1) {
      return 'bg-gradient-to-br from-blue-800 to-blue-900'; // Dark blue for Math Std I
    }
    if (name.toLowerCase().includes('english') && classNum === 1) {
      return 'bg-gradient-to-br from-green-500 to-emerald-600'; // Green for English Std I
    }
    if (name.toLowerCase().includes('math') && classNum === 2) {
      return 'bg-gradient-to-br from-orange-500 to-red-600'; // Orange-Red for Math Std II
    }
    if (name.toLowerCase().includes('english') && classNum === 2) {
      return 'bg-gradient-to-br from-purple-500 to-pink-600'; // Purple for English Std II
    }
    return 'bg-gradient-to-br from-blue-500 to-purple-600'; // Default
  };

  return (
    <Link
      to={`/subject/${subject.slug}`}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      <div className={`${getGradient(subject.name, subject.class)} h-48 flex items-center justify-center`}>
        <span className="text-8xl">{getEmoji(subject.name)}</span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{subject.name}</h3>
        <p className="text-gray-600 mb-4">Class {subject.class}</p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          View Books and Quizzes
        </button>
      </div>
    </Link>
  );
};

export default SubjectCard;