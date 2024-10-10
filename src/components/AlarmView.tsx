import React from 'react';
import { Bell } from 'lucide-react';

interface AlarmViewProps {
  onReset: () => void;
}

const AlarmView: React.FC<AlarmViewProps> = ({ onReset }) => {
  return (
    <div className="timer-container bg-red-500">
      <Bell size={64} className="mb-8" />
      <h2 className="text-4xl font-bold mb-8">Times up!</h2>
      <button onClick={onReset} className="btn btn-secondary">
        SET NEW TIMER
      </button>
    </div>
  );
};

export default AlarmView;