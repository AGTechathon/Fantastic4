import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

// You may need to import Button and define/use isWalletConnected, walletAddress, onConnectWallet, onDisconnectWallet, isConnecting

const Auth = ({
  isWalletConnected,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
  isConnecting,
  Button
}: {
  isWalletConnected: boolean;
  walletAddress: string;
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  isConnecting: boolean;
  Button: React.ElementType;
}) => {
  const { isSignedIn } = useUser();

  return (
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
  );
};

export default Auth;
