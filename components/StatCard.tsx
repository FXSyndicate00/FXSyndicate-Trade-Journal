
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  isCurrency?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, isCurrency = false }) => {
  const isPositive = isCurrency && parseFloat(value) > 0;
  const isNegative = isCurrency && parseFloat(value) < 0;

  const valueColor = isPositive ? 'text-success' : isNegative ? 'text-danger' : 'text-text-primary';

  return (
    <div className="bg-surface p-4 sm:p-6 rounded-lg shadow-lg transition-transform duration-200 hover:-translate-y-1">
      <h4 className="text-sm font-medium text-text-secondary mb-1 truncate">{title}</h4>
      <p className={`text-2xl sm:text-3xl font-bold ${valueColor} truncate`}>
        {isCurrency && !isNegative && parseFloat(value) !== 0 ? '+' : ''}${isCurrency ? value : ''}{!isCurrency ? value : ''}
      </p>
    </div>
  );
};

export default StatCard;