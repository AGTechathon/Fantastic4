
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Shield, Users, BarChart3, Settings, AlertTriangle, CheckCircle, Clock, Ban } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock admin data
  const systemStats = {
    totalUsers: 2847,
    activeProposals: 5,
    totalVotes: 15623,
    systemHealth: 98.5
  };

  const recentUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@university.edu', status: 'verified', joinDate: '2024-06-12' },
    { id: 2, name: 'Bob Smith', email: 'bob@university.edu', status: 'pending', joinDate: '2024-06-11' },
    { id: 3, name: 'Carol Davis', email: 'carol@university.edu', status: 'verified', joinDate: '2024-06-10' },
  ];

  const flaggedActivities = [
    { id: 1, type: 'Multiple Vote Attempt', user: 'john.doe@university.edu', proposal: 'Budget Allocation', time: '2 hours ago' },
    { id: 2, type: 'Suspicious Login', user: 'jane.smith@university.edu', proposal: 'N/A', time: '5 hours ago' },
  ];

  const handleVerifyUser = (userId: number) => {
    toast({
      title: "User Verified",
      description: "User has been successfully verified.",
    });
  };

  const handleSuspendUser = (userId: number) => {
    toast({
      title: "User Suspended",
      description: "User account has been temporarily suspended.",
      variant: "destructive",
    });
  };

  const TabButton = ({ tab, label, icon: Icon }: { tab: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === tab 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the CampusVote platform and monitor system activity</p>
        </div>

        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 p-2 bg-white rounded-lg border">
          <TabButton tab="overview" label="Overview" icon={BarChart3} />
          <TabButton tab="users" label="User Management" icon={Users} />
          <TabButton tab="security" label="Security" icon={Shield} />
          <TabButton tab="settings" label="Settings" icon={Settings} />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsers}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                      <p className="text-3xl font-bold text-green-600">{systemStats.activeProposals}</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Votes</p>
                      <p className="text-3xl font-bold text-purple-600">{systemStats.totalVotes}</p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Health</p>
                      <p className="text-3xl font-bold text-orange-600">{systemStats.systemHealth}%</p>
                    </div>
                    <Shield className="h-10 w-10 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Registrations</CardTitle>
                  <CardDescription>Latest users who joined the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.joinDate}</p>
                        </div>
                        <Badge 
                          className={user.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Flagged Activities
                  </CardTitle>
                  <CardDescription>Security events requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {flaggedActivities.map((activity) => (
                      <div key={activity.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-orange-900">{activity.type}</p>
                            <p className="text-sm text-orange-700">User: {activity.user}</p>
                            <p className="text-xs text-orange-600">{activity.time}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Input placeholder="Search users..." className="max-w-md" />
                    <Button>Search</Button>
                  </div>
                  
                  <div className="space-y-3">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge 
                            className={user.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {user.status}
                          </Badge>
                          {user.status === 'pending' && (
                            <Button size="sm" onClick={() => handleVerifyUser(user.id)}>
                              Verify
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleSuspendUser(user.id)}>
                            Suspend
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure platform security and monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Authentication</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Verification</span>
                        <Badge className="bg-green-100 text-green-800">Required</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Student ID Verification</span>
                        <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Monitoring</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Vote Monitoring</span>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Fraud Detection</span>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Login Monitoring</span>
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure global platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Voting Configuration</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Voting Duration (hours)
                        </label>
                        <Input type="number" defaultValue="24" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Voting Duration (days)
                        </label>
                        <Input type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Proposal Settings</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Options per Proposal
                        </label>
                        <Input type="number" defaultValue="2" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Options per Proposal
                        </label>
                        <Input type="number" defaultValue="10" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
