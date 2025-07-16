import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const AlertsIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, toggleAlert, deleteAlert } = useRate();

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔔</div>
      <h3 className="text-lg font-semibold text-zinc-800 mb-2">No Rate Alerts</h3>
      <p className="text-zinc-600 mb-6">
        Create alerts to get notified when exchange rates hit your target
      </p>
      <Button 
        onClick={() => navigate('/alerts/new')}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        <PlusIcon className="w-4 h-4 mr-2" />
        Create Alert
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-800">Rate Alerts</h1>
          <Button
            size="sm"
            onClick={() => navigate('/alerts/new')}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            New
          </Button>
        </div>
      </div>

      <div className="p-4">
        {alerts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-zinc-800">{alert.corridor}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.isActive 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-zinc-100 text-zinc-500'
                      }`}>
                        {alert.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-600">
                      Target: {alert.targetRate} • Created {alert.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={alert.isActive}
                      onCheckedChange={() => toggleAlert(alert.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      {alerts.length > 0 && (
        <div className="p-4">
          <Card className="p-4 bg-amber-50 border-amber-200">
            <div className="flex items-start space-x-3">
              <div className="text-amber-600 text-xl">⚡</div>
              <div>
                <h3 className="font-medium text-amber-800 mb-1">Stay Updated</h3>
                <p className="text-sm text-amber-700">
                  We check rates every minute and notify you instantly when your targets are hit.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AlertsIndexPage;