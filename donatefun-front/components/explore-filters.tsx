"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const CATEGORIES = [
  { id: "education", label: "Education" },
  { id: "healthcare", label: "Healthcare" },
  { id: "environment", label: "Environment" },
  { id: "community", label: "Community" },
  { id: "technology", label: "Technology" },
  { id: "arts", label: "Arts & Culture" },
]

export default function ExploreFilters() {
  const [fundingRange, setFundingRange] = useState([0, 100])
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="w-full lg:w-64 shrink-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h3 className="font-medium">Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1"
            >
              {isExpanded ? "Hide" : "Show"}
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
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>
          </div>

          <div className={`space-y-6 ${!isExpanded && "hidden lg:block"}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <Input placeholder="Search projects..." className="pl-10 bg-white dark:bg-gray-800" />
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
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
                  className="text-indigo-600"
                >
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                </svg>
                Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category.id}`} />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
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
                  className="text-indigo-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20" />
                  <path d="M12 12 2.73 4.73" />
                  <path d="M12 12 6.13 18.13" />
                </svg>
                Funding Progress
              </h3>
              <div className="space-y-4">
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="funding-all" />
                    <Label htmlFor="funding-all" className="cursor-pointer hover:text-indigo-600 transition-colors">
                      All projects
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="almost" id="funding-almost" />
                    <Label htmlFor="funding-almost" className="cursor-pointer hover:text-indigo-600 transition-colors">
                      Almost funded ({">"}80%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="halfway" id="funding-halfway" />
                    <Label htmlFor="funding-halfway" className="cursor-pointer hover:text-indigo-600 transition-colors">
                      Halfway there ({">"}50%)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="just-started" id="funding-just-started" />
                    <Label
                      htmlFor="funding-just-started"
                      className="cursor-pointer hover:text-indigo-600 transition-colors"
                    >
                      Just started ({"<"}20%)
                    </Label>
                  </div>
                </RadioGroup>

                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Custom range:</span>
                    <span className="font-medium text-indigo-600">
                      {fundingRange[0]}% - {fundingRange[1]}%
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={fundingRange}
                    onValueChange={setFundingRange}
                    className="[&>span]:bg-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
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
                  className="text-indigo-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Time Remaining
              </h3>
              <RadioGroup defaultValue="all">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="time-all" />
                  <Label htmlFor="time-all" className="cursor-pointer hover:text-indigo-600 transition-colors">
                    All projects
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ending-soon" id="time-ending-soon" />
                  <Label htmlFor="time-ending-soon" className="cursor-pointer hover:text-indigo-600 transition-colors">
                    Ending soon ({"<"}7 days)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="time-new" />
                  <Label htmlFor="time-new" className="cursor-pointer hover:text-indigo-600 transition-colors">
                    Newly launched ({"<"}14 days)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
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
                  className="text-indigo-600"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Checkpoint Status
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkpoint-any" />
                  <Label htmlFor="checkpoint-any" className="cursor-pointer hover:text-indigo-600 transition-colors">
                    Any status
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkpoint-completed" />
                  <Label
                    htmlFor="checkpoint-completed"
                    className="cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    Has completed checkpoints
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkpoint-upcoming" />
                  <Label
                    htmlFor="checkpoint-upcoming"
                    className="cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    Has upcoming checkpoints
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Reset
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none">
                Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

