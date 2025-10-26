
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TradeList from './components/TradeList';
import TradeFormModal from './components/TradeFormModal';
import AddAccountModal from './components/AddAccountModal';
import type { Trade } from './types';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);

  const openTradeModal = useCallback((trade: Trade | null = null) => {
    setEditingTrade(trade);
    setIsTradeModalOpen(true);
  }, []);

  const closeTradeModal = useCallback(() => {
    setIsTradeModalOpen(false);
    setEditingTrade(null);
  }, []);

  const openAccountModal = useCallback(() => {
    setIsAccountModalOpen(true);
  }, []);

  const closeAccountModal = useCallback(() => {
    setIsAccountModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header onNewTradeClick={() => openTradeModal()} onAddAccountClick={openAccountModal} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <Dashboard onEditTrade={openTradeModal} />
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Trade Journal</h2>
            <TradeList onEditTrade={openTradeModal} />
        </div>
      </main>
      <button
        onClick={() => openTradeModal()}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-transform transform hover:scale-110"
        aria-label="Add New Trade"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {isTradeModalOpen && (
        <TradeFormModal
          isOpen={isTradeModalOpen}
          onClose={closeTradeModal}
          tradeToEdit={editingTrade}
        />
      )}
       {isAccountModalOpen && (
        <AddAccountModal
          isOpen={isAccountModalOpen}
          onClose={closeAccountModal}
        />
      )}
    </div>
  );
};

export default App;
