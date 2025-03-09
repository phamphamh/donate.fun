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

// Mock data for Education for All project
const PROJECT = {
  id: "2",
  title: "Education for All",
  description:
    "Providing quality education to underprivileged children in rural communities. This project aims to build 3 schools, train 20 teachers, and provide educational materials to over 500 students. Access to education will improve literacy rates and create opportunities for these communities.",
  category: "Education",
  goalAmount: 15000,
  raisedAmount: 8000,
  checkpoints: [
    {
      id: "cp1",
      title: "School Construction Phase 1",
      percentage: 30,
      completed: true,
      description: "Begin construction of the first school facility with classrooms and basic infrastructure.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp2",
      title: "Teaching Materials",
      percentage: 20,
      completed: true,
      description: "Purchase and distribute textbooks, notebooks, and other educational materials for students.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp3",
      title: "Teacher Training",
      percentage: 25,
      completed: false,
      description: "Recruit and train qualified teachers for the new schools.",
      proofUrl: "",
    },
    {
      id: "cp4",
      title: "Student Enrollment",
      percentage: 25,
      completed: false,
      description: "Enroll students and begin educational programs.",
      proofUrl: "",
    },
  ],
  images: [
    "/education-for-all.png",
    "/clean-ocean-project.jpg", // Using existing images as placeholders
    "/sustainable-farming-initiative.jpg",
  ],
  creator: {
    id: "user456",
    name: "Education Empowerment Foundation",
    image: "/placeholder.svg?height=50&width=50",
    projectsCompleted: 5,
    bio: "Dedicated to improving access to quality education for underprivileged communities around the world.",
    location: "Global",
    verified: true,
    joinedDate: "2020-08-15",
    impactScore: 88,
    followers: 120,
  },
  daysLeft: 18,
  backers: 65,
  story:
    "Education is a fundamental right that should be accessible to all children, regardless of their socioeconomic background. Unfortunately, many children in rural areas lack access to quality education due to inadequate infrastructure, shortage of qualified teachers, and limited resources.\n\nOur Education for All initiative aims to address these challenges by building schools, training teachers, and providing educational materials in underserved communities. We focus on creating sustainable educational systems that empower communities to take ownership of their children's education.\n\nThis project will directly benefit over 500 students in three rural communities. By providing access to quality education, we can break the cycle of poverty and create opportunities for these children to build better futures for themselves and their communities.\n\nThe schools we build are designed to be sustainable and environmentally friendly, using locally sourced materials and renewable energy where possible. We also include computer labs and libraries to ensure students have access to a wide range of learning resources.",
  updates: [
    {
      date: "2023-11-10",
      title: "Construction Begins!",
      content:
        "We're excited to announce that construction of the first school has begun! The local community has been incredibly supportive, with many volunteers helping to clear the site and prepare for building.",
    },
    {
      date: "2023-12-05",
      title: "Educational Materials Purchased",
      content:
        "Thanks to your generous donations, we've purchased textbooks, notebooks, and other educational materials for all 500 students. These materials will be distributed once the schools are ready.",
    },
  ],
  relatedProjects: [
    {
      id: "1",
      title: "Clean Water Initiative",
      category: "Environment",
      image: "/clean-water-initiative.jpg",
    },
    {
      id: "3",
      title: "Medical Supplies for Rural Clinic",
      category: "Healthcare",
      image: "/medical-supplies-for-clinic.jpg",
    },
  ],
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = PROJECT // In a real app, you would fetch the project by ID
  const percentComplete = Math.round((project.raisedAmount / project.goalAmount) * 100)

  return (
    <main className="min-h-screen pb-12">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-700 text-white">
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
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 mb-3 border-none">
                {project.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-blue-100 text-lg mb-4 max-w-3xl">{project.description}</p>

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
                    className="text-blue-300"
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
                    className="text-blue-300"
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
                    className="text-blue-300"
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
              <Avatar className="h-12 w-12 border-2 border-blue-300">
                <AvatarImage src={project.creator.image} alt={project.creator.name} />
                <AvatarFallback className="bg-blue-700">{project.creator.name.charAt(0)}</AvatarFallback>
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
                      className="text-blue-300"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-blue-200">{project.creator.projectsCompleted} projects completed</div>
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
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-300"
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
            <div className="mb-8 overflow-hidden rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl border border-blue-100 dark:border-blue-900/30">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-[400px] object-cover object-center"
              />
            </div>

            <Tabs defaultValue="story" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
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
                      className="text-blue-600"
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

                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl">
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
                      className="text-blue-600"
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
              </TabsContent>

              <TabsContent value="checkpoints" className="mt-6">
                <Card className="mb-8 overflow-hidden shadow-md border-blue-100 dark:border-blue-800/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Project Progress</h2>
                      <Badge variant="outline" className="ml-2">
                        {percentComplete}% funded
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <CheckpointProgress checkpoints={project.checkpoints} category={project.category} />
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-2">How do checkpoints work?</h3>
                  <p className="text-muted-foreground mb-4">
                    Projects on Donate.fun are divided into verifiable checkpoints. Funds are only released when creators provide proof of completing each checkpoint.
                  </p>

                  <div className="flex flex-wrap gap-2">
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
                        className="text-blue-600"
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
                        className="text-blue-600"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>Documented evidence</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6 mt-6">
                {project.updates.map((update, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-300">
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
                          >
                            <path d="M12 8v4l3 3" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg">{update.title}</h3>
                          <p className="text-sm text-muted-foreground">{update.date}</p>
                        </div>
                      </div>

                      <p>{update.content}</p>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/30">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">Subscribe to updates</h3>
                    <p className="text-muted-foreground">
                      Receive notifications when this project publishes new updates. You can unsubscribe at any time.
                    </p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Subscribe to updates</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <Card className="sticky top-[calc(4rem+16px)] z-40 overflow-hidden border-none shadow-lg bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${project.raisedAmount.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ${project.goalAmount.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={percentComplete} showLabel size="lg" color="blue" animated={true} />
                </div>

                <div className="flex justify-between mb-6 text-sm">
                  <div className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="font-medium">{project.backers}</div>
                    <div className="text-muted-foreground">Backers</div>
                  </div>
                  <div className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="font-medium">{project.daysLeft}</div>
                    <div className="text-muted-foreground">Days left</div>
                  </div>
                  <div className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="font-medium">{percentComplete}%</div>
                    <div className="text-muted-foreground">Funded</div>
                  </div>
                </div>

                <DonationButton projectId={project.id} />

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Similar Projects</h3>
                  <div className="space-y-3">
                    {project.relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject.id}
                        href={`/project/${relatedProject.id}`}
                        className="flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                      >
                        <div className="w-16 h-12 rounded-md bg-gray-200 dark:bg-gray-800 overflow-hidden">
                          <img
                            src={relatedProject.image}
                            alt={relatedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{relatedProject.title}</h4>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {relatedProject.category}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
} 