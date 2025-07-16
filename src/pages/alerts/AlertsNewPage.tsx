import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Slider } from '../../components/ui/slider';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useToast } from '../../hooks/use-toast';

const AlertsNewPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry, addAlert } = useRate();
  const { toast } = useToast();
  const [targetRate, setTargetRate] = useState([22]);

  const handleSaveAlert = () => {
    if (!selectedCountry) return;

    addAlert({
      corridor: `AED → ${selectedCountry.currency}`,
      targetRate: targetRate[0],
      isActive: true
    });

    toast({
      title: "Alert Created",
      description: `You'll be notified when AED → ${selectedCountry.currency} hits ${targetRate[0]}`,
    });

    navigate('/alerts');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/alerts')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-semibold text-zinc-800">Create Rate Alert</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Corridor Info */}
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedCountry?.flag}</span>
            <div>
              <p className="font-medium text-zinc-800">
                AED → {selectedCountry?.currency}
              </p>
              <p className="text-sm text-zinc-500">
                Current rate: 23.45 {selectedCountry?.currency}
              </p>
            </div>
          </div>
        </Card>

        {/* Target Rate Slider */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Target Rate</label>
            <div className="text-center">
              <span className="text-3xl font-bold text-indigo-600">
                {targetRate[0]}
              </span>
              <span className="text-lg text-zinc-600 ml-2">
                {selectedCountry?.currency}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Slider
              value={targetRate}
              onValueChange={setTargetRate}
              max={25}
              min={19}
              step={0.01}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-zinc-500">
              <span>19.00</span>
              <span>22.00</span>
              <span>25.00</span>
            </div>
          </div>

          {/* Rate Comparison */}
          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-600">Current Rate</span>
              <span className="font-medium">23.45 {selectedCountry?.currency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-600">Your Target</span>
              <span className="font-medium text-indigo-600">
                {targetRate[0]} {selectedCountry?.currency}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-zinc-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600">Difference</span>
                <span className={`font-medium ${
                  targetRate[0] > 23.45 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {targetRate[0] > 23.45 ? '+' : ''}{(targetRate[0] - 23.45).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Alert Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 text-xl">💡</div>
            <div>
              <h3 className="font-medium text-blue-800 mb-1">How it works</h3>
              <p className="text-sm text-blue-700">
                We'll send you a push notification when the exchange rate reaches your target. 
                You can set multiple alerts for different rates.
              </p>
            </div>
          </div>
        </Card>

        <Button 
          onClick={handleSaveAlert}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Save Alert
        </Button>
      </div>
    </div>
  );
};

export default AlertsNewPage;