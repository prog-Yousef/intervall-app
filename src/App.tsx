import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Loading from './components/Loading';
import SetTimer from './components/SetTimer';
import AnalogTimer from './components/AnalogTimer';
import DigitalTimer from './components/DigitalTimer';
import VisualTimer from './components/VisualTimer';
import AlarmView from './components/AlarmView';
import PauseView from './components/PauseView';
import NavMenu from './components/NavMenu';

type TimerState = {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isInterval: boolean;
  hasPause: boolean;
  isPaused: boolean;
};

const App: React.FC = () => {
  const [view, setView] = useState<'loading' | 'set' | 'analog' | 'digital' | 'visual' | 'alarm' | 'pause'>('loading');
  const [timer, setTimer] = useState<TimerState>({
    minutes: 0,
    seconds: 0,
    isRunning: false,
    isInterval: false,
    hasPause: false,
    isPaused: false,
  });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setView('set'), 3000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer.isRunning && !timer.isPaused) {
      interval = setInterval(() => {
        if (timer.seconds > 0) {
          setTimer(prev => ({ ...prev, seconds: prev.seconds - 1 }));
        } else if (timer.minutes > 0) {
          setTimer(prev => ({ ...prev, minutes: prev.minutes - 1, seconds: 59 }));
        } else {
          if (timer.isInterval) {
            if (timer.hasPause) {
              setTimer(prev => ({ ...prev, isPaused: true }));
              setView('pause');
            } else {
              resetTimer();
            }
          } else {
            setTimer(prev => ({ ...prev, isRunning: false }));
            setView('alarm');
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const startTimer = (minutes: number, isInterval: boolean, hasPause: boolean) => {
    setTimer({
      minutes,
      seconds: 0,
      isRunning: true,
      isInterval,
      hasPause,
      isPaused: false,
    });
    setView('digital');
  };

  const resetTimer = () => {
    setTimer(prev => ({
      ...prev,
      minutes: prev.isInterval ? prev.minutes : 0,
      seconds: 0,
      isRunning: prev.isInterval,
      isPaused: false,
    }));
  };

  const togglePause = () => {
    setTimer(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const stopTimer = () => {
    setTimer({
      minutes: 0,
      seconds: 0,
      isRunning: false,
      isInterval: false,
      hasPause: false,
      isPaused: false,
    });
    setView('set');
  };

  const getBackgroundColor = () => {
    switch (view) {
      case 'loading':
      case 'set':
        return 'bg-gray-900';
      case 'analog':
        return 'bg-blue-500';
      case 'digital':
        return 'bg-sky-500';
      case 'visual':
        return 'bg-black';
      case 'alarm':
        return 'bg-red-500';
      case 'pause':
        return 'bg-green-500';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundColor()} flex flex-col`}>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Interval</h1>
        <button onClick={() => setShowMenu(!showMenu)} className="text-white p-2">
          <Menu />
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {view === 'loading' && <Loading />}
        {view === 'set' && <SetTimer onStart={startTimer} />}
        {view === 'analog' && (
          <AnalogTimer
            minutes={timer.minutes}
            seconds={timer.seconds}
            onStop={stopTimer}
            onTogglePause={togglePause}
            isPaused={timer.isPaused}
          />
        )}
        {view === 'digital' && (
          <DigitalTimer
            minutes={timer.minutes}
            seconds={timer.seconds}
            onStop={stopTimer}
            onTogglePause={togglePause}
            isPaused={timer.isPaused}
          />
        )}
        {view === 'visual' && (
          <VisualTimer
            minutes={timer.minutes}
            seconds={timer.seconds}
            onStop={stopTimer}
            onTogglePause={togglePause}
            isPaused={timer.isPaused}
          />
        )}
        {view === 'alarm' && <AlarmView onReset={() => setView('set')} />}
        {view === 'pause' && (
          <PauseView
            onResume={() => {
              setTimer(prev => ({ ...prev, isPaused: false }));
              setView('digital');
            }}
          />
        )}
      </main>

      {showMenu && (
        <NavMenu
          currentView={view}
          onChangeView={(newView) => {
            if (newView !== 'loading' && newView !== 'set' && newView !== 'alarm' && newView !== 'pause') {
              setView(newView);
            }
          }}
          onClose={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default App;