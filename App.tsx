
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TradeList from './components/TradeList';
import TradeFormModal from './components/TradeFormModal';
import { useTradesContext } from './context/TradesContext';
import type { Trade } from './types';
import { PlusIcon } from './components/icons/PlusIcon';

type View = 'dashboard' | 'journal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const { trades } = useTradesContext();

  const openModal = useCallback((trade: Trade | null = null) => {
    setEditingTrade(trade);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTrade(null);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {currentView === 'dashboard' ? <Dashboard onEditTrade={openModal} /> : <TradeList onEditTrade={openModal} />}
      </main>
      <button
        onClick={() => openModal()}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-transform transform hover:scale-110"
        aria-label="Add New Trade"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {isModalOpen && (
        <TradeFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          tradeToEdit={editingTrade}
        />
      )}
    </div>
  );
};

export default App;
