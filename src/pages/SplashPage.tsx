import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-emerald-500 flex flex-col items-center justify-center relative">
      {/* Logo */}
      <div className="text-center">
        <div className="text-6xl mb-4">💸</div>
        <h1 className="text-3xl font-bold text-white mb-2">RemitFlow</h1>
        <p className="text-indigo-100 text-lg">Send money worldwide</p>
      </div>

      {/* Version */}
      <div className="absolute bottom-8 right-8">
        <span className="text-white/70 text-sm">v 1.0.0</span>
      </div>
    </div>
  );
};

export default SplashPage;