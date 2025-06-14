import React, { useState } from 'react';
import type { FilterOptionsType, SportType } from '../../types';
import { Calendar, ChevronDown } from 'lucide-react';

interface AnalyticsSectionProps {
  sports: SportType[];
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ sports }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    sport: 'All',
    dateRange: 'Today',
  });
  
  const dateRangeOptions = ['Today', 'Tomorrow', 'This Week', 'This Month', 'Last Month', 'This Year', 'Custom Range'];
  
  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions({
      ...filterOptions,
      sport: e.target.value,
    });
  };
  
  const handleDateRangeChange = (range: string) => {
    setFilterOptions({
      ...filterOptions,
      dateRange: range,
    });
    
    if (range !== 'Custom Range') {
      setFilterOptions({
        ...filterOptions,
        dateRange: range,
        customDateRange: undefined,
      });
    }
  };
  
  const metrics = [
    { name: 'Bet Count', value: '1,246', description: 'Number of bets placed' },
    { name: 'Win Bet Count', value: '726', description: 'Number of bets won' },
    { name: 'Loss Bet Count', value: '498', description: 'Number of bets lost' },
    { name: 'Pending Bet Count', value: '22', description: 'Bets waiting for result' },
    { name: 'Settled Bet Count', value: '1,224', description: 'Total bets settled' },
    { name: 'Total Bet Amount', value: '$54,321', description: 'Sum of all stakes' },
    { name: 'Profit/Loss Count', value: '+$12,432', description: 'Net profit/loss' },
    { name: 'Markets Bet Count', value: '18', description: 'Count of markets where bets are placed' },
    { name: 'Average Stake Amount', value: '$43.60', description: 'Average amount placed per bet' },
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-8 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-bold mb-4 md:mb-0 dark:text-white">Overview & Analytics</h2>
        
        <div className="relative">
          <button 
            onClick={() => setFilterOpen(!filterOpen)}
            className="bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-blue-600 dark:text-blue-300 font-medium flex items-center transition-colors duration-200"
          >
            <Calendar size={18} className="mr-2" />
            Filters
            <ChevronDown size={16} className="ml-2" />
          </button>
          
          {filterOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 w-72 p-4 border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sport
                </label>
                <select 
                  value={filterOptions.sport}
                  onChange={handleSportChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="All">All Sports</option>
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.name}>{sport.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <div className="space-y-2">
                  {dateRangeOptions.map(range => (
                    <button
                      key={range}
                      onClick={() => handleDateRangeChange(range)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        filterOptions.dateRange === range 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              
              {filterOptions.dateRange === 'Custom Range' && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => setFilterOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-blue-50 border border-solid border-blue-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metric.value}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{metric.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSection;