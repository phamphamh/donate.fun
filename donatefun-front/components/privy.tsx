'use client';

import {PrivyProvider} from '@privy-io/react-auth';

const mainnet = {
  id: 295,
  name: 'Hedera',
  rpcUrls: {
    default: {
      http: ['https://295.rpc.thirdweb.com/']
    }
  },
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/mainnet'
    },
  },
};


export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="cm80oazo200xhy6kt2c5mpagu"
      config={{
        walletConnectCloudProjectId: 'e2114a15ca94f4a4105a0247f911f766',
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          // Configuration pour afficher MetaMask dans la liste des wallets
          walletList: ['metamask', 'wallet_connect', 'detected_wallets'],
          // Spécifier que l'application utilise uniquement Ethereum (inclut Hedera via EVM)
          walletChainType: 'ethereum-only',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
        // Configuration des chaînes supportées incluant Hedera
        supportedChains: [
mainnet
        ],
        // Définir Hedera comme chaîne par défaut
        defaultChain: mainnet,
      }}
    >
      {children}
    </PrivyProvider>
  );
}