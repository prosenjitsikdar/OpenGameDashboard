import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface LiveMatch {
  id: string;
  sport: string;
  teams: string;
  status: string;
  score: string;
  marketStatus: 'Open' | 'Suspended' | 'Closed';
}

interface LiveMatchFeedProps {
  matches: LiveMatch[];
}

const LiveMatchFeed: React.FC<LiveMatchFeedProps> = ({ matches }) => {
  const getMarketStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Suspended':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Activity size={20} className="mr-2 text-red-500 animate-pulse" />
            <h2 className="text-xl font-bold dark:text-white">Live Matches</h2>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Live
          </span>
        </div>
        
        {matches.length > 0 ? (
          <div className="space-y-4">
            {matches.map((match) => (
              <div 
                key={match.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {match.sport}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMarketStatusColor(match.marketStatus)}`}>
                        {match.marketStatus}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-1">{match.teams}</h3>
                  </div>
                  
                  <div className="mt-2 sm:mt-0">
                    <div className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">Live Score</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">{match.score}</div>
                  </div>
                </div>
                
                {match.marketStatus === 'Suspended' && (
                  <div className="mt-3 flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
                    <AlertCircle size={16} className="mr-1" />
                    Market temporarily suspended
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No live matches at the moment
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMatchFeed;