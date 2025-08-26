import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays, addWeeks, addMonths, addYears, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subDays, subWeeks, subMonths, subYears } from 'date-fns';

export type PeriodGranularity = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type PeriodPreset = 
  | 'today'
  | 'yesterday' 
  | 'last-7-days'
  | 'last-30-days'
  | 'this-month'
  | 'last-month'
  | 'this-year'
  | 'custom';

export interface PeriodRange {
  startDate: Date;
  endDate: Date;
}

export interface PeriodContextType {
  currentPeriod: PeriodRange;
  granularity: PeriodGranularity;
  preset: PeriodPreset;
  isComparing: boolean;
  comparisonPeriod?: PeriodRange;
  
  setPeriod: (period: PeriodRange) => void;
  setGranularity: (granularity: PeriodGranularity) => void;
  setPreset: (preset: PeriodPreset) => void;
  setIsComparing: (comparing: boolean) => void;
  getPresetPeriod: (preset: PeriodPreset) => PeriodRange;
  getComparisonPeriod: (period: PeriodRange) => PeriodRange;
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (!context) {
    throw new Error('usePeriod must be used within a PeriodProvider');
  }
  return context;
};

interface PeriodProviderProps {
  children: ReactNode;
}

export const PeriodProvider: React.FC<PeriodProviderProps> = ({ children }) => {
  const [granularity, setGranularity] = useState<PeriodGranularity>('daily');
  const [preset, setPreset] = useState<PeriodPreset>('last-30-days');
  const [isComparing, setIsComparing] = useState(false);
  
  const getPresetPeriod = (preset: PeriodPreset): PeriodRange => {
    const now = new Date();
    
    switch (preset) {
      case 'today':
        return {
          startDate: startOfDay(now),
          endDate: endOfDay(now)
        };
      case 'yesterday':
        const yesterday = subDays(now, 1);
        return {
          startDate: startOfDay(yesterday),
          endDate: endOfDay(yesterday)
        };
      case 'last-7-days':
        return {
          startDate: startOfDay(subDays(now, 6)),
          endDate: endOfDay(now)
        };
      case 'last-30-days':
        return {
          startDate: startOfDay(subDays(now, 29)),
          endDate: endOfDay(now)
        };
      case 'this-month':
        return {
          startDate: startOfMonth(now),
          endDate: endOfMonth(now)
        };
      case 'last-month':
        const lastMonth = subMonths(now, 1);
        return {
          startDate: startOfMonth(lastMonth),
          endDate: endOfMonth(lastMonth)
        };
      case 'this-year':
        return {
          startDate: startOfYear(now),
          endDate: endOfYear(now)
        };
      default:
        return {
          startDate: startOfDay(subDays(now, 29)),
          endDate: endOfDay(now)
        };
    }
  };

  const getComparisonPeriod = (period: PeriodRange): PeriodRange => {
    const diffInDays = Math.ceil((period.endDate.getTime() - period.startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      startDate: subDays(period.startDate, diffInDays + 1),
      endDate: subDays(period.endDate, diffInDays + 1)
    };
  };

  const [currentPeriod, setCurrentPeriod] = useState<PeriodRange>(getPresetPeriod(preset));
  const [comparisonPeriod, setComparisonPeriod] = useState<PeriodRange | undefined>();

  const setPeriod = (period: PeriodRange) => {
    setCurrentPeriod(period);
    if (isComparing) {
      setComparisonPeriod(getComparisonPeriod(period));
    }
  };

  const handleSetPreset = (newPreset: PeriodPreset) => {
    setPreset(newPreset);
    if (newPreset !== 'custom') {
      const period = getPresetPeriod(newPreset);
      setPeriod(period);
    }
  };

  const handleSetIsComparing = (comparing: boolean) => {
    setIsComparing(comparing);
    if (comparing) {
      setComparisonPeriod(getComparisonPeriod(currentPeriod));
    } else {
      setComparisonPeriod(undefined);
    }
  };

  const value: PeriodContextType = {
    currentPeriod,
    granularity,
    preset,
    isComparing,
    comparisonPeriod,
    setPeriod,
    setGranularity,
    setPreset: handleSetPreset,
    setIsComparing: handleSetIsComparing,
    getPresetPeriod,
    getComparisonPeriod
  };

  return (
    <PeriodContext.Provider value={value}>
      {children}
    </PeriodContext.Provider>
  );
};