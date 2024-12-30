import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function JournalEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      timestamp: new Date(),
      comments: []
    };

    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    localStorage.setItem('posts', JSON.stringify([...posts, newPost]));

    setTitle('');
    setContent('');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Write Your Thoughts</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <span className="absolute inset-y-0 right-0 flex items-center p-2">
            <BookOpen className="w-6 h-6 text-gray-400" />
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={6}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Share
        </button>
      </form>
    </div>
  );
}