
import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

import { Vote, User, Shield, BarChart3, Info, Home } from 'lucide-react';




interface NavigationProps {
  isWalletConnected: boolean;
  walletAddress: string;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  isConnecting: boolean;
}

const Navigation = ({ 
  isWalletConnected, 
  walletAddress, 
  onConnectWallet, 
  onDisconnectWallet, 
  isConnecting 
}: NavigationProps) => {
  const [location] = useLocation();

  const { isSignedIn } = useUser();


  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              {/* <div className="bg-blue-600 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div> */}
              
              
                {/* <h1 className="text-4xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 drop-shadow-md">
  CampusVote
</h1> */}






              {/* <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  CampusVote
                </h1>
                <p className="text-sm text-gray-600">Decentralized Student Voting</p>
              </div> */}




<div className="flex items-center gap-2">
  <div className="w-11 h-11 rounded-lg overflow-hidden">
    <img
      src="https://img.freepik.com/premium-photo/flat-glowing-blockchain-nodes-with-digital-chains-isolated-white-background-concept-as-two-glo_980716-680764.jpg?semt=ais_hybrid&w=740"
      alt="CampusVote Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CampusVote
              </span>
    <p className="text-sm text-gray-600">Decentralized Student Voting</p>
  </div>
</div>






            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Proposals</span>
              </Link>
              
              <Link 
                href="/dashboard" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>

              <Link 
                href="/about" 
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isActive('/about') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>

              <SignedIn>
                <Link 
                  href="/profile" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <Link 
                  href="/admin" 
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    isActive('/admin') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              </SignedIn>
            </nav>
          </div>
          
          {/* <div className="flex items-center space-x-4">
            {/* Clerk Authentication */}
            {/* <SignedOut>
              <SignInButton>
                <Button variant="outline">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut> */}
            {/* <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn> */}

            {/* MetaMask Wallet Connection */}
            {/* {isWalletConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">{walletAddress}</span>
                </div>
                <Button variant="outline" onClick={onDisconnectWallet}>
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onConnectWallet} 
                disabled={isConnecting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
              </Button>
            )}
          </div> */} 

             <div className="flex items-center space-x-4">
    {/* Clerk Authentication */}
    <SignedOut>
      <SignInButton>
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    </SignedOut>
    <SignedIn>
      <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />
    </SignedIn>

    {/* MetaMask Wallet Connection */}
    {isWalletConnected ? (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-800">{walletAddress}</span>
        </div>
        <Button variant="outline" onClick={onDisconnectWallet}>
          Disconnect Wallet
        </Button>
      </div>
    ) : (
      <Button 
        onClick={onConnectWallet}
        disabled={isConnecting || !isSignedIn}
        className={`bg-blue-600 hover:bg-blue-700 ${(!isSignedIn || isConnecting) ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </Button>
    )}
  </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
