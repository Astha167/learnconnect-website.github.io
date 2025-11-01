import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const SubjectPage = () => {
  const { slug } = useParams();
  const [subject, setSubject] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewedItems, setViewedItems] = useState(new Set());

  useEffect(() => {
    fetchSubjectContent();
    loadViewedContent();
  }, [slug]);

  const loadViewedContent = async () => {
    try {
      const { data } = await api.get('/content/viewed');
      setViewedItems(new Set(data.viewedContent));
    } catch (err) {
      console.error('Failed to load viewed content:', err);
    }
  };

  const fetchSubjectContent = async () => {
    try {
      const { data } = await api.get(`/subjects/${slug}`);
      setSubject(data.subject);
      setContent(data.content);
    } catch (err) {
      setError('Failed to load subject content.');
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (contentId) => {
    // Check if already viewed in this session
    if (viewedItems.has(contentId)) {
      return;
    }

    try {
      const { data } = await api.post(`/content/${contentId}/view`);
      // Update the view count in the local state
      setContent(prevContent =>
        prevContent.map(item =>
          item._id === contentId ? { ...item, views: data.views } : item
        )
      );
      // Mark as viewed in this session
      setViewedItems(prev => new Set([...prev, contentId]));
    } catch (err) {
      console.error('Failed to track view:', err);
    }
  };

  const renderContent = (item) => {
    if (item.type === 'ppt') {
      // Extract Google Drive file ID and create embed URL
      const fileId = item.link.match(/\/d\/([^\/]+)/)?.[1] || item.link.split('/').pop();
      const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

      const handleInteraction = () => {
        trackView(item._id);
      };

      return (
        <div key={item._id} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              📄 {item.title}
            </h3>
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg">
              <span className="text-blue-600 text-sm font-semibold">👁️ {item.views || 0} views</span>
            </div>
          </div>
          <div 
            className="w-full" 
            style={{ height: '600px' }}
            onClick={handleInteraction}
            onMouseEnter={handleInteraction}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full rounded-lg border-2 border-gray-200"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      );
    } else if (item.type === 'quiz') {
      return (
        <div key={item._id} className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            ✍️ {item.title}
          </h3>
          <p className="mb-6 text-lg">Test your knowledge with this interactive quiz!</p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition transform hover:scale-105"
          >
            CLICK HERE FOR QUIZ →
          </a>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block mb-4">
            {error || 'Subject not found'}
          </div>
          <br />
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold mb-2 text-blue-900">{subject.name}</h1>
          <p className="text-xl">Class {subject.class}</p>
        </div>
      </div> */}
      <h1 className="bg-blue-100 text-center text-3xl font-bold text-gray-800 p-4 rounded">
  Stay Curious! Keep Learning! 🔍
</h1>

      <div className="container mx-auto px-4 py-12">
        {content.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No content available for this subject yet.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {content.map((item) => renderContent(item))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;