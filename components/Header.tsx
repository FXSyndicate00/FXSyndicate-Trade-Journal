import React from 'react';

interface HeaderProps {
  currentView: 'dashboard' | 'journal';
  setCurrentView: (view: 'dashboard' | 'journal') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  const navItemClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-primary text-white";
  const inactiveClasses = "text-text-secondary hover:bg-surface hover:text-text-primary";

  return (
    <header className="bg-surface shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-text-primary">FX SYNDICATE TRADE JOURNAL</h1>
          </div>
          <nav className="flex space-x-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`${navItemClasses} ${currentView === 'dashboard' ? activeClasses : inactiveClasses}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('journal')}
              className={`${navItemClasses} ${currentView === 'journal' ? activeClasses : inactiveClasses}`}
            >
              Journal
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;