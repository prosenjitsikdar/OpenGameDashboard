import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, X, TrendingUp, Award, Target } from 'lucide-react';
import { H1, P } from "../../components/wrapperComponents";

interface MarketOption {
  name: string;
  betCount: number;
  winStatus: string;
  result?: 'winner' | 'loser';
}

interface Market {
  id: string;
  name: string;
  type: string;
  betCount: number;
  options: MarketOption[];
  declaredType: string;
}

interface Event {
  id: string;
  name: string;
  date: string;
  betCount: number;
  markets: Market[];
}

interface Sport {
  id: string;
  name: string;
  marketTypes: Record<string, number>;
  betCount: number;
  eventCount: number;
  events: Event[];
}

const DeclaredResult: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const [stats] = useState({
    unsettledBets: 10,
    totalSportBets: 5600,
    totalMarketBets: 558500
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Add sports state with initial data
  const [sports] = useState<Sport[]>([
  {
    id: 'football',
    name: 'Football',
    marketTypes: {
      'match-winner': 5,
      'total-goals': 3,
      'fancy': 8,
      'total-P': 12,
      'total-O': 6
    },
    betCount: 8,
    eventCount: 5,
    events: [
      {
        id: 'match1',
        name: 'Manchester United vs Liverpool',
        date: '2025-5-11',
        betCount: 2,
        markets: [
          {
            id: 'market1',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 1,
            declaredType: 'Auto',
            options: [
              { name: 'Manchester United', betCount: 2, winStatus: 'Winner' },
              { name: 'Draw', betCount: 0, winStatus: 'Loser' },
              { name: 'Liverpool', betCount: 1, winStatus: 'Loser' }
            ]
          },
          {
            id: 'market2',
            name: 'Total Goals',
            type: 'total-goals',
            betCount: 1,
            declaredType: 'Manual',
            options: [
              { name: 'Over 2.5', betCount: 2, winStatus: 'Winner' },
              { name: 'Under 2.5', betCount: 1, winStatus: 'Loser' }
            ]
          }
        ]
      },
      {
        id: 'match2',
        name: 'Arsenal vs Chelsea',
        date: '2025-05-20',
        betCount: 1,
        markets: [
          {
            id: 'market3',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 1,
            declaredType: 'Manual',
            options: [
              { name: 'Arsenal', betCount: 2, winStatus: 'Loser' },
              { name: 'Draw', betCount: 1, winStatus: 'Winner' },
              { name: 'Chelsea', betCount: 1, winStatus: 'Loser' }
            ]
          },
          {
            id: 'market9',
            name: 'Fancy',
            type: 'fancy',
            betCount: 1,
            declaredType: 'Manual',
            options: [
              { name: '5 Over 30 Runs', betCount: 2, winStatus: 'Loser' },
              { name: '10 Over 60 Runs', betCount: 1, winStatus: 'Winner' },
              { name: '20 Over 150 Runs', betCount: 1, winStatus: 'Loser' }
            ]
          }
        ]
      },
      {
        id: 'match3',
        name: 'Real Madrid vs Barcelona',
        date: '2025-05-19',
        betCount: 1,
        markets: [
          {
            id: 'market4',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 1,
            declaredType: 'Manual',
            options: [
              { name: 'Real Madrid', betCount: 2, winStatus: 'Loser' },
              { name: 'Barcelona', betCount: 1, winStatus: 'Winner' }
            ]
          }
        ]
      },
      {
        id: 'match4',
        name: 'Bayern Munich vs Dortmund',
        date: '2025-03-18',
        betCount: 1,
        markets: [
          {
            id: 'market5',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 1,
            declaredType: 'Auto',
            options: [
              { name: 'Bayern Munich', betCount: 1, winStatus: 'Winner' },
              { name: 'Dortmund', betCount: 1, winStatus: 'Loser' }
            ]
          }
        ]
      },
      {
        id: 'match5',
        name: 'Juventus vs AC Milan',
        date: '2025-03-19',
        betCount: 2,
        markets: [
          {
            id: 'market6',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 2,
            declaredType: 'Auto',
            options: [
              { name: 'Juventus', betCount: 1, winStatus: 'Loser' },
              { name: 'Draw', betCount: 1, winStatus: 'Winner' },
              { name: 'AC Milan', betCount: 1, winStatus: 'Loser' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    marketTypes: {
      'match-winner': 3,
      'total-points': 2
    },
    betCount: 5,    
    eventCount: 2,
    events: [
      {
        id: 'match6',
        name: 'Lakers vs Warriors',
        date: '2025-03-16',
        betCount: 3,
        markets: [
          {
            id: 'market7',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 3,
            declaredType: 'Auto',
            options: [
              { name: 'Lakers', betCount: 2, winStatus: 'Winner' },
              { name: 'Warriors', betCount: 1, winStatus: 'Loser' }
            ]
          }
        ]
      },
      {
        id: 'match7',
        name: 'Celtics vs Nets',
        date: '2025-03-17',
        betCount: 2,
        markets: [
          {
            id: 'market8',
            name: 'Total Points',
            type: 'total-points',
            betCount: 2,
            declaredType: 'Auto',
            options: [
              { name: 'Over 200.5', betCount: 1, winStatus: 'Loser' },
              { name: 'Under 200.5', betCount: 1, winStatus: 'Winner' }
            ]
          }
        ]
      }
    ]
  }
]);


  const getMarketTypeSymbol = (type: string): string => {
    const symbols: Record<string, string> = {
      'match-winner': 'M',
      'total-goals': 'B',
      'total-points': 'TP',
      'fancy': 'F',
      'total-P': 'P',
      'total-O': 'O'
    };
    return symbols[type] || type;
  };


  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [selectedMarketName, setSelectedMarketName] = useState('');
  const [betTime, setBetTime] = useState('');

  const filteredSports = sports.map(sport => ({
    ...sport,
    events: sport.events.filter(event => {
      const eventDate = new Date(event.date);
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        event.name.toLowerCase().includes(searchLower) ||
        sport.name.toLowerCase().includes(searchLower);
      
      const matchesDateRange =
        (!dateRange.start || eventDate >= new Date(dateRange.start)) &&
        (!dateRange.end || eventDate <= new Date(dateRange.end));
      
      const currentDate = new Date('2025-05-20'); // Current date
      const matchesBetTime = (() => {
        if (!betTime || betTime === 'all') return true;
        if (betTime === 'today') {
          return eventDate.toDateString() === currentDate.toDateString();
        }
        if (betTime === 'yesterday') {
          const yesterday = new Date(currentDate);
          yesterday.setDate(currentDate.getDate() - 1);
          return eventDate.toDateString() === yesterday.toDateString();
        }
        if (betTime === 'last7days') {
          const last7Days = new Date(currentDate);
          last7Days.setDate(currentDate.getDate() - 7);
          return eventDate >= last7Days && eventDate <= currentDate;
        }
        if (betTime === 'thismonth') {
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          return eventDate >= startOfMonth && eventDate <= currentDate;
        }
        return true;
      })();

      return matchesSearch && matchesDateRange && matchesBetTime;
    })
  })).filter(sport => !selectedSport || sport.id === selectedSport);
  

  return (
    <div className="space-y-5 px-4 py-4">
      <div>
        <H1 text="Declared Result" />
        <P text="Declared Result for markets across all sports" />
      </div>

      {/* Stats Cards with gradients and icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="transform transition-transform duration-200 rounded-xl shadow bg-gradient-to-br from-green-200 to-green-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-amber-800">Declared Bets</h3>
              <p className="text-3xl font-bold text-amber-600 mt-2">{stats.unsettledBets}</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Target className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="transform transition-transform duration-200 rounded-xl shadow bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-emerald-800">Total Sport Bets</h3>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{stats.totalSportBets}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="transform transition-transform duration-200 rounded-xl shadow bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-purple-800">Total Market Bets</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalMarketBets}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>


      {/* Filters with modern design */}
      <div className="mb-8 overflow-hidden rounded-lg shadow-md border border-transparent p-4 bg-white dark:bg-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Select Sport */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">Select Sport</label>
            <select
              className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">All Sports</option>
              {sports.map(sport => (
                <option key={sport.id} value={sport.id}>{sport.name}</option>
              ))}
            </select>
          </div>

          {/* Select Bet Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">Select Bet Time</label>
            <select
              className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
              value={betTime}
              onChange={(e) => setBetTime(e.target.value)}
            >
              <option value="all">All Bets</option>
              <option value="today">Today’s Bets</option>
              <option value="yesterday">Yesterday’s Bets</option>
              <option value="last7days">Last 7 Days</option>
              <option value="thismonth">This Month</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">Search</label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-12 py-3 bg-white dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
                placeholder="Search events or sports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-white p-3 dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">End Date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 bg-white p-3 dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>


      {/* Sports List with modern cards */}
      <div className="space-y-3">
        {filteredSports.map(sport => (
          <div key={sport.id} className="rounded-md shadow-md overflow-hidden border border-transparent bg-white dark:bg-gray-800">
            <div className="p-0">
              <button
                className="w-full p-2 text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                onClick={() => setSelectedSport(sport.id === selectedSport ? '' : sport.id)}
              >
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    {sport.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg dark:text-gray-300">{sport.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      {Object.entries(sport.marketTypes).map(
                        ([type, count]) =>
                          count > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">{getMarketTypeSymbol(type)} ({count})</span>
                          )
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {sport.eventCount} Total Event
                  </span>
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {sport.betCount} Total Bets
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 text-slate-400 transition-transform duration-200 ${selectedSport === sport.id ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </button>

              {selectedSport === sport.id && (
                <div className="border-t border-slate-200 max-h-[350px] overflow-y-auto p-3">
                  {sport.events.map((event, index) => (
                    <div
                      key={event.id}
                      className={`p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200 ${index !== sport.events.length - 1 ? 'border-b' : ''}`}
                      style={index !== sport.events.length - 1 ? { borderBottom: '1px solid #ccc' } : {}}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium font-poppins text-slate-800 text-md dark:text-gray-300">{event.name}</h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-slate-500">
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            {event.markets.map(market => (
                              <span
                                key={market.id}
                                className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              >
                                {getMarketTypeSymbol(market.type)} ({market.betCount})
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full dark:bg-gray-600 dark:text-gray-300">
                            {event.betCount} Bets
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>


      {/* Modal with modern design */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="px-6 py-2 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600">
              <h2 className="text-lg font-poppins font-medium text-white">{selectedEvent.name}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-4 dark:bg-gray-700">
              {/* Market Name Select Box */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-200">Select Market</label>
                <select
                  className="w-full rounded-xl dark:bg-gray-500 border border-slate-200 dark:border-slate-400 dark:text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3"
                  value={selectedMarketName}
                  onChange={(e) => setSelectedMarketName(e.target.value)}
                >
                  <option value="">All Markets</option>
                  {[...new Set(selectedEvent.markets.map(market => market.name))].map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              {/* Filtered Markets with Accordion */}
              {selectedEvent.markets
                .filter(market => !selectedMarketName || market.name === selectedMarketName)
                .map((market) => (
                  <div key={market.id} className="rounded-xl shadow bg-gray-200 dark:bg-gray-600">
                    <button
                      onClick={() =>
                        setExpandedMarket(expandedMarket === market.id ? null : market.id)
                      }
                      className="w-full px-4 py-2 flex items-center font-poppins justify-between cursor-pointer transition-colors duration-200"
                    >
                      <h3 className="font-semibold text-slate-900 dark:text-gray-200 text-lg">{market.name} ({market.declaredType})</h3>
                      <ChevronDown
                        className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                          expandedMarket === market.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMarket === market.id && (
                      <div className="px-3 pb-4">
                        <div className="space-y-3">
                          {market.options.map((option) => (
                            <div key={option.name} className="flex items-center justify-between dark:bg-gray-700 bg-white p-3 rounded-xl shadow-sm">
                              <div>
                                <p className="font-medium text-slate-800 dark:text-gray-200">{option.name}</p>
                                <p className="text-sm text-slate-500 dark:text-gray-400">{option.betCount} bets</p>
                              </div>
                              <span className={`inline-block px-2 py-1 text-sm font-semibold rounded-full 
                                ${option.winStatus === 'Winner' ? 'bg-green-100 text-green-800' : 
                                  option.winStatus === 'Loser' ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {option.winStatus}
                              </span>

                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeclaredResult;