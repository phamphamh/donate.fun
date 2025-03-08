"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"

interface DonationButtonProps {
  projectId: string
}

export default function DonationButton({ projectId }: DonationButtonProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState("25")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const presetAmounts = ["10", "25", "50", "100"]

  const handleDonate = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would process the payment here
    console.log(`Donating $${amount} to project ${projectId}`)

    setIsSubmitting(false)
    setShowSuccess(true)

    // Close after showing success
    setTimeout(() => {
      setOpen(false)
      // Reset for next time
      setTimeout(() => setShowSuccess(false), 500)
    }, 2000)
  }

  return (
    <>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => setOpen(true)}
          size="lg"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300"
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
            className="mr-2"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          Donate Now
        </Button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950/30 border-none">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-6"
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Thank You!</h2>
                <p className="text-center text-muted-foreground">
                  Your donation has been processed successfully. You'll receive a confirmation email shortly.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <DialogHeader>
                  <DialogTitle>Make a Donation</DialogTitle>
                  <DialogDescription>
                    Your contribution helps make this project a reality. All donations are processed securely.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 gap-2">
                    {presetAmounts.map((preset) => (
                      <motion.div key={preset} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          type="button"
                          variant={amount === preset ? "default" : "outline"}
                          onClick={() => setAmount(preset)}
                          className={
                            amount === preset
                              ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                              : ""
                          }
                        >
                          ${preset}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Custom amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name (optional)</Label>
                    <Input id="name" placeholder="Your name or 'Anonymous'" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (optional)</Label>
                    <Input id="message" placeholder="Add a message of support" />
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleDonate}
                      disabled={isSubmitting || !amount || Number.parseInt(amount) < 1}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        `Donate $${amount}`
                      )}
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}

