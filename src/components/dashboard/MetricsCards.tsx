import React from 'react';
import type { MetricCardType } from '../../types/';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
const { title, value, icon: Icon, trend, color } = metric;
  
  const getColorClasses = () => {
    const colorMap: Record<string, { bg: string, text: string, hover: string }> = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', hover: 'hover:bg-blue-600' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', hover: 'hover:bg-indigo-600' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-500', hover: 'hover:bg-purple-600' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-500', hover: 'hover:bg-violet-600' },
      rose: { bg: 'bg-rose-500', text: 'text-rose-500', hover: 'hover:bg-rose-600' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-500', hover: 'hover:bg-amber-600' },
    };
    
    return colorMap[color] || colorMap.blue;
  };
  
  const colorClasses = getColorClasses();
  
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      case 'neutral':
        return <Minus size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };
  
  const getTrendText = () => {
    if (!trend) return null;
    
    const textColorClass = 
      trend.direction === 'up' ? 'text-green-500' : 
      trend.direction === 'down' ? 'text-red-500' : 
      'text-gray-500';
    
    return (
      <span className={`text-xs font-medium ${textColorClass}`}>
        {trend.value > 0 && '+'}{trend.value}%
      </span>
    );
  };
  
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
            <Icon size={24} className="text-white" />
          </div>
          {trend && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              {getTrendText()}
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
        <div className={`h-full ${colorClasses.bg}`} style={{ width: `${Math.random() * 50 + 50}%` }}></div>
      </div>
    </div>
  );
};

interface MetricsCardsProps {
  metrics: MetricCardType[];
  className?: string;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, className }) => {
  return (
    <div className={`grid gap-4 ${className}`}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} />
      ))}
    </div>
  );
};

export default MetricsCards;