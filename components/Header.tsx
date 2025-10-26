
import React from 'react';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { PlusIcon } from './icons/PlusIcon';
import { LoginIcon } from './icons/LoginIcon';

interface HeaderProps {
  onNewTradeClick: () => void;
  onAddAccountClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewTradeClick, onAddAccountClick }) => {
  const buttonClasses = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-text-secondary hover:bg-surface hover:text-text-primary";

  return (
    <header className="bg-surface shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-text-primary">FX SYNDICATE TRADE JOURNAL</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <button onClick={onAddAccountClick} className={buttonClasses}>
              <UserPlusIcon className="h-5 w-5" />
              <span>Add Account</span>
            </button>
            <button onClick={onNewTradeClick} className="bg-primary text-white flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-hover">
               <PlusIcon className="h-5 w-5" />
               <span>New Trade</span>
            </button>
             <button className={buttonClasses}>
              <LoginIcon className="h-5 w-5" />
              <span>Login</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
