import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Url } from '../routes/Routes';
import {
  HomeIcon, ArrowLeftIcon, TrophyIcon, Bars3Icon, XMarkIcon, BanknotesIcon,
  BoltSlashIcon, TableCellsIcon, ViewfinderCircleIcon
} from '@heroicons/react/24/outline';
import { BadgeAlert, ClockFading, BanknoteX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSidebar } from '../contexts/SidebarContext';

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  path?: string;
  subTitle?: string;
  subItems?: SubMenuItem[];
};

type SubMenuItem = {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
};

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showReopenButton, setShowReopenButton] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode } = useTheme();
  const { setIsExpanded } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const subitemRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      title: 'Home',
      icon: <HomeIcon className="h-5 w-5" />,
      path: Url.Dashboard,
    },
    {
      id: 'bet',
      title: 'Bet',
      subTitle: 'Bet History',
      icon: <BanknotesIcon className="h-5 w-5" />,
      subItems: [
        {
          id: 'pending-bet',
          title: 'Pending Bet',
          path: Url.PendingBet,
          icon: <ClockFading className="h-5 w-5 mr-3" />,
        },
        {
          id: 'void-bet',
          title: 'Void Bet',
          path: Url.VoidBet,
          icon: <BadgeAlert className="h-5 w-5 mr-3" />,
        },
        {
          id: 'refund-bet',
          title: 'Refund Bet',
          path: Url.RefundBet,
          icon: <BanknoteX className="h-5 w-5 mr-3" />,
        },
        {
          id: 'settled-bet',
          title: 'Settled Bet',
          path: Url.SettledBet,
          icon: <TrophyIcon className="h-5 w-5 mr-3" />,
        }
      ],
    },
    {
      id: 'result',
      title: 'Result',
      subTitle: 'Result Maker',
      icon: <TableCellsIcon className="h-5 w-5" />,
      subItems: [
        {
          id: 'undeclared-result',
          title: 'Undeclared Result',
          path: Url.UndeclaredResult,
          icon: <BoltSlashIcon className="h-5 w-5 mr-3" />,
        },
        {
          id: 'review-result',
          title: 'ReviewResult',
          path: Url.ReviewResult,
          icon: <ViewfinderCircleIcon className="h-5 w-5 mr-3" />,
        },
        {
          id: 'declared-result',
          title: 'Declared Result',
          path: Url.DeclaredResult,
          icon: <TrophyIcon className="h-5 w-5 mr-3" />,
        }
      ],
    },
  ];

  const location = useLocation();


  // Update isExpanded when expandedItem changes
  useEffect(() => {
    setIsExpanded(!!expandedItem);
  }, [expandedItem, setIsExpanded]);

  // Close subitems when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        expandedItem &&
        !sidebarRef.current?.contains(event.target as Node) &&
        !subitemRef.current?.contains(event.target as Node)
      ) {
        closeSubitems();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedItem]);

  const toggleItemExpand = (itemId: string) => {
    if (expandedItem === itemId) {
      closeSubitems();
    } else {
      setExpandedItem(itemId);
      setShowReopenButton(false);
    }
  };

  const closeSubitems = () => {
    setExpandedItem(null);
    setShowReopenButton(true);
  };

  const reopenSubitems = () => {
    if (expandedItem) {
      setExpandedItem(expandedItem);
      setShowReopenButton(false);
    }
  };

  const handleNavLinkClick = () => {
    closeSubitems();
    setIsMobileOpen(false); // Close sidebar on mobile when navigating
  };

  return (
    <>
      {/* Floating Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed bottom-4 right-6 z-50 p-2 rounded-full ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'
        } block md:hidden shadow-md hover:scale-105 transition-transform`}
      >
        {isMobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Backdrop (Mobile Only) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen z-40 transition-all duration-300 ${
          expandedItem ? 'w-80' : 'w-20'
        } ${isMobileOpen ? 'block translate-x-0' : 'hidden md:block -translate-x-full md:translate-x-0'}`}
        ref={sidebarRef}
      >
        {/* Main Sidebar */}
        <aside
          className={`fixed top-0 h-screen z-40 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md left-0 w-20 pt-16`}
        >
          <div className="flex h-full flex-col">

            {/* Sidebar Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
              <nav className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <div key={item.id}>
                    {item.path ? (
                      <NavLink
                        to={item.path}
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          `flex flex-col items-center rounded-md p-3 text-sm font-medium transition-colors ${
                            isActive
                              ? isDarkMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-600 text-white'
                              : isDarkMode
                                ? 'bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white'
                                : 'text-gray-700 bg-blue-50 hover:bg-blue-600 hover:text-white'
                          }`
                        }
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </NavLink>
                    ) : (
                      <button
                        onClick={() => toggleItemExpand(item.id)}
                        className={`flex flex-col items-center w-full rounded-md p-3 text-sm font-medium transition-colors cursor-pointer ${
                          item.subItems?.some((sub) => location.pathname.startsWith(sub.path)) ||
                          expandedItem === item.id
                            ? isDarkMode
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-600 text-white'
                            : isDarkMode
                              ? 'bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white'
                              : 'text-gray-700 bg-blue-50 hover:bg-blue-600 hover:text-white'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </button>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Subitems Panel */}
        {expandedItem && (
          <aside
            className={`fixed top-0 h-screen z-40 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md left-20 w-60 border-l ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } pt-16`}
            ref={subitemRef}
          >
            <div className="flex h-full flex-col">
              <div
                className={`flex items-center border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } p-2 h-12`}
              >
                <h2
                  className={`text-md font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {menuItems.find((item) => item.id === expandedItem)?.subTitle || 'Management'}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                <nav className="space-y-1 px-2">
                  {menuItems
                    .find((item) => item.id === expandedItem)
                    ?.subItems?.map((subItem) => (
                      <NavLink
                        key={subItem.id}
                        to={subItem.path}
                        onClick={handleNavLinkClick}
                        className={({ isActive }) =>
                          `flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? isDarkMode
                                ? 'bg-blue-900 text-blue-100'
                                : 'bg-blue-50 text-blue-600'
                              : isDarkMode
                                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`
                        }
                      >
                        {subItem.icon}
                        {subItem.title}
                      </NavLink>
                    ))}
                </nav>
              </div>
            </div>
          </aside>
        )}

        {/* Reopen Button */}
        {showReopenButton && expandedItem && (
          <button
            onClick={reopenSubitems}
            className={`fixed left-28 top-1/2 z-40 -translate-y-1/2 rounded-r-md p-2 ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
            } shadow-md transition-all hover:scale-105`}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;