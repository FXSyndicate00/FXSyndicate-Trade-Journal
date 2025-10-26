
import React from 'react';
import { useAccountsContext } from '../context/AccountsContext';
import { AccountType } from '../types';

const AccountSummary: React.FC = () => {
  const { accounts, loading } = useAccountsContext();

  if (loading) {
    return <div className="text-text-secondary">Loading accounts...</div>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-text-primary mb-4">Account Summary</h3>
      {accounts.length === 0 ? (
        <div className="text-center py-12 bg-surface rounded-lg">
          <p className="text-text-secondary">No accounts found.</p>
          <p className="text-text-secondary">Click 'Add Account' in the header to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <div key={account.id} className="bg-surface p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-text-primary truncate">{account.name}</h4>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${account.type === AccountType.LIVE ? 'text-blue-400' : 'text-purple-400'}`}>
                      {account.type}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-success">
                    ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountSummary;
