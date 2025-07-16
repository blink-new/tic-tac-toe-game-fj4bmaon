import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Slider } from '../../components/ui/slider';

const CalculatorInputPage: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(50000);
  const [apr, setAPR] = useState<number>(8.5);
  const [tenor, setTenor] = useState([24]);

  const handleCalculate = () => {
    const params = new URLSearchParams({
      amount: amount.toString(),
      apr: apr.toString(),
      tenor: tenor[0].toString()
    });
    navigate(`/calculator/result?${params}`);
  };

  const isValid = amount > 0 && apr > 0 && tenor[0] >= 6 && tenor[0] <= 60;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <h1 className="text-lg font-semibold text-zinc-800">EMI Calculator</h1>
        <p className="text-sm text-zinc-600">Calculate your monthly payments</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Loan Amount */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Loan Amount</label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pr-16 text-lg font-semibold"
                placeholder="50000"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-zinc-500 font-medium">AED</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">Enter the total loan amount</p>
          </div>
        </Card>

        {/* Interest Rate */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Annual Interest Rate</label>
            <div className="relative">
              <Input
                type="number"
                step="0.1"
                value={apr}
                onChange={(e) => setAPR(Number(e.target.value))}
                className="pr-16 text-lg font-semibold"
                placeholder="8.5"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-zinc-500 font-medium">%</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">Annual percentage rate</p>
          </div>
        </Card>

        {/* Loan Tenor */}
        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">Loan Tenor</label>
            <div className="text-center">
              <span className="text-3xl font-bold text-indigo-600">
                {tenor[0]}
              </span>
              <span className="text-lg text-zinc-600 ml-2">months</span>
            </div>
          </div>

          <div className="space-y-4">
            <Slider
              value={tenor}
              onValueChange={setTenor}
              max={60}
              min={6}
              step={1}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-zinc-500">
              <span>6 months</span>
              <span>33 months</span>
              <span>60 months</span>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-zinc-600">Years</p>
                <p className="font-semibold text-zinc-800">{(tenor[0] / 12).toFixed(1)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-600">Months</p>
                <p className="font-semibold text-zinc-800">{tenor[0]}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Preview */}
        {isValid && (
          <Card className="p-4 bg-emerald-50 border-emerald-200">
            <div className="text-center">
              <p className="text-sm text-emerald-700 mb-1">Estimated Monthly EMI</p>
              <p className="text-2xl font-bold text-emerald-800">
                {(() => {
                  const monthlyRate = apr / 100 / 12;
                  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenor[0])) / 
                             (Math.pow(1 + monthlyRate, tenor[0]) - 1);
                  return Math.round(emi).toLocaleString();
                })()}
                <span className="text-lg ml-1">AED</span>
              </p>
            </div>
          </Card>
        )}

        <Button 
          onClick={handleCalculate}
          disabled={!isValid}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          Calculate EMI
        </Button>
      </div>
    </div>
  );
};

export default CalculatorInputPage;