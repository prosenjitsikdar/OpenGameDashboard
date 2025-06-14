import type { SportType, BetType, MetricCardType } from '../types';
import {
  TrendingUp,
  Calendar,
  Activity,
  DollarSign,
  IndianRupee,
  Users,
  Package,
} from 'lucide-react';

// Sports data
export const sportsData: SportType[] = [
  { id: '1', name: 'Cricket', active: true },
  { id: '2', name: 'Football', active: true },
  { id: '3', name: 'Tennis', active: true },
];

export const selectionData: SportType[] = [
  { id: '1', name: 'India', active: true },
  { id: '2', name: 'Australia', active: true },
  { id: '3', name: 'Manchester United', active: true },
  { id: '3', name: 'Arsenal', active: true },
  { id: '3', name: 'Los Angeles Lakers', active: true },
  { id: '3', name: 'Boston Celtics', active: true },
  { id: '3', name: 'New York Yankees', active: true },
  { id: '3', name: 'Boston Red Sox', active: true },
  { id: '3', name: 'South Africa', active: true },
];

export const eventsData: SportType[] = [
  { id: '1', name: 'India vs Australia', active: true },
  { id: '2', name: 'Manchester United vs Arsenal', active: true },
  { id: '3', name: 'Los Angeles Lakers vs Boston Celtics', active: true },
  { id: '4', name: 'New York Yankees vs Boston Red Sox', active: true },
  { id: '5', name: 'Arsenal vs South Africa', active: true },
];

// Generate random date within past 3 days
const getRandomRecentDate = () => {
  const now = new Date();
  const pastDays = Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000;
  return new Date(now.getTime() - pastDays);
};

// Pending bets data
export const pendingBetsData: BetType[] = Array.from({ length: 15 }, (_, i) => ({
  id: `p${i + 1}`,
  userId: `user${Math.floor(Math.random() * 100) + 1}`,
  userName: `User ${Math.floor(Math.random() * 100) + 1}`,
  betId: `Bet${Math.floor(Math.random() * 100) + 1}`,
  parentID: `PARENT${Math.floor(Math.random() * 100) + 1}`,
  sport: sportsData[Math.floor(Math.random() * sportsData.length)].name,
  event: eventsData[Math.floor(Math.random() * eventsData.length)].name,
  selection: selectionData[Math.floor(Math.random() * selectionData.length)].name,
  market: ['Match Odds', 'Fancy', 'Bookmaker'][Math.floor(Math.random() * 3)] as 'Match Odds' | 'Fancy' | 'Bookmaker',
  section: `Team ${['A', 'B'][Math.floor(Math.random() * 2)]}`,
  betType: Math.random() > 0.5 ? 'Back' : 'Lay',
  stake: Math.floor(Math.random() * 1000) + 50,
  odds: parseFloat((Math.random() * (3 - 1) + 1).toFixed(2)),
  status: 'Pending',
  createdAt: getRandomRecentDate(),
}));

export const voidBetsData: BetType[] = Array.from({ length: 15 }, (_, i) => ({
  id: `p${i + 1}`,
  userId: `user${Math.floor(Math.random() * 100) + 1}`,
  userName: `User ${Math.floor(Math.random() * 100) + 1}`,
  betId: `Bet${Math.floor(Math.random() * 100) + 1}`,
  parentID: `PARENT${Math.floor(Math.random() * 100) + 1}`,
  sport: sportsData[Math.floor(Math.random() * sportsData.length)].name,
  event: eventsData[Math.floor(Math.random() * eventsData.length)].name,
  selection: selectionData[Math.floor(Math.random() * selectionData.length)].name,
  market: ['Match Odds', 'Fancy', 'Bookmaker'][Math.floor(Math.random() * 3)] as 'Match Odds' | 'Fancy' | 'Bookmaker',
  section: `Team ${['A', 'B'][Math.floor(Math.random() * 2)]}`,
  betType: Math.random() > 0.5 ? 'Back' : 'Lay',
  stake: Math.floor(Math.random() * 1000) + 50,
  odds: parseFloat((Math.random() * (3 - 1) + 1).toFixed(2)),
  status: 'Void',
  createdAt: getRandomRecentDate(),
}));

export const refundBetsData: BetType[] = Array.from({ length: 15 }, (_, i) => ({
  id: `p${i + 1}`,
  userId: `user${Math.floor(Math.random() * 100) + 1}`,
  userName: `User ${Math.floor(Math.random() * 100) + 1}`,
  betId: `Bet${Math.floor(Math.random() * 100) + 1}`,
  parentID: `PARENT${Math.floor(Math.random() * 100) + 1}`,
  sport: sportsData[Math.floor(Math.random() * sportsData.length)].name,
  event: eventsData[Math.floor(Math.random() * eventsData.length)].name,
  selection: selectionData[Math.floor(Math.random() * selectionData.length)].name,
  market: ['Match Odds', 'Fancy', 'Bookmaker'][Math.floor(Math.random() * 3)] as 'Match Odds' | 'Fancy' | 'Bookmaker',
  section: `Team ${['A', 'B'][Math.floor(Math.random() * 2)]}`,
  betType: Math.random() > 0.5 ? 'Back' : 'Lay',
  stake: Math.floor(Math.random() * 1000) + 50,
  odds: parseFloat((Math.random() * (3 - 1) + 1).toFixed(2)),
  status: 'Refund',
  createdAt: getRandomRecentDate(),
}));

// Settled bets data
export const settledBetsData: BetType[] = Array.from({ length: 20 }, (_, i) => {
  const createdDate = getRandomRecentDate();
  const settledDate = new Date(createdDate.getTime() + (Math.random() * 24 * 60 * 60 * 1000));
  
  return {
    id: `s${i + 1}`,
    userId: `user${Math.floor(Math.random() * 100) + 1}`,
    userName: `User ${Math.floor(Math.random() * 100) + 1}`,
    betId: `Bet${Math.floor(Math.random() * 100) + 1}`,
    parentID: `PARENT${Math.floor(Math.random() * 100) + 1}`,
    sport: sportsData[Math.floor(Math.random() * sportsData.length)].name,
    event: eventsData[Math.floor(Math.random() * eventsData.length)].name,
    selection: selectionData[Math.floor(Math.random() * selectionData.length)].name,
    market: ['Match Odds', 'Fancy', 'Bookmaker'][Math.floor(Math.random() * 3)] as 'Match Odds' | 'Fancy' | 'Bookmaker',
    section: `Team ${['A', 'B'][Math.floor(Math.random() * 2)]}`,
    betType: Math.random() > 0.5 ? 'Back' : 'Lay',
    stake: Math.floor(Math.random() * 1000) + 50,
    odds: parseFloat((Math.random() * (3 - 1) + 1).toFixed(2)),
    status: ['Win', 'Loss', 'Refund'][Math.floor(Math.random() * 3)] as 'Win' | 'Loss' | 'Refund',
    createdAt: createdDate,
    settledAt: settledDate,
  };
});

// Metric cards data
export const metricCardsData: MetricCardType[] = [
  {
    title: 'All Sports',
    value: sportsData.length,
    icon: Activity,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
  {
    title: 'In-Play Count',
    value: Math.floor(Math.random() * 5) + 2,
    icon: TrendingUp,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'indigo',
  },
  {
    title: 'Today',
    value: Math.floor(Math.random() * 10) + 5,
    icon: Calendar,
    trend: {
      value: 5,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Tomorrow',
    value: Math.floor(Math.random() * 15) + 10,
    icon: Calendar,
    trend: {
      value: 0,
      direction: 'neutral',
    },
    color: 'violet',
  },
  {
    title: 'Total Bets',
    value: pendingBetsData.length + settledBetsData.length,
    icon: TrendingUp,
    trend: {
      value: 12,
      direction: 'up',
    },
    color: 'rose',
  },
  {
    title: 'Total Amount',
    value: `$${(pendingBetsData.concat(settledBetsData).reduce((sum, bet) => sum + bet.stake, 0)).toLocaleString()}`,
    icon: DollarSign,
    trend: {
      value: 8,
      direction: 'up',
    },
    color: 'amber',
  },
];

export const metricPendingBetData: MetricCardType[] = [
  {
    title: 'Total Users',
    value: sportsData.length,
    icon: Users,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
  {
    title: 'Total Pending Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'indigo',
  },
  {
    title: 'Total Profit/Loss',
    value: Math.floor(Math.random() * 10) + 5,
    icon: TrendingUp,
    trend: {
      value: 5,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Avg. Stake',
    value: Math.floor(Math.random() * 15) + 10,
    icon: IndianRupee,
    trend: {
      value: 0,
      direction: 'neutral',
    },
    color: 'violet',
  },
  {
    title: 'Total Pending Bet Amount',
    value: sportsData.length,
    icon: IndianRupee,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
];

export const metricVoidBetData: MetricCardType[] = [
  {
    title: 'Total Users',
    value: sportsData.length,
    icon: Users,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
  {
    title: 'Total Void Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'indigo',
  },
  {
    title: 'Total Profit/Loss',
    value: Math.floor(Math.random() * 10) + 5,
    icon: TrendingUp,
    trend: {
      value: 5,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Avg. Stake',
    value: Math.floor(Math.random() * 15) + 10,
    icon: IndianRupee,
    trend: {
      value: 0,
      direction: 'neutral',
    },
    color: 'violet',
  },
  {
    title: 'Total Void Bet Amount',
    value: sportsData.length,
    icon: IndianRupee,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
];

export const metricRefundBetData: MetricCardType[] = [
  {
    title: 'Total Users',
    value: sportsData.length,
    icon: Users,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
  {
    title: 'Total Refund Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'indigo',
  },
  {
    title: 'Total Profit/Loss',
    value: Math.floor(Math.random() * 10) + 5,
    icon: TrendingUp,
    trend: {
      value: 5,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Avg. Stake',
    value: Math.floor(Math.random() * 15) + 10,
    icon: IndianRupee,
    trend: {
      value: 0,
      direction: 'neutral',
    },
    color: 'violet',
  },
  {
    title: 'Total Refund Bet Amount',
    value: sportsData.length,
    icon: IndianRupee,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
];


export const metricSettledBetData: MetricCardType[] = [
  {
    title: 'Total Users',
    value: sportsData.length,
    icon: Users,
    trend: {
      value: 2,
      direction: 'up',
    },
    color: 'blue',
  },
  {
    title: 'Total Settled Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Win Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'pink',
  },
  {
    title: 'Loss Bets',
    value: Math.floor(Math.random() * 5) + 2,
    icon: Package,
    trend: {
      value: 3,
      direction: 'up',
    },
    color: 'indigo',
  },
  {
    title: 'Total Profit/Loss',
    value: Math.floor(Math.random() * 10) + 5,
    icon: TrendingUp,
    trend: {
      value: 5,
      direction: 'up',
    },
    color: 'purple',
  },
  {
    title: 'Avg. Stake',
    value: Math.floor(Math.random() * 15) + 10,
    icon: IndianRupee,
    trend: {
      value: 0,
      direction: 'neutral',
    },
    color: 'violet',
  }
];

// Chart data
export const betsByMarketTypeData = {
  labels: ['Match Odds', 'Fancy', 'Bookmaker'],
  values: [
    pendingBetsData.concat(settledBetsData).filter(bet => bet.market === 'Match Odds').length,
    pendingBetsData.concat(settledBetsData).filter(bet => bet.market === 'Fancy').length,
    pendingBetsData.concat(settledBetsData).filter(bet => bet.market === 'Bookmaker').length,
  ],
};

export const betsBySportData = {
  labels: [...new Set(pendingBetsData.concat(settledBetsData).map(bet => bet.sport))],
  values: [...new Set(pendingBetsData.concat(settledBetsData).map(bet => bet.sport))].map(
    sport => pendingBetsData.concat(settledBetsData).filter(bet => bet.sport === sport).length
  ),
};

export const winLossRatioData = {
  labels: ['Win', 'Loss', 'Refund', 'Pending'],
  values: [
    settledBetsData.filter(bet => bet.status === 'Win').length,
    settledBetsData.filter(bet => bet.status === 'Loss').length,
    settledBetsData.filter(bet => bet.status === 'Refund').length,
    pendingBetsData.length,
  ],
};

// Live matches data
export const liveMatchesData = [
  {
    id: 'lm1',
    sport: 'Cricket',
    teams: 'India vs Australia',
    status: 'In Play',
    score: '245/6 vs 180/3',
    marketStatus: 'Open' as const,
  },
  {
    id: 'lm2',
    sport: 'Football',
    teams: 'Manchester United vs Liverpool',
    status: 'In Play',
    score: '2 - 1',
    marketStatus: 'Open' as const,
  },
  {
    id: 'lm3',
    sport: 'Tennis',
    teams: 'Nadal vs Djokovic',
    status: 'In Play',
    score: '6-4, 3-6, 4-3',
    marketStatus: 'Suspended' as const,
  },
];