import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const ProviderDetailSheet: React.FC<{
  provider: any;
  isOpen: boolean;
  onClose: () => void;
}> = ({ provider, isOpen, onClose }) => {
  const { sendAmount, selectedCountry } = useRate();

  if (!provider) return null;

  const receiveAmount = (sendAmount * provider.rate).toLocaleString();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="max-w-sm mx-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-3">
            <span className="text-2xl">{provider.logo}</span>
            <span>{provider.name}</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Rate Trend Chart Placeholder */}
          <div className="space-y-2">
            <h3 className="font-medium text-zinc-800">7-Day Rate Trend</h3>
            <div className="h-32 bg-zinc-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-zinc-500">
                <div className="text-2xl mb-2">📈</div>
                <p className="text-sm">Rate trend chart</p>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-2">
            <h3 className="font-medium text-zinc-800">Fee Breakdown</h3>
            <div className="bg-zinc-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Send Amount</span>
                <span className="font-medium">{sendAmount} AED</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Exchange Rate</span>
                <span className="font-medium">{provider.rate} {selectedCountry?.currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Transfer Fee</span>
                <span className="font-medium">{provider.fee} AED</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Recipient Gets</span>
                <span className="text-emerald-600">{receiveAmount} {selectedCountry?.currency}</span>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <Button 
            onClick={() => window.open('https://provider.example.com', '_blank')}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <span>Proceed with {provider.name}</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const HomeResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { quotes, sendAmount, selectedCountry, refreshQuotes } = useRate();
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    refreshQuotes();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleProviderClick = (provider: any) => {
    setSelectedProvider(provider);
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b border-zinc-200 p-4 z-10">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-2 text-sm text-zinc-600">
              <span>AED</span>
              <span>→</span>
              <span>{selectedCountry?.currency}</span>
            </div>
            <p className="font-semibold text-zinc-800">
              {sendAmount.toLocaleString()} AED
            </p>
          </div>
        </div>
      </div>

      {/* Provider List */}
      <div className="p-4 space-y-4">
        {quotes.map((provider) => {
          const receiveAmount = (sendAmount * provider.rate).toLocaleString();
          const totalCost = sendAmount + provider.fee;
          
          return (
            <Card 
              key={provider.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleProviderClick(provider)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{provider.logo}</span>
                  <div>
                    <h3 className="font-semibold text-zinc-800">{provider.name}</h3>
                    <p className="text-sm text-zinc-500">Fee: {provider.fee} AED</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-lg text-emerald-600">
                    {receiveAmount} {selectedCountry?.currency}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      {provider.eta}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-zinc-100">
                <div className="flex justify-between text-sm text-zinc-600">
                  <span>Rate: {provider.rate} {selectedCountry?.currency}</span>
                  <span>Total: {totalCost} AED</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 text-indigo-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
            <span className="text-sm">Refreshing rates...</span>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="p-4">
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="w-full"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh Rates'}
        </Button>
      </div>

      <ProviderDetailSheet
        provider={selectedProvider}
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />
    </div>
  );
};

export default HomeResultsPage;