import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProgressBar from "@/components/progress-bar"
import CheckpointProgress from "@/components/checkpoint-progress"
import DonationButton from "@/components/donation-button"
import ProjectGallery from "@/components/project-gallery"
import CreatorCard from "@/components/creator-card"

// Mock data for a single project
const PROJECT = {
  id: "1",
  title: "Clean Water Initiative",
  description:
    "Providing clean water access to rural communities in developing countries. This project aims to install water purification systems in 5 villages, benefiting over 2,000 people. Access to clean water will reduce waterborne diseases and improve overall health outcomes in these communities.",
  category: "Environment",
  goalAmount: 10000,
  raisedAmount: 6500,
  checkpoints: [
    {
      id: "cp1",
      title: "Equipment Purchase",
      percentage: 20,
      completed: true,
      description: "Purchase water filtration systems and necessary tools for installation.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp2",
      title: "Team Deployment",
      percentage: 30,
      completed: true,
      description: "Send our team of engineers and volunteers to the target communities.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp3",
      title: "Installation Phase",
      percentage: 30,
      completed: false,
      description: "Install water purification systems in all 5 villages.",
      proofUrl: "",
    },
    {
      id: "cp4",
      title: "Community Training",
      percentage: 20,
      completed: false,
      description: "Train community members on system maintenance and water conservation.",
      proofUrl: "",
    },
  ],
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  creator: {
    id: "user123",
    name: "Water for All Foundation",
    image: "/placeholder.svg?height=50&width=50",
    projectsCompleted: 8,
    bio: "Dedicated to providing clean water solutions to communities in need around the world.",
    location: "Global",
    verified: true,
    joinedDate: "2021-05-12",
    impactScore: 92,
    followers: 156,
  },
  daysLeft: 12,
  backers: 78,
  story:
    "Access to clean water is a fundamental human right, yet millions around the world still lack this basic necessity. Our organization has been working for over 5 years to address this critical issue in developing regions.\n\nThis project focuses on 5 specific villages where waterborne diseases have been particularly prevalent. By installing our proven water purification systems, we can dramatically improve health outcomes and quality of life.\n\nEach system can provide clean water for up to 400 people and has a lifespan of approximately 10 years with proper maintenance. We also train local community members to maintain the systems, creating sustainable solutions rather than temporary fixes.",
  updates: [
    {
      date: "2023-10-15",
      title: "Equipment Purchased!",
      content:
        "We're excited to announce that we've successfully purchased all the necessary equipment for this project. Thanks to your generous donations, we've acquired 5 complete water filtration systems along with spare parts and maintenance tools.",
    },
    {
      date: "2023-11-02",
      title: "Team Deployed to First Location",
      content:
        "Our team of engineers and volunteers has arrived at the first village. Initial assessments have been completed, and we're working with local leaders to determine the optimal installation locations.",
    },
  ],
  relatedProjects: [
    {
      id: "2",
      title: "Sustainable Farming Initiative",
      category: "Environment",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "3",
      title: "Clean Ocean Project",
      category: "Environment",
      image: "/placeholder.svg?height=100&width=200",
    },
  ],
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = PROJECT // In a real app, you would fetch the project by ID
  const percentComplete = Math.round((project.raisedAmount / project.goalAmount) * 100)

  return (
    <main className="min-h-screen pb-12">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="container py-8 md:py-12">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1 mb-4 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors"
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
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Explore
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-grow">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 mb-3 border-none">
                {project.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-emerald-100 text-lg mb-4 max-w-3xl">{project.description}</p>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
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
                    className="text-emerald-300"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{project.daysLeft} days left</span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
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
                    className="text-emerald-300"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>{project.backers} backers</span>
                </div>

                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
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
                    className="text-emerald-300"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <span>
                    {project.checkpoints.filter((c) => c.completed).length} of {project.checkpoints.length} checkpoints
                  </span>
                </div>
              </div>
            </div>

            {/* Creator info - clickable to profile */}
            <Link
              href={project.creator.id ? `/profile/${project.creator.id}` : "#"}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300 group"
            >
              <Avatar className="h-12 w-12 border-2 border-emerald-300">
                <AvatarImage src={project.creator.image} alt={project.creator.name} />
                <AvatarFallback className="bg-emerald-700">{project.creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium flex items-center gap-2">
                  {project.creator.name}
                  {project.creator.verified && (
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
                      className="text-emerald-300"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-emerald-200">{project.creator.projectsCompleted} projects completed</div>
              </div>
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
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-300"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-grow">
            <div className="mb-8 overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-emerald-100 dark:border-emerald-900/30">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-[400px] object-cover object-center"
              />
            </div>

            <Tabs defaultValue="story" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="checkpoints">Checkpoints</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">{project.description}</p>
                  {project.story.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4 inline-flex items-center gap-2">
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
                      className="text-emerald-600"
                    >
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" />
                      <path d="M15 18h-5" />
                      <path d="M10 6h8v4h-8V6Z" />
                    </svg>
                    Gallery
                  </h3>
                  <ProjectGallery images={project.images} />
                </div>

                <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl">
                  <h3 className="text-xl font-medium mb-4 inline-flex items-center gap-2">
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
                      className="text-emerald-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    About the Creator
                  </h3>
                  <CreatorCard creator={project.creator} />
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-medium mb-4 inline-flex items-center gap-2">
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
                      className="text-emerald-600"
                    >
                      <path d="M3 6h18" />
                      <path d="M3 12h18" />
                      <path d="M3 18h18" />
                    </svg>
                    Related Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.relatedProjects.map((relatedProject) => (
                      <Link key={relatedProject.id} href={`/project/${relatedProject.id}`}>
                        <Card className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-32 overflow-hidden">
                            <img
                              src={relatedProject.image || "/placeholder.svg"}
                              alt={relatedProject.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge className="mb-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-100">
                              {relatedProject.category}
                            </Badge>
                            <h4 className="font-medium">{relatedProject.title}</h4>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="checkpoints" className="mt-6">
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl">
                    <h3 className="text-xl font-medium mb-2">How Checkpoints Work</h3>
                    <p className="text-muted-foreground mb-4">
                      This project uses checkpoints to ensure transparency. The recipient must provide proof at each
                      stage to receive the allocated funds.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
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
                        <span>Verified by donors</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
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
                          <path d="M12 8v4" />
                          <path d="M12 16h.01" />
                        </svg>
                        <span>Funds released in stages</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm">
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
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span>Documented evidence</span>
                      </div>
                    </div>
                  </div>

                  <CheckpointProgress checkpoints={project.checkpoints} />
                </div>
              </TabsContent>

              <TabsContent value="updates" className="mt-6">
                <div className="space-y-6">
                  {project.updates.map((update, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden border-none shadow-md bg-gradient-to-r from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950/30"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">
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
                            <div className="text-sm text-muted-foreground">{update.date}</div>
                            <h3 className="text-xl font-medium">{update.title}</h3>
                          </div>
                        </div>
                        <p>{update.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <Card className="sticky top-[calc(4rem+16px)] z-40 overflow-hidden border-none shadow-lg bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950/30">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${project.raisedAmount.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${project.goalAmount.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={percentComplete} showLabel size="lg" color="green" animated={true} />
                </div>

                <div className="flex justify-between mb-6 text-sm">
                  <div className="text-center px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <div className="font-medium">{project.backers}</div>
                    <div className="text-muted-foreground">Backers</div>
                  </div>
                  <div className="text-center px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <div className="font-medium">{project.daysLeft}</div>
                    <div className="text-muted-foreground">Days left</div>
                  </div>
                  <div className="text-center px-3 py-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <div className="font-medium">{percentComplete}%</div>
                    <div className="text-muted-foreground">Funded</div>
                  </div>
                </div>

                <DonationButton projectId={project.id} />

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
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
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Share this project
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 dark:from-blue-950/30 dark:to-blue-900/30"
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
                        className="text-blue-600"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                      <span className="sr-only">Share on Facebook</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 dark:from-cyan-950/30 dark:to-cyan-900/30"
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
                        className="text-cyan-600"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                      </svg>
                      <span className="sr-only">Share on Twitter</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 dark:from-purple-950/30 dark:to-purple-900/30"
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
                        className="text-purple-600"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                      <span className="sr-only">Copy link</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-gradient-to-r from-pink-50 to-pink-100 hover:from-pink-100 hover:to-pink-200 dark:from-pink-950/30 dark:to-pink-900/30"
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
                        className="text-pink-600"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      <span className="sr-only">Share on Instagram</span>
                    </Button>
                  </div>
                </div>

                {/* Creator card in sidebar */}
                <div className="mt-6 pt-6 border-t">
                  <Link
                    href={`/profile/${project.creator.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-colors group"
                  >
                    <Avatar className="h-10 w-10 border-2 border-emerald-200">
                      <AvatarImage src={project.creator.image} alt={project.creator.name} />
                      <AvatarFallback className="bg-emerald-700">{project.creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {project.creator.name}
                        {project.creator.verified && (
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
                            className="text-emerald-600"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">View profile</div>
                    </div>
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
                      className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

