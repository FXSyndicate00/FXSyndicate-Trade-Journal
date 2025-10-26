
import { useState, useEffect, useCallback } from 'react';
import type { Trade } from '../types';

const TRADES_STORAGE_KEY = 'tradeJournalApp.trades';

export const useTrades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedTrades = localStorage.getItem(TRADES_STORAGE_KEY);
      if (storedTrades) {
        setTrades(JSON.parse(storedTrades));
      }
    } catch (error) {
      console.error("Failed to load trades from local storage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(TRADES_STORAGE_KEY, JSON.stringify(trades));
    } catch (error) {
      console.error("Failed to save trades to local storage", error);
    }
  }, [trades]);

  const addTrade = useCallback((tradeData: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...tradeData,
      id: new Date().toISOString() + Math.random().toString(),
    };
    setTrades(prevTrades => [newTrade, ...prevTrades]);
  }, []);

  const updateTrade = useCallback((updatedTrade: Trade) => {
    setTrades(prevTrades =>
      prevTrades.map(trade => (trade.id === updatedTrade.id ? updatedTrade : trade))
    );
  }, []);

  const deleteTrade = useCallback((id: string) => {
    setTrades(prevTrades => prevTrades.filter(trade => trade.id !== id));
  }, []);

  return { trades, addTrade, updateTrade, deleteTrade, loading };
};
