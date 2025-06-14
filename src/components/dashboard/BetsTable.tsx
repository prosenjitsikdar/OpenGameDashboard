import React, { useState } from 'react';
import type { BetType } from '../../types';
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from 'lucide-react';

interface Filters {
  userNameSearch: string;
  sportType: string;
  event: string;
  market: string;
  betType: string;
  dateRange: { start: string; end: string };
  status: string;
}

interface BetsTableProps {
  bets: BetType[];
  title: string;
  type: 'pending' |'void' | 'settled' | 'refund';
  filters: Filters;
}

const BetsTable: React.FC<BetsTableProps> = ({ bets, title, type, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof BetType>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter bets based on search term
  const filteredBets = bets.filter(bet => {
    const searchLower = (searchTerm || filters.userNameSearch).toLowerCase();
    const matchesSearch =
      bet.userId.toLowerCase().includes(searchLower) ||
      bet.userName.toLowerCase().includes(searchLower) ||
      bet.sport.toLowerCase().includes(searchLower) ||
      bet.section.toLowerCase().includes(searchLower) ||
      bet.market.toLowerCase().includes(searchLower) ||
      bet.betType.toLowerCase().includes(searchLower);

    const matchesSport = !filters.sportType || bet.sport === filters.sportType;
    const matchesEvent = !filters.event || bet.event === filters.event;
    const matchesMarket = !filters.market || bet.market === filters.market;
    const matchesBetType = !filters.betType || bet.betType === filters.betType;
    const matchesStatus = !filters.status || bet.status === filters.status;

    const betDate = new Date(bet.createdAt);
    const matchesDateRange =
      (!filters.dateRange.start || betDate >= new Date(filters.dateRange.start)) &&
      (!filters.dateRange.end || betDate <= new Date(filters.dateRange.end));

    return matchesSearch && matchesSport && matchesEvent && matchesMarket && matchesBetType && matchesStatus && matchesDateRange;
  });

  // Sort bets
  const sortedBets = [...filteredBets].sort((a, b) => {
    if (sortField === 'createdAt' || sortField === 'settledAt') {
      const dateA = a[sortField] ? new Date(a[sortField] as Date).getTime() : 0;
      const dateB = b[sortField] ? new Date(b[sortField] as Date).getTime() : 0;
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (sortField === 'stake') {
      return sortDirection === 'asc' ? a.stake - b.stake : b.stake - a.stake;
    }

    // String comparison
    const valueA = String(a[sortField] || '').toLowerCase();
    const valueB = String(b[sortField] || '').toLowerCase();

    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  // Paginate
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBets.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedBets.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: keyof BetType) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColorClass = (status?: string) => {
    switch (status) {
      case 'Win':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Loss':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Refund':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getCategoryColorClass = (betType: string) => {
    return betType === 'Back'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Column headers based on table type
  const columnHeaders: { key: keyof BetType; label: string }[] = [
    { key: 'userName', label: 'User' },
    { key: 'betId', label: 'Bet ID' },
    { key: 'parentID', label: 'Parent ID' },
    { key: 'sport', label: 'Sport' },
    { key: 'event', label: 'Event' },
    { key: 'market', label: 'Market' },
    { key: 'selection', label: 'Selection' },
    { key: 'section', label: 'Team/Section' },
    { key: 'betType', label: 'Bet Type' },
    { key: 'odds', label: 'Odds' },
    { key: 'stake', label: 'Stake' },
    { key: 'createdAt', label: 'Created' },
  ];

  if (type === 'settled') {
    columnHeaders.push({ key: 'status', label: 'Status' });
    columnHeaders.push({ key: 'settledAt', label: 'Settled' });
  } else if (type === 'pending') {
    columnHeaders.push({ key: 'status', label: 'Status' });
  } else if (type === 'void') {
    columnHeaders.push({ key: 'status', label: 'Status' });
  } else if (type === 'refund') {
    columnHeaders.push({ key: 'status', label: 'Status' });
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 transition-all duration-300">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>

          <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="w-full sm:w-32">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page on itemsPerPage change
                }}
                className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-blue-100 dark:bg-gray-700">
              <tr>
                {columnHeaders.map((column) => (
                  <th
                    key={String(column.key)}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortField === column.key && (
                        <ArrowUpDown size={14} className="text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.length > 0 ? (
                currentItems.map((bet) => (
                  <tr
                    key={bet.id}
                    className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    style={{
                      backgroundColor:
                        bet.betType === 'Lay' ? '#f9c9d1' :
                          bet.betType === 'Back' ? '#a4d3f5' :
                            undefined,
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-gray-950">{bet.userName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-950">ID: {bet.userId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.betId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.parentID}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.sport}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.event}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.market}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.selection}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.section}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColorClass(bet.betType)}`}>
                        {bet.betType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-950">{bet.odds}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-950">₹{bet.stake}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-950">
                      {formatDate(bet.createdAt)}
                    </td>

                    {(type === 'pending' || type === 'void' || type === 'refund' || type === 'settled') && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColorClass(bet.status)}`}>
                          {bet.status}
                        </span>
                      </td>
                    )}

                    {type === 'settled' && bet.settledAt && (
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-950">
                        {formatDate(bet.settledAt)}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columnHeaders.length}
                    className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    No bets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 mt-4">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {indexOfLastItem > filteredBets.length ? filteredBets.length : indexOfLastItem}
                  </span>{' '}
                  of <span className="font-medium">{filteredBets.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${currentPage === 1
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium ${currentPage === index + 1
                          ? 'z-10 bg-blue-50 dark:bg-blue-900 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-300'
                          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium ${currentPage === totalPages
                        ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BetsTable;