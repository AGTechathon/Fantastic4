import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Wallet, Vote, Shield, Users, CheckCircle, Clock, Plus, X, Trophy, BarChart3 } from 'lucide-react';
import detectEthereumProvider from '@metamask/detect-provider';
import Navigation from '@/components/Navigation';

interface Proposal {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: number[];
  endDate: string;
  status: 'active' | 'ended';
  totalVotes: number;
}

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [hasVoted, setHasVoted] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showCreateProposal, setShowCreateProposal] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    options: ['', ''],
    endDate: ''
  });

  // Mock proposals data
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'Student Union Budget Allocation',
      description: 'How should we allocate the $50,000 student union budget for the upcoming semester?',
      options: ['Events & Activities (40%)', 'Facility Improvements (35%)', 'Emergency Fund (25%)'],
      votes: [156, 134, 89],
      endDate: '2025-07-01',
      status: 'active',
      totalVotes: 379
    },
    {
      id: '2',
      title: 'Campus Sustainability Initiative',
      description: 'Which sustainability project should be prioritized this year?',
      options: ['Solar Panel Installation', 'Bike Sharing Program', 'Waste Reduction Campaign'],
      votes: [203, 167, 145],
      endDate: '2025-06-25',
      status: 'active',
      totalVotes: 515
    },
    {
      id: '3',
      title: 'Library Operating Hours',
      description: 'Should the library extend its operating hours during finals week?',
      options: ['Yes, 24/7 access', 'Yes, until 2 AM', 'Keep current hours'],
      votes: [289, 156, 67],
      endDate: '2025-06-20',
      status: 'ended',
      totalVotes: 512
    }
  ]);

  const connectMetaMask = async () => {
    setIsConnecting(true);
    
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
          setWalletAddress(shortAddress);
          setIsWalletConnected(true);
          
          toast({
            title: "MetaMask Connected",
            description: `Connected to ${shortAddress}`,
          });
        }
      } else {
        toast({
          title: "MetaMask Not Found",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletAddress('');
    setHasVoted([]);
    toast({
      title: "Wallet Disconnected",
      description: "Your MetaMask wallet has been disconnected.",
    });
  };

  const addOption = () => {
    setNewProposal(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index: number) => {
    if (newProposal.options.length > 2) {
      setNewProposal(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setNewProposal(prev => ({
      ...prev,
      options: prev.options.map((option, i) => i === index ? value : option)
    }));
  };

  const createProposal = () => {
    if (!newProposal.title || !newProposal.description || !newProposal.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (newProposal.options.some(option => !option.trim())) {
      toast({
        title: "Invalid Options",
        description: "All voting options must be filled in.",
        variant: "destructive",
      });
      return;
    }

    const proposal: Proposal = {
      id: (proposals.length + 1).toString(),
      title: newProposal.title,
      description: newProposal.description,
      options: newProposal.options,
      votes: new Array(newProposal.options.length).fill(0),
      endDate: newProposal.endDate,
      status: 'active',
      totalVotes: 0
    };

    setProposals(prev => [proposal, ...prev]);
    setNewProposal({
      title: '',
      description: '',
      options: ['', ''],
      endDate: ''
    });
    setShowCreateProposal(false);

    toast({
      title: "Proposal Created",
      description: "Your proposal has been created successfully.",
    });
  };

  const castVote = async (proposalId: string, optionIndex: number) => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your MetaMask wallet to vote.",
        variant: "destructive",
      });
      return;
    }

    if (hasVoted.includes(proposalId)) {
      toast({
        title: "Already Voted",
        description: "You have already voted on this proposal.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Processing Vote",
        description: "Your vote is being recorded on the blockchain...",
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

      setProposals(prev => prev.map(proposal => {
        if (proposal.id === proposalId) {
          const newVotes = [...proposal.votes];
          newVotes[optionIndex] += 1;
          return {
            ...proposal,
            votes: newVotes,
            totalVotes: proposal.totalVotes + 1
          };
        }
        return proposal;
      }));

      setHasVoted(prev => [...prev, proposalId]);

      toast({
        title: "Vote Recorded",
        description: "Your vote has been successfully recorded on the Solana blockchain.",
      });
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  const getWinner = (proposal: Proposal) => {
    if (proposal.totalVotes === 0) return null;
    
    const maxVotes = Math.max(...proposal.votes);
    const winnerIndex = proposal.votes.findIndex(votes => votes === maxVotes);
    
    const tieCount = proposal.votes.filter(votes => votes === maxVotes).length;
    if (tieCount > 1) {
      return { option: 'Tie', index: -1, votes: maxVotes, percentage: getVotePercentage(maxVotes, proposal.totalVotes) };
    }
    
    return {
      option: proposal.options[winnerIndex],
      index: winnerIndex,
      votes: maxVotes,
      percentage: getVotePercentage(maxVotes, proposal.totalVotes)
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation 
        isWalletConnected={isWalletConnected}
        walletAddress={walletAddress}
        onConnectWallet={connectMetaMask}
        onDisconnectWallet={disconnectWallet}
        isConnecting={isConnecting}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Create Proposal Form */}
        {showCreateProposal && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Proposal</CardTitle>
              <CardDescription>Create a new voting proposal for the campus community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newProposal.title}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter proposal title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Input
                  value={newProposal.description}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter proposal description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Voting Options</label>
                {newProposal.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    {newProposal.options.length > 2 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Option
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={newProposal.endDate}
                  onChange={(e) => setNewProposal(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>

              <div className="flex space-x-3">
                <Button onClick={createProposal} className="bg-blue-600 hover:bg-blue-700">
                  Create Proposal
                </Button>
                <Button variant="outline" onClick={() => setShowCreateProposal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Proposal Button */}
        {isWalletConnected && !showCreateProposal && (
          <div className="mb-8 text-center">
            <Button 
              onClick={() => setShowCreateProposal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Proposal
            </Button>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Secure. Transparent. Democratic.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            CampusVote leverages Solana blockchain technology to ensure every student voice is heard 
            and every vote is counted with complete transparency and security.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <Shield className="h-12 w-12 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Voting</h3>
              <p className="text-gray-600 text-sm text-center">
                Blockchain-secured votes ensure complete integrity and immutability
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <Users className="h-12 w-12 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Student Verified</h3>
              <p className="text-gray-600 text-sm text-center">
                Only verified students can participate in campus voting
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border">
              <Vote className="h-12 w-12 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Results</h3>
              <p className="text-gray-600 text-sm text-center">
                View live voting results with complete transparency
              </p>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Active Proposals</h3>
            <Badge variant="secondary" className="px-3 py-1">
              {proposals.filter(p => p.status === 'active').length} Active
            </Badge>
          </div>

          <div className="grid gap-6">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                      <CardDescription className="text-base">{proposal.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      {proposal.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Clock className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Ended</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    {/* Voting Options */}
                    <div className="space-y-4">
                      {proposal.options.map((option, index) => {
                        const percentage = getVotePercentage(proposal.votes[index], proposal.totalVotes);
                        const userVoted = hasVoted.includes(proposal.id);
                        const winner = getWinner(proposal);
                        const isWinning = winner && winner.index === index && proposal.status === 'ended';
                        
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{option}</span>
                                {isWinning && (
                                  <Trophy className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">
                                  {proposal.votes[index]} votes ({percentage.toFixed(1)}%)
                                </span>
                                {proposal.status === 'active' && !userVoted && (
                                  <Button
                                    size="sm"
                                    onClick={() => castVote(proposal.id, index)}
                                    disabled={!isWalletConnected}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                  >
                                    Vote
                                  </Button>
                                )}
                              </div>
                            </div>
                            <Progress 
                              value={percentage} 
                              className={`h-2 ${isWinning ? 'bg-yellow-100' : ''}`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Results Section */}
                    {proposal.status === 'ended' && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <BarChart3 className="h-5 w-5 text-gray-600 mr-2" />
                          <h4 className="font-semibold text-gray-900">Final Results</h4>
                        </div>
                        
                        {proposal.totalVotes > 0 ? (
                          <div className="space-y-3">
                            {(() => {
                              const winner = getWinner(proposal);
                              if (winner?.option === 'Tie') {
                                return (
                                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                                    <div className="flex items-center">
                                      <Trophy className="h-4 w-4 text-orange-500 mr-2" />
                                      <span className="font-medium text-orange-800">
                                        Result: Tie with {winner.votes} votes each ({winner.percentage.toFixed(1)}%)
                                      </span>
                                    </div>
                                  </div>
                                );
                              } else if (winner) {
                                return (
                                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="flex items-center">
                                      <Trophy className="h-4 w-4 text-yellow-600 mr-2" />
                                      <span className="font-medium text-yellow-800">
                                        Winner: "{winner.option}" with {winner.votes} votes ({winner.percentage.toFixed(1)}%)
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="bg-white rounded-lg p-3 border">
                                <div className="font-medium text-gray-700">Total Participation</div>
                                <div className="text-xl font-bold text-blue-600">{proposal.totalVotes}</div>
                                <div className="text-xs text-gray-500">verified votes</div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border">
                                <div className="font-medium text-gray-700">Blockchain Status</div>
                                <div className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600">Verified</span>
                                </div>
                                <div className="text-xs text-gray-500">on Solana</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <div className="text-gray-500">No votes recorded for this proposal</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Total Votes: <span className="font-semibold">{proposal.totalVotes}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Ends: {new Date(proposal.endDate).toLocaleDateString()}
                      </div>
                    </div>

                    {hasVoted.includes(proposal.id) && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-green-800">
                            You have voted on this proposal
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {!isWalletConnected && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <Wallet className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-blue-900 mb-2">Connect Your MetaMask to Vote</h4>
              <p className="text-blue-700 text-sm mb-4">
                Connect your MetaMask wallet to participate in campus voting
              </p>
              <Button 
                onClick={connectMetaMask} 
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
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
    </div>
  );
};

export default Index;
