"use client"

import { useEffect, useState } from "react"

interface ProgressBarProps {
  value: number
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
  color?: "green" | "blue" | "red" | "purple" | "amber"
  animated?: boolean
}

export default function ProgressBar({
  value,
  showLabel = false,
  size = "md",
  color = "green",
  animated = false,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (animated) {
      // Start with 0 width and animate to the actual value
      setWidth(0)
      const timeout = setTimeout(() => {
        setWidth(Math.min(value, 100))
      }, 100)

      return () => clearTimeout(timeout)
    } else {
      setWidth(Math.min(value, 100))
    }
  }, [value, animated])

  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const colors = {
    green: "bg-gradient-to-r from-emerald-400 to-teal-500",
    blue: "bg-gradient-to-r from-blue-400 to-indigo-500",
    red: "bg-gradient-to-r from-red-400 to-pink-500",
    purple: "bg-gradient-to-r from-purple-400 to-violet-500",
    amber: "bg-gradient-to-r from-amber-400 to-orange-500",
  }

  return (
    <div className="w-full">
      <div className={`w-full ${heights[size]} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div
          className={`${heights[size]} ${colors[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-right text-xs mt-1 text-muted-foreground">
          <span className={`font-medium text-${color === "green" ? "emerald" : color}-600`}>{value}%</span>
        </div>
      )}
    </div>
  )
}

