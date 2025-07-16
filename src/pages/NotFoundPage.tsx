import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { HomeIcon } from '@heroicons/react/24/outline';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <Card className="p-8 text-center max-w-sm w-full">
        <div className="space-y-6">
          {/* Illustration */}
          <div className="text-8xl">🤔</div>
          
          {/* Content */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-zinc-800">Page Not Found</h1>
            <p className="text-zinc-600">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/home')}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Go Back
            </Button>
          </div>
          
          {/* Help */}
          <div className="pt-4 border-t border-zinc-200">
            <p className="text-xs text-zinc-500">
              Need help? Contact our support team
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;