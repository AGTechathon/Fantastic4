
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Vote, Users, Lock, Zap, Globe } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Every vote is secured by Solana blockchain technology, ensuring immutable and transparent records.'
    },
    {
      icon: Vote,
      title: 'Democratic Process',
      description: 'Fair and transparent voting system where every student voice counts equally.'
    },
    {
      icon: Users,
      title: 'Student Verified',
      description: 'Only verified students can participate, ensuring authentic campus representation.'
    },
    {
      icon: Lock,
      title: 'Privacy Protected',
      description: 'Your voting choices are private while maintaining complete transparency of results.'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'See live voting results and participate in ongoing campus decisions.'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Vote from anywhere on campus or remotely with your MetaMask wallet.'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'Lead Developer',
      description: 'Blockchain enthusiast with 5+ years in decentralized applications.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Student Advisor',
      description: 'Student Government President ensuring authentic student needs.'
    },
    {
      name: 'Dr. Michael Brown',
      role: 'Faculty Advisor',
      description: 'Computer Science Professor specializing in distributed systems.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About CampusVote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionizing student democracy through blockchain technology. CampusVote ensures 
            every student voice is heard with complete transparency, security, and trust.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg">
              To empower students with a secure, transparent, and accessible voting platform that 
              strengthens campus democracy and ensures every voice contributes to meaningful change.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose CampusVote?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">How CampusVote Works</CardTitle>
            <CardDescription className="text-center text-lg">
              Simple, secure, and transparent voting in four easy steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Connect Wallet</h3>
                <p className="text-sm text-gray-600">Connect your MetaMask wallet to verify your identity</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Browse Proposals</h3>
                <p className="text-sm text-gray-600">View active proposals and read detailed descriptions</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Cast Your Vote</h3>
                <p className="text-sm text-gray-600">Vote securely on the Solana blockchain</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">4</span>
                </div>
                <h3 className="font-semibold mb-2">See Results</h3>
                <p className="text-sm text-gray-600">Watch real-time results and final outcomes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Foundation</CardTitle>
            <CardDescription>Built on cutting-edge blockchain technology</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Blockchain Infrastructure</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Solana blockchain for fast, low-cost transactions</li>
                  <li>• MetaMask integration for secure wallet connection</li>
                  <li>• Immutable vote recording and verification</li>
                  <li>• Real-time result computation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Security Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Cryptographic vote encryption</li>
                  <li>• Student identity verification</li>
                  <li>• Tamper-proof result calculation</li>
                  <li>• Transparent audit trail</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
