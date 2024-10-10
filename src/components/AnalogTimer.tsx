import React from 'react';

interface AnalogTimerProps {
  minutes: number;
  seconds: number;
  onStop: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
}

const AnalogTimer: React.FC<AnalogTimerProps> = ({ minutes, seconds, onStop, onTogglePause, isPaused }) => {
  const totalSeconds = minutes * 60 + seconds;
  const percentage = (totalSeconds / 3600) * 100;

  return (
    <div className="timer-container bg-blue-500">
      <div className="relative w-64 h-64 mb-8">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            transform="rotate(-90 50 50)"
          />
          {/* Center dot */}
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold">
            {String(minutes).padStart(2, '0')} {String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="flex space-x-4">
        <button onClick={onTogglePause} className="btn btn-secondary">
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        <button onClick={onStop} className="btn btn-secondary">
          ABORT TIMER
        </button>
      </div>
    </div>
  );
};

export default AnalogTimer;