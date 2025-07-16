import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { 
  BellIcon, 
  ArrowRightOnRectangleIcon,
  ChevronRightIcon,
  StarIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';

const ProfileIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, xp, alerts } = useRate();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    navigate('/splash');
  };

  const menuItems = [
    {
      icon: BellIcon,
      title: 'Notifications Log',
      subtitle: 'View your notification history',
      action: () => navigate('/profile/notifications')
    },
    {
      icon: ArrowRightOnRectangleIcon,
      title: 'Logout',
      subtitle: 'Sign out of your account',
      action: handleLogout,
      danger: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <h1 className="text-lg font-semibold text-zinc-800">Profile</h1>
        <p className="text-sm text-zinc-600">Manage your account</p>
      </div>

      <div className="p-6 space-y-6">
        {/* User Info Card */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xl font-semibold">
                U
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-zinc-800">User</h2>
              <p className="text-zinc-600">+971 50123****</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl">{language === 'en' ? '🇺🇸' : '🇮🇳'}</span>
                <span className="text-sm text-zinc-500">
                  {language === 'en' ? 'English' : 'हिन्दी'}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <StarIcon className="w-5 h-5 text-indigo-600" />
              <span className="text-2xl font-bold text-indigo-600">{xp}</span>
            </div>
            <p className="text-sm text-zinc-600">Total XP</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BellAlertIcon className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{alerts.length}</span>
            </div>
            <p className="text-sm text-zinc-600">Active Alerts</p>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <Card 
              key={index}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={item.action}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  item.danger 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-zinc-100 text-zinc-600'
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    item.danger ? 'text-red-600' : 'text-zinc-800'
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500">{item.subtitle}</p>
                </div>
                
                <ChevronRightIcon className="w-4 h-4 text-zinc-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* App Info */}
        <Card className="p-4 bg-zinc-50">
          <div className="text-center space-y-2">
            <div className="text-3xl">💸</div>
            <h3 className="font-semibold text-zinc-800">RemitFlow</h3>
            <p className="text-sm text-zinc-600">Version 1.0.0</p>
            <p className="text-xs text-zinc-500">
              Send money worldwide with the best rates
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileIndexPage;