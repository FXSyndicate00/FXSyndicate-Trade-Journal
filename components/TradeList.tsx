
import React from 'react';
import { useTradesContext } from '../context/TradesContext';
import type { Trade } from '../types';
import { TradePosition } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { PencilIcon } from './icons/PencilIcon';

interface TradeListProps {
  onEditTrade: (trade: Trade) => void;
  showHeader?: boolean;
  tradesToShow?: number;
}

const TradeRow: React.FC<{ trade: Trade; onEdit: (trade: Trade) => void; onDelete: (id: string) => void }> = ({ trade, onEdit, onDelete }) => {
  const pnl = (trade.exitPrice - trade.entryPrice) * trade.quantity * (trade.position === TradePosition.LONG ? 1 : -1);
  const isWin = pnl > 0;
  const isLoss = pnl < 0;
  const pnlColor = isWin ? 'text-success' : isLoss ? 'text-danger' : 'text-text-secondary';
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <tr className="border-b border-secondary hover:bg-secondary transition-colors duration-150">
      <td className="p-3 text-sm hidden md:table-cell">{formatDate(trade.entryDate)}</td>
      <td className="p-3 font-medium">{trade.asset}</td>
      <td className={`p-3 font-semibold ${trade.position === TradePosition.LONG ? 'text-blue-400' : 'text-purple-400'}`}>{trade.position}</td>
      <td className="p-3 hidden md:table-cell">{trade.entryPrice}</td>
      <td className="p-3 hidden lg:table-cell">{trade.exitPrice}</td>
      <td className="p-3 hidden lg:table-cell">{trade.quantity}</td>
      <td className={`p-3 font-bold ${pnlColor}`}>{pnl.toFixed(2)}</td>
      <td className="p-3">
        <div className="flex items-center justify-end space-x-3">
          <button onClick={() => onEdit(trade)} className="text-text-secondary hover:text-primary transition-colors">
            <PencilIcon className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(trade.id)} className="text-text-secondary hover:text-danger transition-colors">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const TradeList: React.FC<TradeListProps> = ({ onEditTrade, showHeader = true, tradesToShow }) => {
  const { trades, deleteTrade, loading } = useTradesContext();

  const displayTrades = tradesToShow ? trades.slice(0, tradesToShow) : trades;

  if (loading) {
    return <div className="text-center p-8">Loading trades...</div>;
  }

  if (trades.length === 0 && showHeader) {
     return (
          <div className="text-center py-12 bg-surface rounded-lg">
            <p className="text-text-secondary">You haven't logged any trades yet.</p>
            <p className="text-text-secondary">Click the '+' button to add your first trade!</p>
          </div>
        )
  }
  
  if (trades.length === 0) return null;


  return (
    <div className="bg-surface rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full text-left">
        {showHeader && (
          <thead className="bg-secondary">
            <tr>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary hidden md:table-cell">Date</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">Asset</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">Position</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary hidden md:table-cell">Entry</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary hidden lg:table-cell">Exit</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary hidden lg:table-cell">Qty</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">P/L</th>
              <th className="p-3 text-xs font-semibold uppercase tracking-wider text-text-secondary text-right">Actions</th>
            </tr>
          </thead>
        )}
        <tbody>
          {displayTrades.map(trade => (
            <TradeRow key={trade.id} trade={trade} onEdit={onEditTrade} onDelete={deleteTrade} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeList;