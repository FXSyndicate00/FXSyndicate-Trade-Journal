
import React, { useMemo } from 'react';
import { useTradesContext } from '../context/TradesContext';
import StatCard from './StatCard';
import TradeList from './TradeList';
import type { Trade } from '../types';

interface DashboardProps {
  onEditTrade: (trade: Trade) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onEditTrade }) => {
  const { trades, loading } = useTradesContext();

  const stats = useMemo(() => {
    if (trades.length === 0) {
      return {
        totalPnl: 0,
        winRate: 0,
        profitFactor: 0,
        avgWin: 0,
        avgLoss: 0,
        totalTrades: 0,
      };
    }

    let totalPnl = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let totalProfit = 0;
    let totalLoss = 0;

    trades.forEach(trade => {
      const pnl = (trade.exitPrice - trade.entryPrice) * trade.quantity * (trade.position === 'Long' ? 1 : -1);
      totalPnl += pnl;
      if (pnl > 0) {
        winningTrades++;
        totalProfit += pnl;
      } else if (pnl < 0) {
        losingTrades++;
        totalLoss += Math.abs(pnl);
      }
    });

    const totalTrades = trades.length;
    const winRate = totalTrades > 0 ? (winningTrades / (winningTrades + losingTrades)) * 100 : 0;
    const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : Infinity;
    const avgWin = winningTrades > 0 ? totalProfit / winningTrades : 0;
    const avgLoss = losingTrades > 0 ? totalLoss / losingTrades : 0;

    return { totalPnl, winRate, profitFactor, avgWin, avgLoss, totalTrades };
  }, [trades]);

  if (loading) {
    return <div className="text-center p-8">Loading trades...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-text-primary">Performance Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        <StatCard title="Total P/L" value={stats.totalPnl.toFixed(2)} isCurrency={true} />
        <StatCard title="Win Rate" value={`${stats.winRate.toFixed(1)}%`} />
        <StatCard title="Profit Factor" value={isFinite(stats.profitFactor) ? stats.profitFactor.toFixed(2) : 'N/A'} />
        <StatCard title="Avg. Win" value={stats.avgWin.toFixed(2)} isCurrency={true} />
        <StatCard title="Avg. Loss" value={stats.avgLoss.toFixed(2)} isCurrency={true} />
        <StatCard title="Total Trades" value={stats.totalTrades.toString()} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-4">Recent Trades</h3>
        {trades.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-lg">
            <p className="text-text-secondary">You haven't logged any trades yet.</p>
            <p className="text-text-secondary">Click the '+' button to add your first trade!</p>
          </div>
        ) : (
          <TradeList onEditTrade={onEditTrade} showHeader={false} tradesToShow={5} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
