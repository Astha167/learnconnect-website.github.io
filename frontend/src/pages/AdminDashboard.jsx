import React, { useContext, useState } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Replace this with your admin email (same as in .env on backend)
  const ADMIN_EMAIL = 'yourname@gmail.com';

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <h1 className="text-3xl font-semibold">Access Denied 🚫</h1>
        <p className="text-gray-500 mt-2">Only the admin can view this page.</p>
      </div>
    );
  }

  const triggerAction = async (endpoint) => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await api.post(`/admin/${endpoint}`);
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || '❌ Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] md:w-[500px] text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">
          ⚙️ Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your database directly from here.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => triggerAction('reseed')}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : '♻️ Full Reseed (Reset & Refill)'}
          </button>

          <button
            onClick={() => triggerAction('resync')}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : '🔄 Resync Content (Update Only)'}
          </button>
        </div>

        {message && (
          <p
            className={`mt-6 font-medium ${
              message.includes('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
