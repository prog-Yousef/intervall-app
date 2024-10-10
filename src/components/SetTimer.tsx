import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SetTimerProps {
  onStart: (minutes: number, isInterval: boolean, hasPause: boolean) => void;
}

const SetTimer: React.FC<SetTimerProps> = ({ onStart }) => {
  const [minutes, setMinutes] = useState(10);
  const [isInterval, setIsInterval] = useState(false);
  const [hasPause, setHasPause] = useState(false);

  const incrementMinutes = () => setMinutes(prev => Math.min(prev + 1, 60));
  const decrementMinutes = () => setMinutes(prev => Math.max(prev - 1, 1));

  return (
    <div className="timer-container bg-gray-900">
      <div className="flex items-center justify-center mb-8">
        <button onClick={decrementMinutes} className="text-4xl mr-4">
          <ChevronLeft />
        </button>
        <div className="text-6xl font-bold">{minutes}</div>
        <button onClick={incrementMinutes} className="text-4xl ml-4">
          <ChevronRight />
        </button>
      </div>
      <p className="text-sm mb-8">minutes</p>
      <div className="flex flex-col items-start mb-8">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={isInterval}
            onChange={() => setIsInterval(!isInterval)}
            className="mr-2"
          />
          <span>Intervals</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hasPause}
            onChange={() => setHasPause(!hasPause)}
            className="mr-2"
          />
          <span>5 min break / interval</span>
        </label>
      </div>
      <button
        onClick={() => onStart(minutes, isInterval, hasPause)}
        className="btn btn-primary w-full"
      >
        START TIMER
      </button>
    </div>
  );
};

export default SetTimer;