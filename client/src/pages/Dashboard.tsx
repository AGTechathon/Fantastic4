
import React, { useState } from 'react';
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BarChart3, Vote, Trophy, Clock, TrendingUp, Users, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const [timeRange, setTimeRange] = useState('month');

  // Mock data for dashboard
  const stats = {
    totalVotes: 1247,
    proposalsParticipated: 12,
    votingAccuracy: 87,
    rankPosition: 156
  };

  const recentActivity = [
    { id: 1, action: 'Voted on', proposal: 'Student Union Budget Allocation', date: '2025-06-10', result: 'winning' },
    { id: 2, action: 'Created', proposal: 'Library Hours Extension', date: '2025-06-08', result: 'pending' },
    { id: 3, action: 'Voted on', proposal: 'Campus Sustainability Initiative', date: '2025-06-05', result: 'losing' },
  ];

  const votingTrends = [
    { month: 'Jan', votes: 45 },
    { month: 'Feb', votes: 52 },
    { month: 'Mar', votes: 38 },
    { month: 'Apr', votes: 65 },
    { month: 'May', votes: 71 },
    { month: 'Jun', votes: 89 },
  ];

  return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Authentication Required</CardTitle>
              <CardDescription>Please sign in to access your voting dashboard</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SignInButton>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign In to Continue
                </Button>
              </SignInButton>
            </CardContent>
          </Card>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName}!</h1>
              <p className="text-gray-600">Track your voting activity and impact on campus decisions</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Votes Cast</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalVotes}</p>
                    </div>
                    <Vote className="h-10 w-10 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Proposals Participated</p>
                      <p className="text-3xl font-bold text-green-600">{stats.proposalsParticipated}</p>
                    </div>
                    <BarChart3 className="h-10 w-10 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Voting Accuracy</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.votingAccuracy}%</p>
                    </div>
                    <Trophy className="h-10 w-10 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Campus Rank</p>
                      <p className="text-3xl font-bold text-orange-600">#{stats.rankPosition}</p>
                    </div>
                    <Users className="h-10 w-10 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest voting actions and proposal interactions</CardDescription>
                </CardHeader>
                <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.action} "{activity.proposal}"
                      </p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <div>
                      {activity.result === 'winning' && (
                        <Badge className="bg-green-100 text-green-800">Winning</Badge>
                      )}
                      {activity.result === 'losing' && (
                        <Badge variant="secondary">Not Winning</Badge>
                      )}
                      {activity.result === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Voting Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Voting Trends
              </CardTitle>
              <CardDescription>Your voting participation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingTrends.map((trend, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{trend.month}</div>
                    <div className="flex-1">
                      <Progress value={(trend.votes / 100) * 100} className="h-3" />
                    </div>
                    <div className="w-12 text-sm font-bold text-blue-600">{trend.votes}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Achievements
            </CardTitle>
            <CardDescription>Your voting milestones and accomplishments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <CheckCircle className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-900">Early Adopter</p>
                  <p className="text-sm text-blue-700">First 100 voters on platform</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <Vote className="h-8 w-8 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900">Active Participant</p>
                  <p className="text-sm text-green-700">Voted on 10+ proposals</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg opacity-50">
                <Trophy className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-900">Campus Leader</p>
                  <p className="text-sm text-purple-700">Top 50 most active voters</p>
                </div>
              </div>
            </div>
          </CardContent>
          </Card>
        </div>
          </div>
          <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
                  <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="w-11 h-11 rounded-lg overflow-hidden">
    <img
      src="https://img.freepik.com/premium-photo/flat-glowing-blockchain-nodes-with-digital-chains-isolated-white-background-concept-as-two-glo_980716-680764.jpg?semt=ais_hybrid&w=740"
      alt="CampusVote Logo"
      className="w-full h-full object-cover"
    />
  </div>
                        <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CampusVote
              </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Powered by Solana blockchain • Secure • Transparent • Democratic
                      </p>
                    </div>
                  </div>
                </footer>
        </SignedIn>
    </>
  );
};

export default Dashboard;
