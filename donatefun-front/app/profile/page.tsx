"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  activeTab;
  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Passionate about making a difference through technology and community initiatives. Supporting projects that create sustainable impact.",
    location: "San Francisco, CA",
    joinedDate: "March 2023",
    website: "alexjohnson.com",
    stats: {
      donated: 1250,
      projects: 8,
      impact: 320,
      followers: 42,
      following: 68,
    },
    badges: [
      {
        name: "Early Supporter",
        icon: "🌟",
        color: "bg-gradient-to-r from-amber-500 to-yellow-500",
      },
      {
        name: "Verified Donor",
        icon: "✅",
        color: "bg-gradient-to-r from-green-500 to-emerald-500",
      },
      {
        name: "Community Builder",
        icon: "🏗️",
        color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      },
    ],
  };

  // Mock donations data
  const donations = [
    {
      id: "d1",
      projectId: "1",
      projectTitle: "Clean Water Initiative",
      amount: 250,
      date: "2023-11-15",
      imageUrl: "/clean-water-initiative.jpg",
      category: "Environment",
      status: "Verified",
    },
    {
      id: "d2",
      projectId: "2",
      projectTitle: "Education for All",
      amount: 500,
      date: "2023-10-28",
      imageUrl: "/education-for-all.png",
      category: "Education",
      status: "Verified",
    },
    {
      id: "d3",
      projectId: "3",
      projectTitle: "Medical Supplies for Clinic",
      amount: 300,
      date: "2023-09-12",
      imageUrl: "/medical-supplies-for-clinic.jpg",
      category: "Healthcare",
      status: "Verified",
    },
    {
      id: "d4",
      projectId: "4",
      projectTitle: "Community Garden Project",
      amount: 200,
      date: "2023-08-05",
      imageUrl: "/community-garden-project.jpg",
      category: "Community",
      status: "In Progress",
    },
  ];

  // Mock projects data
  const projects = [
    {
      id: "p1",
      title: "Local Beach Cleanup",
      description:
        "Organizing volunteers to clean up coastal areas and educate the community about plastic pollution.",
      category: "Environment",
      raised: 3200,
      goal: 5000,
      checkpoints: 2,
      totalCheckpoints: 4,
      imageUrl: "/placeholder.svg?height=150&width=300",
      status: "Active",
    },
    {
      id: "p2",
      title: "Tech Workshops for Kids",
      description:
        "Teaching programming and digital skills to underprivileged children in the community.",
      category: "Education",
      raised: 1800,
      goal: 2500,
      checkpoints: 3,
      totalCheckpoints: 5,
      imageUrl: "/placeholder.svg?height=150&width=300",
      status: "Active",
    },
  ];

  // Mock activity data
  const activities = [
    {
      id: "a1",
      type: "donation",
      description: "Donated $250 to Clean Water Initiative",
      date: "2023-11-15",
      icon: "💰",
    },
    {
      id: "a2",
      type: "checkpoint",
      description:
        "Verified checkpoint 'Equipment Purchase' for Local Beach Cleanup",
      date: "2023-11-10",
      icon: "✅",
    },
    {
      id: "a3",
      type: "project",
      description: "Created new project 'Tech Workshops for Kids'",
      date: "2023-10-28",
      icon: "🚀",
    },
    {
      id: "a4",
      type: "follow",
      description: "Started following Environmental Protection Fund",
      date: "2023-10-15",
      icon: "👥",
    },
    {
      id: "a5",
      type: "badge",
      description: "Earned 'Community Builder' badge",
      date: "2023-10-01",
      icon: "🏆",
    },
  ];

  return (
    <main className="min-h-screen pb-20">
      {/* Profile header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-gradient-to-br from-indigo-500 to-purple-500">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                {/* Badges positioned on the avatar */}
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  {user.badges.slice(0, 2).map((badge, index) => (
                    <div
                      key={index}
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${badge.color} shadow-lg border border-white/20`}
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-indigo-100 mb-4">@{user.username}</p>

                <p className="text-indigo-100 max-w-xl mb-6">{user.bio}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1 text-indigo-100">
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{user.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-indigo-100">
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
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>Joined {user.joinedDate}</span>
                  </div>

                  <div className="flex items-center gap-1 text-indigo-100">
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
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-6 justify-center md:justify-start"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ${user.stats.donated}
                  </div>
                  <div className="text-sm text-indigo-100">Donated</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.stats.projects}
                  </div>
                  <div className="text-sm text-indigo-100">Projects</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">{user.stats.impact}</div>
                  <div className="text-sm text-indigo-100">Impact Score</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.stats.followers}
                  </div>
                  <div className="text-sm text-indigo-100">Followers</div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.stats.following}
                  </div>
                  <div className="text-sm text-indigo-100">Following</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Share Profile
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="container py-8">
        <Tabs
          defaultValue="overview"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-8">
              {/* Stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
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
                          className="text-green-500"
                        >
                          <path d="M12 2v20" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Total Donated
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        ${user.stats.donated}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Across {donations.length} projects
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
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
                          className="text-blue-500"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                        Projects
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        {user.stats.projects}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {projects.length} active projects
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
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
                          className="text-purple-500"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        Impact Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        {user.stats.impact}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Top 5% of all users
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recent donations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {donations.slice(0, 2).map((donation) => (
                    <Card key={donation.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                            <img
                              src={donation.imageUrl || "/placeholder.svg"}
                              alt={donation.projectTitle}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              {donation.projectTitle}
                            </h3>
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                {donation.category}
                              </div>
                              <Badge
                                variant="outline"
                                className="text-green-500 border-green-500"
                              >
                                {donation.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="font-bold text-lg">
                              ${donation.amount}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(donation.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("donations")}
                  >
                    View All Donations
                  </Button>
                </div>
              </motion.div>

              {/* Active projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-4">Your Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <div className="h-40 bg-gray-100 relative">
                        <img
                          src={project.imageUrl || "/placeholder.svg"}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500">
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="text-lg font-bold mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </p>

                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">
                            ${project.raised.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            of ${project.goal.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={(project.raised / project.goal) * 100}
                          className="h-2 mb-3"
                        />

                        <div className="flex justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                              <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span>
                              {project.checkpoints}/{project.totalCheckpoints}{" "}
                              checkpoints
                            </span>
                          </div>

                          <Link href={`/project/${project.id}`}>
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("projects")}
                  >
                    View All Projects
                  </Button>
                </div>
              </motion.div>

              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4">
                  Badges & Achievements
                </h2>
                <div className="flex flex-wrap gap-4">
                  {user.badges.map((badge, index) => (
                    <Card key={index} className="w-full md:w-auto">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-full flex items-center justify-center text-xl ${badge.color}`}
                        >
                          {badge.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Earned in {user.joinedDate}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="donations">
              <Card>
                <CardHeader>
                  <CardTitle>Donation History</CardTitle>
                  <CardDescription>
                    All your contributions to projects on Donate.fun
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donations.map((donation) => (
                      <Card key={donation.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center p-4">
                            <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                              <img
                                src={donation.imageUrl || "/placeholder.svg"}
                                alt={donation.projectTitle}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">
                                {donation.projectTitle}
                              </h3>
                              <div className="flex justify-between items-center">
                                <div className="text-sm text-muted-foreground">
                                  {donation.category}
                                </div>
                                <Badge
                                  variant="outline"
                                  className={
                                    donation.status === "Verified"
                                      ? "text-green-500 border-green-500"
                                      : "text-amber-500 border-amber-500"
                                  }
                                >
                                  {donation.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="font-bold text-lg">
                                ${donation.amount}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(donation.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Your Projects</CardTitle>
                  <CardDescription>
                    Projects you've created or are actively managing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="overflow-hidden">
                        <div className="h-40 bg-gray-100 relative">
                          <img
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={project.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-green-500">
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <h3 className="text-lg font-bold mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>

                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">
                              ${project.raised.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              of ${project.goal.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={(project.raised / project.goal) * 100}
                            className="h-2 mb-3"
                          />

                          <div className="flex justify-between">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
                                <path d="m9 12 2 2 4-4" />
                              </svg>
                              <span>
                                {project.checkpoints}/{project.totalCheckpoints}{" "}
                                checkpoints
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Link href={`/project/${project.id}`}>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/project/${project.id}/edit`}>
                                <Button size="sm">Manage</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/create">
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent actions and achievements on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-lg shrink-0">
                          {activity.icon}
                        </div>
                        <div className="flex-1 border-b pb-6">
                          <div className="font-medium">
                            {activity.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
