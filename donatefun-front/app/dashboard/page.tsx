"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import DashboardProjectCard from "@/components/dashboard-project-card";
import DashboardStats from "@/components/dashboard-stats";
import MobileDashboardNav from "@/components/mobile-dashboard-nav";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

// Mock data for user's projects
const MY_PROJECTS = [
  {
    id: "1",
    title: "Clean Water Initiative",
    description:
      "Providing clean water access to rural communities in developing countries.",
    category: "Environment",
    goalAmount: 10000,
    raisedAmount: 6500,
    checkpoints: [
      { title: "Equipment Purchase", percentage: 20, completed: true },
      { title: "Team Deployment", percentage: 30, completed: true },
      { title: "Installation Phase", percentage: 30, completed: false },
      { title: "Community Training", percentage: 20, completed: false },
    ],
    imageUrl: "/clean-water-initiative.jpg",
    daysLeft: 12,
    status: "active" as const,
  },
  {
    id: "2",
    title: "Education for All",
    description:
      "Building a school and providing educational resources for underprivileged children.",
    category: "Education",
    goalAmount: 25000,
    raisedAmount: 15000,
    checkpoints: [
      { title: "Land Acquisition", percentage: 10, completed: true },
      { title: "Foundation Work", percentage: 20, completed: true },
      { title: "Building Construction", percentage: 40, completed: false },
      { title: "Furnishing & Equipment", percentage: 20, completed: false },
      { title: "Staff Recruitment", percentage: 10, completed: false },
    ],
    imageUrl: "/education-for-all.png",
    daysLeft: 30,
    status: "active" as const,
  },
  {
    id: "3",
    title: "Medical Supplies for Clinic",
    description:
      "Providing essential medical supplies to a community clinic serving low-income families.",
    category: "Healthcare",
    goalAmount: 15000,
    raisedAmount: 15000,
    checkpoints: [
      { title: "Initial Supplies", percentage: 25, completed: true },
      { title: "Equipment Purchase", percentage: 35, completed: true },
      { title: "Staff Training", percentage: 20, completed: true },
      { title: "Operational Setup", percentage: 20, completed: true },
    ],
    imageUrl: "/medical-supplies-for-clinic.jpg",
    daysLeft: 0,
    status: "completed" as const,
  },
];

// Mock data for donations
const MY_DONATIONS = [
  {
    id: "d1",
    projectTitle: "Community Garden Project",
    amount: 50,
    date: "2023-11-15",
    imageUrl: "/community-garden-project.jpg",
    category: "Community",
  },
  {
    id: "d2",
    projectTitle: "Homeless Shelter Renovation",
    amount: 100,
    date: "2023-10-28",
    imageUrl: "/homeless-shelter-renovation.webp",
    category: "Community",
  },
  {
    id: "d3",
    projectTitle: "Wildlife Conservation Effort",
    amount: 75,
    date: "2023-09-12",
    imageUrl: "/wildlife-conservation-effort.jpg",
    category: "Environment",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const handleCheckpointSubmit = () => {
    toast({
      title: "Checkpoint proof submitted",
      description: "Your proof has been submitted for review.",
    });
  };

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold">My Dashboard</h1>
              <p className="text-indigo-100">
                Manage your projects and donations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/create">
                <Button
                  size="sm"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
                >
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
                    className="mr-2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Create New Project
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Quick stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                $
                {MY_PROJECTS.reduce(
                  (sum, p) => sum + p.raisedAmount,
                  0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-indigo-200">Total Raised</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                $
                {MY_DONATIONS.reduce(
                  (sum, d) => sum + d.amount,
                  0
                ).toLocaleString()}
              </div>
              <div className="text-sm text-indigo-200">Total Donated</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {MY_PROJECTS.filter((p) => p.status === "active").length}
              </div>
              <div className="text-sm text-indigo-200">Active Projects</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">
                {MY_PROJECTS.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-sm text-indigo-200">Completed Projects</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <div className="hidden md:block">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-6">
            <DashboardStats
              totalRaised={MY_PROJECTS.reduce(
                (sum, p) => sum + p.raisedAmount,
                0
              )}
              totalDonated={MY_DONATIONS.reduce((sum, d) => sum + d.amount, 0)}
              activeProjects={
                MY_PROJECTS.filter((p) => p.status === "active").length
              }
              completedProjects={
                MY_PROJECTS.filter((p) => p.status === "completed").length
              }
            />

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
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
                    className="text-indigo-600"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  Active Projects
                </h2>
                <Link href="/dashboard?tab=my-projects">
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MY_PROJECTS.filter((p) => p.status === "active")
                  .slice(0, 3)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <DashboardProjectCard
                        project={project}
                        onCheckpointSubmit={handleCheckpointSubmit}
                      />
                    </motion.div>
                  ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
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
                    className="text-indigo-600"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  Recent Donations
                </h2>
                <Link href="/dashboard?tab=donations">
                  <Button variant="ghost" size="sm" className="text-indigo-600">
                    View All
                  </Button>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300">
                        <tr>
                          <th className="py-3 px-4 text-left">Project</th>
                          <th className="py-3 px-4 text-left">Amount</th>
                          <th className="py-3 px-4 text-left">Date</th>
                          <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
                        {MY_DONATIONS.slice(0, 3).map((donation, index) => (
                          <motion.tr
                            key={donation.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.4 + index * 0.1,
                            }}
                            className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12">
                                  <Image
                                    src={donation.imageUrl}
                                    alt={donation.projectTitle}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="48px"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {donation.projectTitle}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-300 border-none">
                                      {donation.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-medium text-indigo-600 dark:text-indigo-400">
                              ${donation.amount}
                            </td>
                            <td className="py-3 px-4 text-gray-500">
                              {donation.date}
                            </td>
                            <td className="py-3 px-4">
                              <Link href={`/project/${donation.id}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                                >
                                  View Project
                                </Button>
                              </Link>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="my-projects" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
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
                  className="text-indigo-600"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                My Projects
              </h2>
              <Link href="/create">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
                >
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
                    className="mr-2"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Create New Project
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MY_PROJECTS.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <DashboardProjectCard
                    project={project}
                    onCheckpointSubmit={handleCheckpointSubmit}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="donations" className="mt-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
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
                className="text-indigo-600"
              >
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              My Donations
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300">
                      <tr>
                        <th className="py-3 px-4 text-left">Project</th>
                        <th className="py-3 px-4 text-left">Amount</th>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900/30">
                      {MY_DONATIONS.map((donation, index) => (
                        <motion.tr
                          key={donation.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + index * 0.1,
                          }}
                          className="hover:bg-indigo-50/50 dark:hover:bg-indigo-950/10 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative h-12 w-12">
                                <Image
                                  src={donation.imageUrl}
                                  alt={donation.projectTitle}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="48px"
                                />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {donation.projectTitle}
                                </div>
                                <div className="text-xs text-gray-500">
                                  <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-300 border-none">
                                    {donation.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-indigo-600 dark:text-indigo-400">
                            ${donation.amount}
                          </td>
                          <td className="py-3 px-4 text-gray-500">
                            {donation.date}
                          </td>
                          <td className="py-3 px-4">
                            <Link href={`/project/${donation.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
                              >
                                View Project
                              </Button>
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
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
                className="text-indigo-600"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              Notifications
            </h2>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-green-50 dark:from-gray-900 dark:to-green-950/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shrink-0 text-white">
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
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Checkpoint Approved</div>
                        <p className="text-sm text-gray-500 mt-1">
                          Your Team &quot;Deployment&quot; checkpoint for
                          &quot;Clean Water Initiative&quot; has been approved.
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          2 hours ago
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shrink-0 text-white">
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
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="M12 8v4" />
                          <path d="M12 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">New Donation</div>
                        <p className="text-sm text-gray-500 mt-1">
                          You received a $50 donation from John Doe for
                          &quot;Education for All&quot;.
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          Yesterday
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-amber-50 dark:from-gray-900 dark:to-amber-950/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shrink-0 text-white">
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
                          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <path d="M12 9v4" />
                          <path d="M12 17h.01" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">Checkpoint Reminder</div>
                        <p className="text-sm text-gray-500 mt-1">
                          Your &quot;Installation Phase&quot; checkpoint for
                          &quot;Clean Water Initiative&quot; is due in 5 days.
                        </p>
                        <div className="text-xs text-gray-400 mt-2">
                          2 days ago
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileDashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
