import React, { createContext, useContext, useState, ReactNode } from 'react';
import mockQuotes from '../data/mockQuotes.json';
import mockCountries from '../data/mockCountries.json';
import mockLessons from '../data/mockLessons.json';

interface Country {
  id: string;
  name: string;
  currency: string;
  flag: string;
}

interface Quote {
  id: string;
  name: string;
  logo: string;
  rate: number;
  fee: number;
  eta: string;
  trend: number[];
}

interface Alert {
  id: string;
  corridor: string;
  targetRate: number;
  isActive: boolean;
  createdAt: Date;
}

interface Lesson {
  id: string;
  title: string;
  thumbnail: string;
  xp: number;
  content: string;
}

interface Notification {
  id: string;
  title: string;
  icon: string;
  timestamp: Date;
}

interface RateContextType {
  // Data
  quotes: Quote[];
  countries: Country[];
  lessons: Lesson[];
  
  // State
  selectedCountry: Country | null;
  sendAmount: number;
  language: 'en' | 'hi';
  alerts: Alert[];
  xp: number;
  notifications: Notification[];
  completedLessons: string[];
  
  // Actions
  setSelectedCountry: (country: Country | null) => void;
  setSendAmount: (amount: number) => void;
  setLanguage: (lang: 'en' | 'hi') => void;
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt'>) => void;
  toggleAlert: (id: string) => void;
  deleteAlert: (id: string) => void;
  addXP: (points: number) => void;
  completeLesson: (lessonId: string) => void;
  refreshQuotes: () => void;
}

const RateContext = createContext<RateContextType | undefined>(undefined);

export const useRate = () => {
  const context = useContext(RateContext);
  if (!context) {
    throw new Error('useRate must be used within a RateProvider');
  }
  return context;
};

export const RateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(mockCountries[0]);
  const [sendAmount, setSendAmount] = useState<number>(1000);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [xp, setXP] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'INR hits 23.10 - Your target rate reached!',
      icon: '📈',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      title: 'New lesson available: Security & Compliance',
      icon: '📚',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '3',
      title: 'Rate alert: AED to INR dropped below 23.00',
      icon: '🔔',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ];

  const addAlert = (alertData: Omit<Alert, 'id' | 'createdAt'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const addXP = (points: number) => {
    setXP(prev => prev + points);
  };

  const completeLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      const lesson = mockLessons.find(l => l.id === lessonId);
      if (lesson) {
        addXP(lesson.xp);
      }
    }
  };

  const refreshQuotes = () => {
    // Simulate refreshing quotes by slightly modifying rates
    // In a real app, this would fetch new data
    console.log('Refreshing quotes...');
  };

  const value: RateContextType = {
    quotes: mockQuotes,
    countries: mockCountries,
    lessons: mockLessons,
    selectedCountry,
    sendAmount,
    language,
    alerts,
    xp,
    notifications,
    completedLessons,
    setSelectedCountry,
    setSendAmount,
    setLanguage,
    addAlert,
    toggleAlert,
    deleteAlert,
    addXP,
    completeLesson,
    refreshQuotes
  };

  return (
    <RateContext.Provider value={value}>
      {children}
    </RateContext.Provider>
  );
};