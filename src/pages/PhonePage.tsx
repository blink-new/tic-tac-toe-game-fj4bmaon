import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

const PhonePage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidPhone = phone.length === 9 && /^\d+$/.test(phone);

  const handleSendOTP = async () => {
    if (!isValidPhone) return;
    
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/otp');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 flex flex-col justify-center">
      <div className="text-center mb-12">
        <div className="text-4xl mb-4">📱</div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Enter Phone Number</h1>
        <p className="text-zinc-600">We'll send you a verification code</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">Phone Number</label>
          <div className="flex space-x-2">
            <div className="flex items-center px-3 py-2 bg-zinc-100 rounded-lg border">
              <span className="text-zinc-700 font-medium">+971</span>
            </div>
            <Input
              type="tel"
              placeholder="501234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-zinc-500">Enter your UAE mobile number</p>
        </div>

        <Button 
          onClick={handleSendOTP}
          disabled={!isValidPhone || isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
      </Card>

      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default PhonePage;