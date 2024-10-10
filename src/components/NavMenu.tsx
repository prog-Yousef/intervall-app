import React from 'react';

interface NavMenuProps {
  currentView: string;
  onChangeView: (view: 'analog' | 'digital' | 'visual') => void;
  onClose: () => void;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentView, onChangeView, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg p-6 w-64 text-white">
        <h3 className="text-lg font-semibold mb-4">Timer View</h3>
        <button
          onClick={() => {
            onChangeView('analog');
            onClose();
          }}
          className={`w-full text-left p-2 rounded-md mb-2 ${
            currentView === 'analog' ? 'bg-blue-600' : 'hover:bg-gray-800'
          }`}
        >
          ANALOG TIMER
        </button>
        <button
          onClick={() => {
            onChangeView('digital');
            onClose();
          }}
          className={`w-full text-left p-2 rounded-md mb-2 ${
            currentView === 'digital' ? 'bg-blue-600' : 'hover:bg-gray-800'
          }`}
        >
          DIGITAL TIMER
        </button>
        <button
          onClick={() => {
            onChangeView('visual');
            onClose();
          }}
          className={`w-full text-left p-2 rounded-md mb-4 ${
            currentView === 'visual' ? 'bg-blue-600' : 'hover:bg-gray-800'
          }`}
        >
          VISUAL TIMER
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NavMenu;