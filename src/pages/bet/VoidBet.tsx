import { useState } from 'react';
import { MetricsCards, BetsTable, H1, P } from "../../components/wrapperComponents";
import { metricVoidBetData, pendingBetsData, voidBetsData } from '../../data/mockData';
import { Search } from 'lucide-react';

const VoidBet = () => {
  const [userNameSearch, setUserNameSearch] = useState('');
  const [sportType, setSportType] = useState('');
  const [event, setEvent] = useState('');
  const [market, setMarket] = useState('');
  const [betType, setBetType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [status, setStatus] = useState('');

  // Get unique values for dropdowns
  const uniqueSports = [...new Set(pendingBetsData.map(bet => bet.sport))].sort();
  const uniqueEvents = [...new Set(pendingBetsData.map(bet => bet.event))].sort();
  const uniqueMarkets = [...new Set(pendingBetsData.map(bet => bet.market))].sort();
  const uniqueBetTypes = [...new Set(pendingBetsData.map(bet => bet.betType))].sort();

  return (
    <div className="space-y-5 px-4 py-4">
      <div>
        <H1 text="Void Bet" />
        <P text="Track, analyze, and manage voided sports bets" />
      </div>
      <MetricsCards metrics={metricVoidBetData} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8" />

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Filters</h3>
          <button
            onClick={() => {
              setUserNameSearch('');
              setSportType('');
              setEvent('');
              setMarket('');
              setBetType('');
              setDateRange({ start: '', end: '' });
              setStatus('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* User Name Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search by User Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search user name..."
                value={userNameSearch}
                onChange={(e) => setUserNameSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Sport Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sport Type
            </label>
            <select
              value={sportType}
              onChange={(e) => setSportType(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Sports</option>
              {uniqueSports.map((sport) => (
                <option key={sport} value={sport}>{sport}</option>
              ))}
            </select>
          </div>

          {/* Event */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event
            </label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Events</option>
              {uniqueEvents.map((event) => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
          </div>

          {/* Market */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Market
            </label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Markets</option>
              {uniqueMarkets.map((market) => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>

          {/* Bet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bet Type
            </label>
            <select
              value={betType}
              onChange={(e) => setBetType(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Bet Types</option>
              {uniqueBetTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <BetsTable
        bets={voidBetsData}
        title="Void Bets"
        type="void"
        filters={{
          userNameSearch,
          sportType,
          event,
          market,
          betType,
          dateRange,
          status
        }}
      />
    </div>
  );
};

export default VoidBet;
