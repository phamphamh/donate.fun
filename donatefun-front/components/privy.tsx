"use client";

import { config } from "@/lib/config";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { WagmiProvider } from "wagmi";

const mainnet = {
  id: 295,
  name: "Hedera",
  rpcUrls: {
    default: {
      http: ["https://295.rpc.thirdweb.com/"],
    },
  },
  nativeCurrency: {
    name: "HBAR",
    symbol: "HBAR",
    decimals: 18,
  },
  blockExplorers: {
    default: {
      name: "HashScan",
      url: "https://hashscan.io/mainnet",
    },
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId="cm80oazo200xhy6kt2c5mpagu"
          config={{
            walletConnectCloudProjectId: "e2114a15ca94f4a4105a0247f911f766",
            // Customize Privy's appearance in your app
            appearance: {
              theme: theme === "dark" ? "dark" : "light",
              accentColor: "#676FFF",
              // Configuration pour afficher MetaMask dans la liste des wallets
              walletList: ["metamask", "wallet_connect", "detected_wallets"],
              // Spécifier que l'application utilise uniquement Ethereum (inclut Hedera via EVM)
              walletChainType: "ethereum-only",
            },
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
              showWalletUIs: false,
            },
            // Configuration des chaînes supportées incluant Hedera
            supportedChains: [mainnet],
            // Définir Hedera comme chaîne par défaut
            defaultChain: mainnet,
            loginMethods: ["email", "wallet", "google", "apple", "twitter"],
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
