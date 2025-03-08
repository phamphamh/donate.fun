"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Checkpoint {
  id: string
  title: string
  percentage: number
  completed: boolean
  description: string
  proofUrl: string
}

interface CheckpointProgressProps {
  checkpoints: Checkpoint[]
}

export default function CheckpointProgress({ checkpoints }: CheckpointProgressProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-4">
      {checkpoints.map((checkpoint, index) => (
        <motion.div
          key={checkpoint.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            className={`transition-all duration-300 overflow-hidden border-none shadow-md ${
              checkpoint.completed
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30"
                : index > 0 && checkpoints[index - 1].completed
                  ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
                  : "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    checkpoint.completed
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                      : index > 0 && checkpoints[index - 1].completed
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-500 dark:text-gray-300"
                  }`}
                >
                  {checkpoint.completed ? (
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
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{checkpoint.title}</h3>
                    <div className="text-sm text-muted-foreground">{checkpoint.percentage}% of total</div>
                  </div>

                  <p className="text-muted-foreground mb-4">{checkpoint.description}</p>

                  {checkpoint.completed && checkpoint.proofUrl && (
                    <div>
                      <div className="text-sm font-medium mb-2 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-600"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        Proof of completion:
                      </div>
                      <div className="relative overflow-hidden rounded-lg mb-2">
                        <img
                          src={checkpoint.proofUrl || "/placeholder.svg"}
                          alt={`Proof for ${checkpoint.title}`}
                          className="w-full h-auto transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white">
                            <p className="font-medium">Verification proof</p>
                            <p className="text-sm text-white/80">Click to view full details</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExpand(checkpoint.id)}
                        className="group bg-white dark:bg-gray-800"
                      >
                        <span>{expandedId === checkpoint.id ? "Hide details" : "View full proof"}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`ml-2 transition-transform duration-300 ${
                            expandedId === checkpoint.id ? "rotate-180" : "group-hover:translate-y-1"
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>

                      <AnimatePresence>
                        {expandedId === checkpoint.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                              <h4 className="font-medium mb-2">Verification Details</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                This checkpoint was verified on <span className="font-medium">October 15, 2023</span> by
                                <span className="font-medium"> 78 donors</span>.
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                The team provided detailed documentation and photographic evidence of the equipment
                                purchase, including receipts and delivery confirmation. All materials meet the project
                                specifications and quality standards.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {!checkpoint.completed && index > 0 && checkpoints[index - 1].completed && (
                    <div className="text-sm text-blue-600 dark:text-blue-400 animate-pulse flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M12 8v4" />
                        <path d="M12 16h.01" />
                      </svg>
                      This checkpoint will be unlocked once the required funding is reached.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

