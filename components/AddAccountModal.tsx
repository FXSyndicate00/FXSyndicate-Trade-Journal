
import React, { useState } from 'react';
import { useAccountsContext } from '../context/AccountsContext';
import { AccountType } from '../types';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose }) => {
  const { addAccount } = useAccountsContext();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState<AccountType>(AccountType.LIVE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !balance.trim()) {
        alert("Please fill out all fields.");
        return;
    }
    
    addAccount({
      name,
      balance: parseFloat(balance),
      type,
    });
    
    // Reset form and close modal
    setName('');
    setBalance('');
    setType(AccountType.LIVE);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-80 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Add New Account</h2>
          
          <div>
            <label htmlFor="accountName" className="block text-sm font-medium text-text-secondary mb-1">Account Name</label>
            <input 
              type="text" 
              id="accountName" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="balance" className="block text-sm font-medium text-text-secondary mb-1">Starting Balance</label>
              <input 
                type="number" 
                id="balance"
                step="any" 
                value={balance} 
                onChange={(e) => setBalance(e.target.value)} 
                className="block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" 
                required 
              />
            </div>
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-text-secondary mb-1">Account Type</label>
              <select 
                id="accountType"
                value={type} 
                onChange={(e) => setType(e.target.value as AccountType)} 
                className="block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value={AccountType.LIVE}>Live</option>
                <option value={AccountType.FUNDED}>Funded</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-secondary text-text-primary rounded-md hover:bg-opacity-80 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">Save Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;
