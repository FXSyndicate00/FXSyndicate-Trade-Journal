
import React, { useState, useEffect, useCallback } from 'react';
import { useTradesContext } from '../context/TradesContext';
import type { Trade } from '../types';
import { TradePosition } from '../types';

interface TradeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeToEdit?: Trade | null;
}

const TradeFormModal: React.FC<TradeFormModalProps> = ({ isOpen, onClose, tradeToEdit }) => {
  const { addTrade, updateTrade } = useTradesContext();
  const [formData, setFormData] = useState({
    asset: '',
    entryDate: new Date().toISOString().split('T')[0],
    position: TradePosition.LONG,
    entryPrice: '',
    exitPrice: '',
    quantity: '',
    notes: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (tradeToEdit) {
      setFormData({
        asset: tradeToEdit.asset,
        entryDate: new Date(tradeToEdit.entryDate).toISOString().split('T')[0],
        position: tradeToEdit.position,
        entryPrice: String(tradeToEdit.entryPrice),
        exitPrice: String(tradeToEdit.exitPrice),
        quantity: String(tradeToEdit.quantity),
        notes: tradeToEdit.notes || '',
        imageUrl: tradeToEdit.imageUrl || '',
      });
    } else {
      // Reset form for new trade
      setFormData({
        asset: '',
        entryDate: new Date().toISOString().split('T')[0],
        position: TradePosition.LONG,
        entryPrice: '',
        exitPrice: '',
        quantity: '',
        notes: '',
        imageUrl: '',
      });
    }
  }, [tradeToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tradeData = {
      asset: formData.asset,
      entryDate: new Date(formData.entryDate).toISOString(),
      position: formData.position,
      entryPrice: parseFloat(formData.entryPrice),
      exitPrice: parseFloat(formData.exitPrice),
      quantity: parseFloat(formData.quantity),
      notes: formData.notes,
      imageUrl: formData.imageUrl,
    };
    if (tradeToEdit) {
      updateTrade({ ...tradeToEdit, ...tradeData });
    } else {
      addTrade(tradeData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-text-primary">{tradeToEdit ? 'Edit Trade' : 'Add New Trade'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="asset" className="block text-sm font-medium text-text-secondary">Asset/Ticker</label>
              <input type="text" name="asset" value={formData.asset} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="entryDate" className="block text-sm font-medium text-text-secondary">Date</label>
              <input type="date" name="entryDate" value={formData.entryDate} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-text-secondary">Position</label>
            <select name="position" value={formData.position} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
              <option value={TradePosition.LONG}>Long</option>
              <option value={TradePosition.SHORT}>Short</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="entryPrice" className="block text-sm font-medium text-text-secondary">Entry Price</label>
              <input type="number" name="entryPrice" step="any" value={formData.entryPrice} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="exitPrice" className="block text-sm font-medium text-text-secondary">Exit Price</label>
              <input type="number" name="exitPrice" step="any" value={formData.exitPrice} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-text-secondary">Quantity</label>
              <input type="number" name="quantity" step="any" value={formData.quantity} onChange={handleChange} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-text-secondary">Notes/Remarks</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="mt-1 block w-full bg-background border border-secondary rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
          </div>
          
          <div>
              <label htmlFor="image" className="block text-sm font-medium text-text-secondary">Chart Screenshot</label>
              <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"/>
              {formData.imageUrl && <img src={formData.imageUrl} alt="Trade chart" className="mt-2 rounded-md max-h-40"/>}
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-secondary text-text-primary rounded-md hover:bg-opacity-80 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">{tradeToEdit ? 'Update Trade' : 'Save Trade'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeFormModal;
