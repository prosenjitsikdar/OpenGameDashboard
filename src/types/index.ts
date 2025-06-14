import type { ComponentType } from 'react';

export type SportType = {
  id: string;
  name: string;
  active: boolean;
};

export type BetType = {
  id: string;
  userId: string;
  betId: string;
  parentID: string;
  userName: string;
  sport: string;
  event: string;
  selection: string;
  market: 'Match Odds' | 'Fancy' | 'Bookmaker';
  section: string;
  betType: 'Back' | 'Lay';
  stake: number;
  odds: number;
  status?: 'Win' | 'Loss' | 'Refund' | 'Pending' | 'Void';
  createdAt: Date;
  settledAt?: Date;
};

export type MetricCardType = {
  title: string;
  value: number | string;
  icon: ComponentType<{ size?: number; className?: string }>;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color: string;
};

export type FilterOptionsType = {
  sport: string;
  dateRange: string;
  customDateRange?: {
    startDate: Date | null;
    endDate: Date | null;
  };
};