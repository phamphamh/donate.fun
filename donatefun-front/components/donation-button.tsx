"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCampaignContract } from "@/hooks/use-campaign-contract";

interface DonationButtonProps {
  projectId: string;
}

export default function DonationButton({ projectId }: DonationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const { contribute, isContributePending } = useCampaignContract();

  const handleDonate = async () => {
    try {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid donation amount",
          variant: "destructive",
        });
        return;
      }

      await contribute(numAmount);

      toast({
        title: "Thank you for your donation!",
        description: "Your contribution has been processed successfully.",
      });

      setIsOpen(false);
      setAmount("");
    } catch (error) {
      console.error("Error donating:", error);
      toast({
        title: "Error",
        description:
          "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg py-6"
          size="lg"
        >
          Back this project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogDescription>
            Enter the amount you would like to donate to this project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (in HBAR)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleDonate}
            disabled={isContributePending || !amount}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {isContributePending ? "Processing..." : "Donate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
