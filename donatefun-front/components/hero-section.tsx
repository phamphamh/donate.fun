"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState(2);
  const isMobile = useMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsVisible(true);

    // Cycle through checkpoints for animation effect
    const interval = setInterval(() => {
      setActiveCheckpoint((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 text-white py-20 md:py-32"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity, y: isMobile ? 0 : y }}
      >
        {/* Colorful gradient blobs */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl"></div>

        {/* Animated grid lines */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          // Use deterministic values based on index instead of random
          const top = (i * 17) % 100;
          const left = (i * 23) % 100;
          const scale = 0.5 + ((i * 13) % 50) / 100;
          const r = (i * 37) % 255;
          const g = (i * 71) % 255;
          const b = (i * 97) % 255;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                top: `${top}%`,
                left: `${left}%`,
                scale: scale,
                background: `rgba(${r}, ${g}, ${b}, 0.2)`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 10 + (i % 5),
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              style={{
                width: `${20 + ((i * 31) % 80)}px`,
                height: `${20 + ((i * 31) % 80)}px`,
              }}
            ></motion.div>
          );
        })}
      </motion.div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/10"
            >
              <span className="mr-2">✨</span>
              Cross-Platform Donation Navigator
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Make an{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                impact
              </span>{" "}
              with verified checkpoints
            </motion.h1>

            <motion.p
              className="text-xl text-indigo-100 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Navigate through projects, track your impact in real-time, and
              ensure your contributions create real change through our
              transparent validation system.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link href="/explore">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <span>Explore Projects</span>
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
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 group"
                >
                  <span>My Dashboard</span>
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
                    className="ml-2 opacity-70 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18" />
                    <path d="M13 7h4" />
                    <path d="M13 11h4" />
                    <path d="M13 15h4" />
                  </svg>
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-indigo-800 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-indigo-100">
                <span className="font-medium">1,234+</span> projects funded
                through our checkpoint system
              </p>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
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
                  className="text-cyan-300"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M15 9h.01" />
                  <path d="M15 15h.01" />
                  <path d="M9 15h.01" />
                </svg>
                <span className="text-sm">Works in any browser</span>
              </div>

              <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
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
                  className="text-pink-300"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span className="text-sm">Install on mobile</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Dynamic visualization - right side */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Colorful checkpoint visualization */}
              <motion.div
                className="relative z-10 bg-gradient-to-br from-gray-900/80 to-indigo-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400"></div>

                <div className="flex items-center justify-center mb-8">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 flex items-center justify-center border border-white/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-400"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-xl font-medium text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
                  Checkpoint Verification System
                </h3>

                <div className="space-y-6">
                  {/* Checkpoint 1 */}
                  <motion.div
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      activeCheckpoint === 0
                        ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 scale-105"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
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
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Equipment Purchase</div>
                      <div className="text-sm text-indigo-200/70">
                        20% of total funding
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-400">
                      VERIFIED
                    </div>
                  </motion.div>

                  {/* Checkpoint 2 */}
                  <motion.div
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      activeCheckpoint === 1
                        ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 scale-105"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
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
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Team Deployment</div>
                      <div className="text-sm text-indigo-200/70">
                        30% of total funding
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-400">
                      VERIFIED
                    </div>
                  </motion.div>

                  {/* Checkpoint 3 - Current */}
                  <motion.div
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      activeCheckpoint === 2
                        ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 scale-105"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                      <span>3</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Installation Phase</div>
                      <div className="text-sm text-indigo-200/70">
                        30% of total funding
                      </div>
                    </div>
                    <div className="text-sm font-medium text-cyan-400">
                      IN PROGRESS
                    </div>
                  </motion.div>

                  {/* Checkpoint 4 */}
                  <motion.div
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                      activeCheckpoint === 3
                        ? "bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 scale-105"
                        : ""
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 0.7, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.02, opacity: 0.9 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-500/20 to-indigo-500/20 flex items-center justify-center text-gray-400 border border-gray-500/30">
                      <span>4</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Community Training</div>
                      <div className="text-sm text-indigo-200/70">
                        20% of total funding
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      LOCKED
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-8 pt-4 border-t border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-indigo-200/70">
                      Project Progress
                    </div>
                    <div className="text-sm font-medium">65%</div>
                  </div>

                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "65%" }}
                      transition={{
                        delay: 1.6,
                        duration: 1.5,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
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
                          className="text-pink-400"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">78</div>
                        <div className="text-xs text-indigo-200/70">
                          Backers
                        </div>
                      </div>
                    </div>

                    <Link href="/project/1">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      >
                        View Project
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 h-20 w-20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 shadow-xl z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="text-center">
                  <div className="text-xl font-bold">65%</div>
                  <div className="text-xs text-indigo-200/70">Funded</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 h-16 w-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 shadow-xl z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="flex items-center gap-2">
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
                    className="text-cyan-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium">12</div>
                    <div className="text-xs text-indigo-200/70">Days Left</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
