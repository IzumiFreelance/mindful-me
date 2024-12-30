import React, { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

export default function BreathingExercise() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [seconds, setSeconds] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            switch (phase) {
              case 'inhale':
                setPhase('hold');
                return 7;
              case 'hold':
                setPhase('exhale');
                return 8;
              case 'exhale':
                setPhase('inhale');
                return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Breathing Exercise</h2>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <div className={`w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ${
          isActive
            ? phase === 'inhale'
              ? 'border-blue-500 scale-110'
              : phase === 'hold'
              ? 'border-green-500 scale-100'
              : 'border-purple-500 scale-90'
            : 'border-gray-300'
        }`}>
          <div className="text-center">
            <div className="text-2xl font-bold">{seconds}</div>
            <div className="text-gray-600 capitalize">{phase}</div>
          </div>
        </div>

        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-3 rounded-lg text-white transition-colors ${
            isActive
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isActive ? 'Stop' : 'Start Breathing'}
        </button>

        <div className="text-center text-gray-600">
          <p>4-7-8 Breathing Technique</p>
          <p className="text-sm mt-1">
            Inhale for 4s, hold for 7s, exhale for 8s
          </p>
        </div>
      </div>
    </div>
  );
}