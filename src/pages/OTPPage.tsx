import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

const OTPPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    
    // Mock verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(30);
    setOtp('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 flex flex-col justify-center">
      <div className="text-center mb-12">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Verify Phone</h1>
        <p className="text-zinc-600">Enter the 6-digit code sent to</p>
        <p className="text-zinc-800 font-medium">+971 50123****</p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium text-zinc-700 block text-center">
            Verification Code
          </label>
          
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <Button 
          onClick={handleVerify}
          disabled={otp.length !== 6 || isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </Button>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-zinc-500">
              Resend in {countdown}s
            </p>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResend}
              className="text-indigo-600 hover:text-indigo-700"
            >
              Resend Code
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default OTPPage;