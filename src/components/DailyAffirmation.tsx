import React, { useState, useEffect } from 'react';
import { SunMedium } from 'lucide-react';

const affirmations = [
  "I am capable of handling anything that comes my way",
  "Every day, I'm getting stronger and healthier",
  "I choose to be confident and self-assured",
  "I am worthy of love, respect, and happiness",
  "My potential is limitless, and I can achieve great things",
  "I trust in my ability to make good decisions",
  "I am grateful for all the good things in my life",
  "I choose to be happy and spread happiness",
  "I am in charge of my own happiness",
  "My possibilities are endless"
];

export default function DailyAffirmation() {
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  }, []);

  const getNewAffirmation = () => {
    let newAffirmation;
    do {
      const randomIndex = Math.floor(Math.random() * affirmations.length);
      newAffirmation = affirmations[randomIndex];
    } while (newAffirmation === affirmation);
    setAffirmation(newAffirmation);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <SunMedium className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold">Daily Affirmation</h2>
      </div>

      <div className="text-center space-y-6">
        <blockquote className="text-2xl font-serif italic text-gray-700">
          "{affirmation}"
        </blockquote>
        
        <button
          onClick={getNewAffirmation}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          New Affirmation
        </button>
      </div>
    </div>
  );
}