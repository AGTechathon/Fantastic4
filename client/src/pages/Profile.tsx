
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Mail, School, Calendar, Shield, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.fullName || 'Student Name',
    email: user?.primaryEmailAddress?.emailAddress || 'student@university.edu',
    studentId: 'ST2021001234',
    year: 'Junior',
    major: 'Computer Science',
    joinDate: user?.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '2024-01-15',
    verified: user?.emailAddresses?.[0]?.verification?.status === 'verified'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const votingHistory = [
    { id: 1, proposal: 'Student Union Budget Allocation', date: '2024-06-10', choice: 'Events & Activities', result: 'Won' },
    { id: 2, proposal: 'Campus Sustainability Initiative', date: '2024-06-05', choice: 'Solar Panel Installation', result: 'Won' },
    { id: 3, proposal: 'Library Operating Hours', date: '2024-05-28', choice: 'Yes, 24/7 access', result: 'Won' },
    { id: 4, proposal: 'Campus Parking Policy', date: '2024-05-20', choice: 'Increase Student Spots', result: 'Lost' },
    { id: 5, proposal: 'Dining Hall Menu Changes', date: '2024-05-15', choice: 'More Vegetarian Options', result: 'Won' },
  ];

  const stats = {
    totalVotes: votingHistory.length,
    successRate: Math.round((votingHistory.filter(v => v.result === 'Won').length / votingHistory.length) * 100),
    streak: 3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and view your voting history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                    <p className="text-gray-900 font-medium">{profile.studentId}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.year}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, year: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.year}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.major}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, major: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{profile.major}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Status</label>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <Badge className="bg-green-100 text-green-800">Verified Student</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voting History */}
            <Card>
              <CardHeader>
                <CardTitle>Voting History</CardTitle>
                <CardDescription>Your recent voting activity and choices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {votingHistory.map((vote) => (
                    <div key={vote.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{vote.proposal}</h4>
                        <p className="text-sm text-gray-600">Voted: "{vote.choice}"</p>
                        <p className="text-xs text-gray-500">{vote.date}</p>
                      </div>
                      <div>
                        {vote.result === 'Won' ? (
                          <Badge className="bg-green-100 text-green-800">Won</Badge>
                        ) : (
                          <Badge variant="secondary">Lost</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Voting Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{stats.totalVotes}</div>
                  <div className="text-sm text-blue-700">Total Votes Cast</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{stats.successRate}%</div>
                  <div className="text-sm text-green-700">Success Rate</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{stats.streak}</div>
                  <div className="text-sm text-purple-700">Current Streak</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Authentication</span>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Notifications</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Wallet Connected</span>
                  <Badge className="bg-blue-100 text-blue-800">MetaMask</Badge>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
