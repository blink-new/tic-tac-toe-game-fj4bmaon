import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../../context/RateContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CountryPickerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { countries, selectedCountry, setSelectedCountry } = useRate();
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase()) ||
    country.currency.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country: any) => {
    setSelectedCountry(country);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Select Country</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <Input
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredCountries.map((country) => (
              <div
                key={country.id}
                onClick={() => handleSelect(country)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-zinc-100 ${
                  selectedCountry?.id === country.id ? 'bg-indigo-50 border border-indigo-200' : ''
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <p className="font-medium text-zinc-800">{country.name}</p>
                  <p className="text-sm text-zinc-500">{country.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { sendAmount, setSendAmount, selectedCountry } = useRate();
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  const handleCompareRates = () => {
    navigate('/home/results');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Send Money</h1>
        <p className="text-zinc-600">Compare rates and send worldwide</p>
      </div>

      {/* Send Amount */}
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">You Send</label>
          <div className="relative">
            <Input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(Number(e.target.value))}
              className="pr-16 text-lg font-semibold"
              placeholder="1000"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-zinc-500 font-medium">AED</span>
            </div>
          </div>
        </div>

        {/* Country Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">To</label>
          <Button
            variant="outline"
            onClick={() => setIsCountryModalOpen(true)}
            className="w-full justify-between h-12"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{selectedCountry?.flag}</span>
              <div className="text-left">
                <p className="font-medium">{selectedCountry?.name}</p>
                <p className="text-sm text-zinc-500">{selectedCountry?.currency}</p>
              </div>
            </div>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </div>

        {/* Estimated Receive */}
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-emerald-700">Recipient gets</span>
            <span className="text-lg font-bold text-emerald-800">
              ≈ {(sendAmount * 23.45).toLocaleString()} {selectedCountry?.currency}
            </span>
          </div>
          <p className="text-xs text-emerald-600 mt-1">Best rate available</p>
        </div>

        <Button 
          onClick={handleCompareRates}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={!sendAmount || sendAmount <= 0}
        >
          Compare Rates
        </Button>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm font-medium text-zinc-800">Rate History</p>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
          <div className="text-2xl mb-2">🔔</div>
          <p className="text-sm font-medium text-zinc-800">Set Alert</p>
        </Card>
      </div>

      <CountryPickerModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;