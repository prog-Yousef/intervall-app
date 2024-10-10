import React from 'react';

interface DigitalTimerProps {
  minutes: number;
  seconds: number;
  onStop: () => void;
  onTogglePause: () => void;
  isPaused: boolean;
}

const DigitalTimer: React.FC<DigitalTimerProps> = ({ minutes, seconds, onStop }) => {
  return (
    <div className="timer-container bg-sky-500">
      <div className="text-8xl font-bold mb-16">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button onClick={onStop} className="btn btn-secondary">
        ABORT TIMER
      </button>
    </div>
  );
};

export default DigitalTimer;