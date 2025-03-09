"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useFundWallet, usePrivy } from "@privy-io/react-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, Wallet, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useBalance } from "wagmi";
import { Address } from "viem";

// Composant interne qui utilise les hooks de Privy
function HeaderContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { login, authenticated, user, logout } = usePrivy();
  const { toast } = useToast();
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const { data: balanceData } = useBalance({
    address: user?.wallet?.address as Address,
  });
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour formater l'adresse du wallet
  const formatAddress = (address: string | undefined): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      if (user?.wallet) {
        // First logout to ensure clean state
        await logout();
        toast({
          title: "Wallet disconnected",
          description: "Your wallet has been disconnected successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error disconnecting wallet",
        description:
          "There was an error disconnecting your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeposit = async () => {
    try {
      // This is where you would integrate with a payment provider or implement
      // the deposit logic using Hedera's SDK
      toast({
        title: "Deposit initiated",
        description: "Please complete the transaction in your wallet",
      });
      setIsDepositOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your deposit",
        variant: "destructive",
      });
    }
  };

  const { fundWallet } = useFundWallet();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-gray-200/10 dark:border-gray-800/10 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </motion.div>
            <span className="text-xl font-bold group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-blue-600 transition-all duration-300">
              Donate.fun
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors duration-200"
            >
              How It Works
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />

          <div className="hidden md:flex items-center gap-2">
            {!authenticated ? (
              <Button
                onClick={login}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Log in
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 transition-colors duration-200"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            ${balanceData?.value}
                          </span>
                          {formatAddress(user?.wallet?.address)}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DialogTrigger asChild>
                        <DropdownMenuItem
                          onClick={() =>
                            fundWallet(user?.wallet?.address as Address, {
                              chain: { id: 295 },
                            })
                          }
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Deposit
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleDisconnectWallet}>
                        <Wallet className="mr-2 h-4 w-4" />
                        Disconnect Wallet
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Dialog>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "hidden" : "block"}
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isMenuOpen ? "block" : "hidden"}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/explore"
                  className="text-sm font-medium hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-sm font-medium hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
              </nav>

              <div className="flex flex-col space-y-2">
                {!authenticated ? (
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      login();
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                  >
                    Log in
                  </Button>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg mb-2">
                      <span className="text-sm font-medium">Balance:</span>
                      <span className="font-bold">${balanceData?.value}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        fundWallet(user?.wallet?.address as Address, {
                          chain: { id: 295 },
                        });
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Deposit
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleDisconnectWallet();
                      }}
                    >
                      Disconnect Wallet
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function Header() {
  return <HeaderContent />;
}
