import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ProfileNotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { notifications } = useRate();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-zinc-800">Notifications</h1>
            <p className="text-sm text-zinc-600">Your notification history</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold text-zinc-800 mb-2">No Notifications</h3>
            <p className="text-zinc-600">
              You'll see your notifications here when they arrive
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{notification.icon}</div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-800 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {formatTimeAgo(notification.timestamp)}
                    </p>
                  </div>
                  
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info Card */}
        <Card className="p-4 mt-6 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Stay Informed</h3>
              <p className="text-sm text-blue-700">
                We'll notify you about rate alerts, new features, and important updates. 
                You can manage your notification preferences in settings.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileNotificationsPage;