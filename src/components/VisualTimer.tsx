import React from 'react';

interface VisualTimerProps {
  minutes: number;
  seconds: number;
  onStop: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
}

const VisualTimer: React.FC<VisualTimerProps> = ({ minutes, seconds, onStop }) => {
  const totalSeconds = minutes * 60 + seconds;
  const percentage = (totalSeconds / 3600) * 100;

  return (
    <div className="timer-container bg-black">
      <div className="w-64 h-64 rounded-full border-8 border-white relative mb-8">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(white ${percentage}%, transparent ${percentage}%)`,
            transform: 'rotate(-90deg)',
          }}
        ></div>
      </div>
      <div className="text-2xl font-bold mb-8">
        {minutes} MINUTER OCH {seconds} SEKUNDER KVAR
      </div>
      <button onClick={onStop} className="btn btn-secondary">
        ABORT TIMER
      </button>
    </div>
  );
};

export default VisualTimer;