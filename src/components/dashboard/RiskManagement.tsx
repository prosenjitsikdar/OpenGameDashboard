import React from 'react';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

const RiskManagement: React.FC = () => {
  const riskItems = [
    {
      id: 1,
      title: 'High Stake Alert',
      description: 'User456 placed a $2,500 bet on Tennis match',
      time: '15 minutes ago',
      level: 'high',
    },
    {
      id: 2,
      title: 'Unusual Betting Pattern',
      description: 'Multiple accounts betting on same outcome',
      time: '2 hours ago',
      level: 'medium',
    },
    {
      id: 3,
      title: 'Suspended Market',
      description: 'Cricket - India vs Pakistan match suspended',
      time: '1 hour ago',
      level: 'low',
    },
  ];
  
  const getRiskLevelClass = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShieldAlert size={20} className="mr-2 text-red-500" />
            <h2 className="text-xl font-bold dark:text-white">Risk Management</h2>
          </div>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center hover:underline">
            View all <ArrowUpRight size={14} className="ml-1" />
          </button>
        </div>
        
        <div className="space-y-4">
          {riskItems.map((item) => (
            <div 
              key={item.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelClass(item.level)}`}>
                      {item.level.charAt(0).toUpperCase() + item.level.slice(1)} Risk
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.time}</div>
              </div>
              
              <div className="mt-3 flex justify-end space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                  Ignore
                </button>
                <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;