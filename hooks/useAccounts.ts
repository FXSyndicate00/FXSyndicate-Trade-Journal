
import { useState, useEffect, useCallback } from 'react';
import type { Account } from '../types';

const ACCOUNTS_STORAGE_KEY = 'tradeJournalApp.accounts';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (storedAccounts) {
        setAccounts(JSON.parse(storedAccounts));
      }
    } catch (error) {
      console.error("Failed to load accounts from local storage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    } catch (error) {
      console.error("Failed to save accounts to local storage", error);
    }
  }, [accounts]);

  const addAccount = useCallback((accountData: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...accountData,
      id: new Date().toISOString() + Math.random().toString(),
    };
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
  }, []);

  return { accounts, addAccount, loading };
};
