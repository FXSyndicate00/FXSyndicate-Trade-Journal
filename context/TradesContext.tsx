
import React, { createContext, useContext, ReactNode } from 'react';
import { useTrades } from '../hooks/useTrades';
import type { Trade } from '../types';

interface TradesContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, 'id'>) => void;
  updateTrade: (trade: Trade) => void;
  deleteTrade: (id: string) => void;
  loading: boolean;
}

const TradesContext = createContext<TradesContextType | undefined>(undefined);

export const TradesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const tradesData = useTrades();
  return <TradesContext.Provider value={tradesData}>{children}</TradesContext.Provider>;
};

export const useTradesContext = (): TradesContextType => {
  const context = useContext(TradesContext);
  if (context === undefined) {
    throw new Error('useTradesContext must be used within a TradesProvider');
  }
  return context;
};
