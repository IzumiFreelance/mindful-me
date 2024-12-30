import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, MessageCircle } from 'lucide-react';
import { getCurrentUser } from './utils/auth';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import MoodTracker from './components/MoodTracker';
import BreathingExercise from './components/BreathingExercise';
import DailyAffirmation from './components/DailyAffirmation';
import JournalEntry from './components/journal/JournalEntry';
import JournalFeed from './components/journal/JournalFeed';
import ChatRoom from './components/chat/ChatRoom';

type Tab = 'wellness' | 'journal' | 'chat';

function App() {
  const [user, setUser] = useState(getCurrentUser());
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('wellness');

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">MindfulMe</h1>
          </div>
          
          {showRegister ? (
            <>
              <RegisterForm onSuccess={() => setUser(getCurrentUser())} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </button>
              </p>
            </>
          ) : (
            <>
              <LoginForm onSuccess={() => setUser(getCurrentUser())} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Register
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">MindfulMe</h1>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab('wellness')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'wellness'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Wellness
              </button>
              <button
                onClick={() => setActiveTab('journal')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'journal'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Journal
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'chat'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Chat
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'wellness' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MoodTracker />
            <BreathingExercise />
            <DailyAffirmation />
          </div>
        )}

        {activeTab === 'journal' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <JournalEntry />
            <JournalFeed />
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChatRoom receiverId="sample-user" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;