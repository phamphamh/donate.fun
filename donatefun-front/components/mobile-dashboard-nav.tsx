"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

interface MobileDashboardNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function MobileDashboardNav({ activeTab, setActiveTab }: MobileDashboardNavProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Only show on dashboard pages
  if (!pathname.includes("/dashboard")) {
    return null
  }

  return (
    <motion.div
      className={`md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center py-3 px-4 ${
            activeTab === "overview" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <span className="text-xs mt-1">Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("my-projects")}
          className={`flex flex-col items-center py-3 px-4 ${
            activeTab === "my-projects" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="text-xs mt-1">Projects</span>
        </button>

        <Link href="/create" className="flex flex-col items-center py-3 px-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center -mt-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
          <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">Create</span>
        </Link>

        <button
          onClick={() => setActiveTab("donations")}
          className={`flex flex-col items-center py-3 px-4 ${
            activeTab === "donations" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span className="text-xs mt-1">Donations</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex flex-col items-center py-3 px-4 ${
            activeTab === "notifications" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="text-xs mt-1">Alerts</span>
        </button>
      </div>
    </motion.div>
  )
}

