
import React, { createContext, useContext, ReactNode } from 'react';
import { useAccounts } from '../hooks/useAccounts';
import type { Account } from '../types';

interface AccountsContextType {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => void;
  loading: boolean;
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

export const AccountsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const accountsData = useAccounts();
  return (
    <AccountsContext.Provider value={accountsData}>
      {children}
    </AccountsContext.Provider>
  );
};

export const useAccountsContext = (): AccountsContextType => {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccountsContext must be used within an AccountsProvider');
  }
  return context;
};
