import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="timer-container bg-gray-900">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-white animate-pulse mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">INTERVAL</h1>
        <p className="text-sm">For all your timing needs</p>
      </div>
    </div>
  );
};

export default Loading;