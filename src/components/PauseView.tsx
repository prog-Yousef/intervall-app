import React from 'react';
import { Pause } from 'lucide-react';

interface PauseViewProps {
  onResume: () => void;
}

const PauseView: React.FC<PauseViewProps> = ({ onResume }) => {
  return (
    <div className="timer-container bg-green-500">
      <Pause size={64} className="mb-8" />
      <h2 className="text-4xl font-bold mb-4">Pause & breath</h2>
      <p className="text-xl mb-8">3:37</p>
      <button onClick={onResume} className="btn btn-secondary">
        NO PAUSE, GO NOW!
      </button>
    </div>
  );
};

export default PauseView;