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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 7v10m-2-8h4m-4 6h4"></path></svg>
            <h1 className="text-xl font-bold ml-2 text-text-primary">FX SYNDICATE TRADE JOURNAL</h1>
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