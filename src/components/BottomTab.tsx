import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BellAlertIcon,
  CalculatorIcon,
  BookOpenIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  BellAlertIcon as BellAlertIconSolid,
  CalculatorIcon as CalculatorIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/solid';

const tabs = [
  { path: '/home', label: 'Home', icon: HomeIcon, activeIcon: HomeIconSolid },
  { path: '/alerts', label: 'Alerts', icon: BellAlertIcon, activeIcon: BellAlertIconSolid },
  { path: '/calculator', label: 'Calculator', icon: CalculatorIcon, activeIcon: CalculatorIconSolid },
  { path: '/learn', label: 'Learn', icon: BookOpenIcon, activeIcon: BookOpenIconSolid },
  { path: '/profile', label: 'Profile', icon: UserIcon, activeIcon: UserIconSolid }
];

export const BottomTab: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 px-2 py-1 max-w-sm mx-auto">
      <div className="flex justify-around">
        {tabs.map(({ path, label, icon: Icon, activeIcon: ActiveIcon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? 'text-indigo-600'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <ActiveIcon className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                <span className="text-xs mt-1 font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};