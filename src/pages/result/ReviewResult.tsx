import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, X, Loader2, TrendingUp, Award, Target } from 'lucide-react';
import { H1, P } from "../../components/wrapperComponents";

interface MarketOption {
  name: string;
  betCount: number;
  result?: 'winner' | 'loser';
}

interface Market {
  id: string;
  name: string;
  type: string;
  betCount: number;
  options: MarketOption[];
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
  events: Event[];
}

const ReviewResult: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const [stats] = useState({
    unsettledBets: 10,
    totalSportBets: 5600,
    totalMarketBets: 558500
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    events: [
      {
        id: 'match1',
        name: 'Manchester United vs Liverpool',
        date: '2025-03-15',
        betCount: 5,
        markets: [
          {
            id: 'market1',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 3,
            options: [
              { name: 'Manchester United', betCount: 2 },
              { name: 'Draw', betCount: 0 },
              { name: 'Liverpool', betCount: 1 }
            ]
          },
          {
            id: 'market2',
            name: 'Total Goals',
            type: 'total-goals',
            betCount: 3,
            options: [
              { name: 'Over 2.5', betCount: 2 },
              { name: 'Under 2.5', betCount: 1 }
            ]
          }
        ]
      },
      {
        id: 'match2',
        name: 'Arsenal vs Chelsea',
        date: '2025-03-16',
        betCount: 4,
        markets: [
          {
            id: 'market3',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 4,
            options: [
              { name: 'Arsenal', betCount: 2 },
              { name: 'Draw', betCount: 1 },
              { name: 'Chelsea', betCount: 1 }
            ]
          },
          {
            id: 'market9',
            name: 'Fancy',
            type: 'fancy',
            betCount: 4,
            options: [
              { name: '5 Over 30 Runs', betCount: 2 },
              { name: '10 Over 60 Runs', betCount: 1 },
              { name: '20 Over 150 Runs', betCount: 1 }
            ]
          }
        ]
      },
      {
        id: 'match3',
        name: 'Real Madrid vs Barcelona',
        date: '2025-03-17',
        betCount: 6,
        markets: [
          {
            id: 'market4',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 3,
            options: [
              { name: 'Real Madrid', betCount: 2 },
              { name: 'Barcelona', betCount: 1 }
            ]
          }
        ]
      },
      {
        id: 'match4',
        name: 'Bayern Munich vs Dortmund',
        date: '2025-03-18',
        betCount: 2,
        markets: [
          {
            id: 'market5',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 2,
            options: [
              { name: 'Bayern Munich', betCount: 1 },
              { name: 'Dortmund', betCount: 1 }
            ]
          }
        ]
      },
      {
        id: 'match5',
        name: 'Juventus vs AC Milan',
        date: '2025-03-19',
        betCount: 3,
        markets: [
          {
            id: 'market6',
            name: 'Match Winner',
            type: 'match-winner',
            betCount: 3,
            options: [
              { name: 'Juventus', betCount: 1 },
              { name: 'Draw', betCount: 1 },
              { name: 'AC Milan', betCount: 1 }
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
            options: [
              { name: 'Lakers', betCount: 2 },
              { name: 'Warriors', betCount: 1 }
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
            options: [
              { name: 'Over 200.5', betCount: 1 },
              { name: 'Under 200.5', betCount: 1 }
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

  const handleSubmitResult = async (marketId: string, options: MarketOption[]) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitting result for market:', marketId, options);
    } catch (error) {
      console.error('Error submitting result:', error);
    } finally {
      setIsSubmitting(false);
      setSelectedEvent(null);
    }
  };

  const [expandedMarket, setExpandedMarket] = useState<string | null>(null);
  const [selectedMarketName, setSelectedMarketName] = useState('');

  const [fancyInputs, setFancyInputs] = useState<Record<string, string>>({});
  

  return (
    <div className="space-y-5 px-4 py-4">
      <div className="flex justify-between max-md:flex-wrap items-center">
        <div>
          <H1 text="Review Result" />
          <P text="Review Result for markets across all sports" />
        </div>

        <div className="flex space-x-2 max-md:mt-3">
          <button
            className="
              inline-flex items-center px-4 py-2 rounded-md 
              text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 
              focus:outline-none focus:ring-2 focus:ring-emerald-400
              dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-300 
              transition font-poppins cursor-pointer
            "
          >
            Save Result
          </button>
          <button
            className="
              inline-flex items-center px-4 py-2 rounded-md 
              text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
              focus:outline-none focus:ring-2 focus:ring-blue-400
              dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300 
              transition font-poppins cursor-pointer
            "
          >
            Modify Entry
          </button>
        </div>
      </div>

      {/* Stats Cards with gradients and icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="transform transition-transform duration-200 rounded-xl shadow bg-gradient-to-br from-amber-50 to-orange-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-amber-800">Unsettled Bets</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-gray-300">Search</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-12 py-3 bg-white  dark:bg-gray-500 dark:text-gray-300 dark:border-slate-400"
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
        {sports.map(sport => (
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
                    {sport.betCount} Bet Event
                  </span>
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full dark:bg-gray-600 dark:text-gray-300">
                    {sport.betCount} Total Bets
                  </span>
                  <ChevronDown
                    className={`h-6 w-6 text-slate-400 transition-transform duration-200 ${selectedSport === sport.id ? 'transform rotate-180' : ''
                      }`}
                  />
                </div>
              </button>

              {selectedSport === sport.id && (
                <div className="border-t border-slate-200 max-h-[350px] overflow-y-auto p-3">
                  {sport.events.map((event, index) => (
                    <div
                      key={event.id}
                      className={`p-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200 ${
                        index !== sport.events.length - 1 ? 'border-b' : ''
                      }`}
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
                                {getMarketTypeSymbol(market.type)}  ({market.betCount})
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
                    <h3 className="font-semibold text-slate-900 dark:text-gray-200 text-lg">{market.name}</h3>
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
                            {market.type === 'fancy' ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="rounded-xl border border-slate-200 dark:border-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-500 dark:text-gray-300 py-2 px-3 text-sm"
                                  placeholder="Enter result"
                                  value={fancyInputs[`${market.id}-${option.name}`] || ''}
                                  onChange={(e) =>
                                    setFancyInputs({
                                      ...fancyInputs,
                                      [`${market.id}-${option.name}`]: e.target.value,
                                    })
                                  }
                                />
                                <button
                                  onClick={() => {
                                    const inputValue = fancyInputs[`${market.id}-${option.name}`] || '';
                                    console.log(`Submitting fancy result for ${option.name} in market ${market.id}: ${inputValue}`);
                                  }}
                                  disabled={isSubmitting || !fancyInputs[`${market.id}-${option.name}`]}
                                  className={`px-3 py-2 rounded-lg text-white font-medium text-sm transition-colors duration-200 
                                    bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                                    ${isSubmitting || !fancyInputs[`${market.id}-${option.name}`] ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                  Submit
                                </button>
                              </div>
                            ) : (
                              <select
                                className="rounded-xl border border-slate-200 dark:border-slate-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-500 dark:text-gray-300 py-2"
                                value={option.result || ''}
                                onChange={(e) => {
                                  option.result = e.target.value as 'winner' | 'loser';
                                }}
                              >
                                <option value="">Select Result</option>
                                <option value="winner">Winner</option>
                                <option value="loser">Loser</option>
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleSubmitResult(market.id, market.options)}
                          disabled={isSubmitting}
                          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 
                            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            'Submit Result'
                          )}
                        </button>
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

export default ReviewResult;