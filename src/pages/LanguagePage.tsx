import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRate } from '../context/RateContext';
import { Card } from '../components/ui/card';

const LanguagePage: React.FC = () => {
  const navigate = useNavigate();
  const { setLanguage } = useRate();

  const handleLanguageSelect = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    navigate('/phone');
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-6 flex flex-col justify-center">
      <div className="text-center mb-12">
        <div className="text-4xl mb-4">🌍</div>
        <h1 className="text-2xl font-bold text-zinc-800 mb-2">Choose Language</h1>
        <p className="text-zinc-600">Select your preferred language</p>
      </div>

      <div className="space-y-4">
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-indigo-200"
          onClick={() => handleLanguageSelect('en')}
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🇺🇸</span>
            <div>
              <h3 className="text-lg font-semibold text-zinc-800">English</h3>
              <p className="text-zinc-600 text-sm">Continue in English</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-indigo-200"
          onClick={() => handleLanguageSelect('hi')}
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🇮🇳</span>
            <div>
              <h3 className="text-lg font-semibold text-zinc-800">हिन्दी</h3>
              <p className="text-zinc-600 text-sm">हिन्दी में जारी रखें</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LanguagePage;