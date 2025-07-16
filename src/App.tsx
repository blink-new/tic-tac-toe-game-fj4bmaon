import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RateProvider } from './context/RateContext';
import { BottomTab } from './components/BottomTab';
import { Toaster } from './components/ui/toaster';

// Auth pages
import SplashPage from './pages/SplashPage';
import LanguagePage from './pages/LanguagePage';
import PhonePage from './pages/PhonePage';
import OTPPage from './pages/OTPPage';

// Tab pages
import HomePage from './pages/home/HomePage';
import HomeResultsPage from './pages/home/HomeResultsPage';
import AlertsNewPage from './pages/alerts/AlertsNewPage';
import AlertsIndexPage from './pages/alerts/AlertsIndexPage';
import CalculatorInputPage from './pages/calculator/CalculatorInputPage';
import CalculatorResultPage from './pages/calculator/CalculatorResultPage';
import LearnIndexPage from './pages/learn/LearnIndexPage';
import LearnDetailPage from './pages/learn/LearnDetailPage';
import ProfileIndexPage from './pages/profile/ProfileIndexPage';
import ProfileNotificationsPage from './pages/profile/ProfileNotificationsPage';

// Other pages
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout component for tabbed pages
const TabLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {children}
      </div>
      <BottomTab />
    </div>
  );
};

// Layout component for auth pages
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <RateProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Auth flow */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="/splash" element={
              <AuthLayout>
                <SplashPage />
              </AuthLayout>
            } />
            <Route path="/language" element={
              <AuthLayout>
                <LanguagePage />
              </AuthLayout>
            } />
            <Route path="/phone" element={
              <AuthLayout>
                <PhonePage />
              </AuthLayout>
            } />
            <Route path="/otp" element={
              <AuthLayout>
                <OTPPage />
              </AuthLayout>
            } />

            {/* Tab navigation */}
            <Route path="/home" element={
              <TabLayout>
                <HomePage />
              </TabLayout>
            } />
            <Route path="/home/results" element={
              <TabLayout>
                <HomeResultsPage />
              </TabLayout>
            } />
            
            <Route path="/alerts" element={
              <TabLayout>
                <AlertsIndexPage />
              </TabLayout>
            } />
            <Route path="/alerts/new" element={
              <TabLayout>
                <AlertsNewPage />
              </TabLayout>
            } />
            
            <Route path="/calculator" element={
              <TabLayout>
                <CalculatorInputPage />
              </TabLayout>
            } />
            <Route path="/calculator/result" element={
              <TabLayout>
                <CalculatorResultPage />
              </TabLayout>
            } />
            
            <Route path="/learn" element={
              <TabLayout>
                <LearnIndexPage />
              </TabLayout>
            } />
            <Route path="/learn/:id" element={
              <TabLayout>
                <LearnDetailPage />
              </TabLayout>
            } />
            
            <Route path="/profile" element={
              <TabLayout>
                <ProfileIndexPage />
              </TabLayout>
            } />
            <Route path="/profile/notifications" element={
              <TabLayout>
                <ProfileNotificationsPage />
              </TabLayout>
            } />

            {/* Other routes */}
            <Route path="/admin" element={
              <AuthLayout>
                <AdminPage />
              </AuthLayout>
            } />
            
            <Route path="*" element={
              <AuthLayout>
                <NotFoundPage />
              </AuthLayout>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </RateProvider>
  );
}

export default App;