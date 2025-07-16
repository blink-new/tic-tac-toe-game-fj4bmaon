import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const CalculatorResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const amount = Number(searchParams.get('amount')) || 50000;
  const apr = Number(searchParams.get('apr')) || 8.5;
  const tenor = Number(searchParams.get('tenor')) || 24;

  // Calculate EMI
  const monthlyRate = apr / 100 / 12;
  const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenor)) / 
             (Math.pow(1 + monthlyRate, tenor) - 1);
  
  const totalPayment = emi * tenor;
  const totalInterest = totalPayment - amount;
  
  // Convert to home currency (INR) using FX rate of 23
  const emiInINR = emi * 23;
  const totalPaymentInINR = totalPayment * 23;

  // Generate amortization data for chart
  const generateAmortizationData = () => {
    const data = [];
    let remainingBalance = amount;
    
    for (let month = 1; month <= Math.min(tenor, 12); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;
      
      data.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance
      });
    }
    
    return data;
  };

  const amortizationData = generateAmortizationData();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200 p-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/calculator')}
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-zinc-800">EMI Results</h1>
            <p className="text-sm text-zinc-600">
              {amount.toLocaleString()} AED • {apr}% • {tenor} months
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* EMI Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6 bg-indigo-50 border-indigo-200">
            <div className="text-center">
              <p className="text-sm text-indigo-700 mb-1">Monthly EMI (AED)</p>
              <p className="text-3xl font-bold text-indigo-800">
                {Math.round(emi).toLocaleString()}
                <span className="text-lg ml-1">AED</span>
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <div className="text-center">
              <p className="text-sm text-emerald-700 mb-1">Monthly EMI (INR)</p>
              <p className="text-3xl font-bold text-emerald-800">
                ₹{Math.round(emiInINR).toLocaleString()}
              </p>
              <p className="text-xs text-emerald-600 mt-1">@ 23.00 INR/AED</p>
            </div>
          </Card>
        </div>

        {/* Summary */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-zinc-800">Loan Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-600">Principal Amount</span>
              <span className="font-medium">{amount.toLocaleString()} AED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Total Interest</span>
              <span className="font-medium text-red-600">
                {Math.round(totalInterest).toLocaleString()} AED
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold text-zinc-800">Total Payment</span>
              <span className="font-bold text-zinc-800">
                {Math.round(totalPayment).toLocaleString()} AED
              </span>
            </div>
            <div className="flex justify-between text-sm text-zinc-600">
              <span>Total Payment (INR)</span>
              <span>₹{Math.round(totalPaymentInINR).toLocaleString()}</span>
            </div>
          </div>
        </Card>

        {/* Amortization Chart Placeholder */}
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-zinc-800">Payment Breakdown (First 12 months)</h3>
          
          <div className="h-48 bg-zinc-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-zinc-500">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm">Amortization Chart</p>
              <p className="text-xs">Principal vs Interest over time</p>
            </div>
          </div>

          {/* Simple data table */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {amortizationData.slice(0, 6).map((data) => (
              <div key={data.month} className="flex justify-between text-sm">
                <span className="text-zinc-600">Month {data.month}</span>
                <div className="flex space-x-4">
                  <span className="text-blue-600">
                    P: {Math.round(data.principal).toLocaleString()}
                  </span>
                  <span className="text-red-600">
                    I: {Math.round(data.interest).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/calculator')}
            variant="outline"
            className="w-full"
          >
            Recalculate
          </Button>
          
          <Button 
            onClick={() => navigate('/home')}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            Send Money Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResultPage;