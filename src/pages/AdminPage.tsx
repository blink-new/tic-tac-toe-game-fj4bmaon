import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { ArrowLeftIcon, UploadIcon } from '@heroicons/react/24/outline';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock user data
  const users = [
    { id: '1', phone: '+971501234567', language: 'en', xp: 150, alerts: 2, joinedAt: '2024-01-15' },
    { id: '2', phone: '+971509876543', language: 'hi', xp: 85, alerts: 1, joinedAt: '2024-01-20' },
    { id: '3', phone: '+971507654321', language: 'en', xp: 220, alerts: 3, joinedAt: '2024-01-25' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-zinc-200 p-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home')}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-zinc-800">Admin Dashboard</h1>
              <p className="text-sm text-zinc-600">Manage users and content</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{users.length}</div>
                <p className="text-sm text-zinc-600">Total Users</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {users.reduce((sum, user) => sum + user.alerts, 0)}
                </div>
                <p className="text-sm text-zinc-600">Active Alerts</p>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {users.reduce((sum, user) => sum + user.xp, 0)}
                </div>
                <p className="text-sm text-zinc-600">Total XP</p>
              </div>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-800">Users</h2>
              <Button size="sm" variant="outline">
                Export Data
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>XP</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.phone}</TableCell>
                    <TableCell>
                      <span className="flex items-center space-x-2">
                        <span>{user.language === 'en' ? '🇺🇸' : '🇮🇳'}</span>
                        <span>{user.language === 'en' ? 'English' : 'हिन्दी'}</span>
                      </span>
                    </TableCell>
                    <TableCell>{user.xp}</TableCell>
                    <TableCell>{user.alerts}</TableCell>
                    <TableCell>{user.joinedAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Content Management */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-zinc-800 mb-4">Content Management</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-zinc-800">Upload Lesson</h3>
                  <p className="text-sm text-zinc-600">Add new educational content</p>
                </div>
                <Button disabled variant="outline">
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Upload (Coming Soon)
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-zinc-800">Manage Providers</h3>
                  <p className="text-sm text-zinc-600">Update exchange rate providers</p>
                </div>
                <Button disabled variant="outline">
                  Manage (Coming Soon)
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-zinc-800">Analytics</h3>
                  <p className="text-sm text-zinc-600">View detailed usage statistics</p>
                </div>
                <Button disabled variant="outline">
                  View (Coming Soon)
                </Button>
              </div>
            </div>
          </Card>

          {/* Warning */}
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-start space-x-3">
              <div className="text-red-600 text-xl">⚠️</div>
              <div>
                <h3 className="font-medium text-red-800">Admin Access</h3>
                <p className="text-sm text-red-700">
                  This is a restricted area. Only authorized administrators should access this page.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;