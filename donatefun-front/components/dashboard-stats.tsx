"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface DashboardStatsProps {
  totalRaised: number
  totalDonated: number
  activeProjects: number
  completedProjects: number
}

export default function DashboardStats({
  totalRaised,
  totalDonated,
  activeProjects,
  completedProjects,
}: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Raised",
      value: `$${totalRaised.toLocaleString()}`,
      icon: (
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
          className="text-green-600"
        >
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30",
      iconBgColor: "bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30",
    },
    {
      title: "Total Donated",
      value: `$${totalDonated.toLocaleString()}`,
      icon: (
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
          className="text-blue-600"
        >
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
      iconBgColor: "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30",
    },
    {
      title: "Active Projects",
      value: activeProjects.toString(),
      icon: (
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
          className="text-purple-600"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
      iconBgColor: "bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30",
    },
    {
      title: "Completed Projects",
      value: completedProjects.toString(),
      icon: (
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
          className="text-amber-600"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      bgColor: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
      iconBgColor: "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className={`${stat.bgColor} border-none shadow-md`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${stat.iconBgColor} flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

