import React, { useState } from 'react';
import { SmilePlus } from 'lucide-react';
import type { MoodEntry } from '../types';

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodEntry['mood']>('okay');
  const [note, setNote] = useState('');

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: currentMood,
      note,
      timestamp: new Date(),
    };
    setMoodEntries([newEntry, ...moodEntries]);
    setNote('');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <SmilePlus className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Mood Tracker</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['terrible', 'bad', 'okay', 'good', 'great'] as const).map((mood) => (
            <button
              key={mood}
              onClick={() => setCurrentMood(mood)}
              className={`px-4 py-2 rounded-full ${
                currentMood === mood
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </button>
          ))}
        </div>
        
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
        
        <button
          onClick={addMoodEntry}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save Mood
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Recent Entries</h3>
        <div className="space-y-3">
          {moodEntries.map((entry) => (
            <div key={entry.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium capitalize">{entry.mood}</span>
                <span className="text-sm text-gray-500">
                  {new Date(entry.timestamp).toLocaleDateString()}
                </span>
              </div>
              {entry.note && <p className="text-gray-600 mt-1">{entry.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}