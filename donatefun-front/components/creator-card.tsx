"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CreatorProps {
  id: string
  name: string
  image: string
  bio: string
  location: string
  verified: boolean
  joinedDate: string
  projectsCompleted: number
  impactScore: number
  followers: number
}

export default function CreatorCard({ creator }: { creator: CreatorProps }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-24 w-24 border-4 border-emerald-100 dark:border-emerald-900">
            <AvatarImage src={creator.image} alt={creator.name} />
            <AvatarFallback className="bg-emerald-700 text-xl">{creator.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="mt-4 flex flex-col items-center md:items-start">
            <Link href={creator.id ? `/profile/${creator.id}` : "#"}>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                View Full Profile
              </Button>
            </Link>

            <div className="mt-2 flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M19 8v6" />
                  <path d="M22 11h-6" />
                </svg>
                Follow
              </Button>
              <div className="text-sm text-muted-foreground">{creator.followers} followers</div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{creator.name}</h3>
            {creator.verified && (
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Verified Creator
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{creator.location}</span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>
                Joined {new Date(creator.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{creator.bio}</p>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-3 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{creator.projectsCompleted}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-3 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{creator.impactScore}</div>
              <div className="text-xs text-muted-foreground">Impact Score</div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-3 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{creator.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

