"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ProjectCard from "@/components/project-card";
import ExploreFilters from "@/components/explore-filters";

// Mock data for projects
const PROJECTS = [
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
    creator: {
      id: "user123",
      name: "Water for All Foundation",
      image: "/placeholder.svg?height=50&width=50",
      verified: true,
    },
  },
  {
    id: "2",
    title: "Education for All",
    description:
      "Building a school and providing educational resources for underprivileged children.",
    category: "Education",
    goalAmount: 50,
    raisedAmount: 8,
    checkpoints: [
      { title: "Land Acquisition", percentage: 10, completed: true },
      { title: "Foundation Work", percentage: 20, completed: true },
      { title: "Building Construction", percentage: 40, completed: false },
      { title: "Furnishing & Equipment", percentage: 20, completed: false },
      { title: "Staff Recruitment", percentage: 10, completed: false },
    ],
    imageUrl: "/education-for-all.png",
    daysLeft: 30,
    creator: {
      id: "user456",
      name: "Global Education Fund",
      image: "/placeholder.svg?height=50&width=50",
      verified: true,
    },
  },
  {
    id: "3",
    title: "Medical Supplies for Clinic",
    description:
      "Providing essential medical supplies to a community clinic serving low-income families.",
    category: "Healthcare",
    goalAmount: 15000,
    raisedAmount: 12000,
    checkpoints: [
      { title: "Initial Supplies", percentage: 25, completed: true },
      { title: "Equipment Purchase", percentage: 35, completed: true },
      { title: "Staff Training", percentage: 20, completed: false },
      { title: "Operational Setup", percentage: 20, completed: false },
    ],
    imageUrl: "/medical-supplies-for-clinic.jpg",
    daysLeft: 5,
    creator: {
      id: "user789",
      name: "Healthcare Alliance",
      image: "/placeholder.svg?height=50&width=50",
      verified: false,
    },
  },
  {
    id: "4",
    title: "Community Garden Project",
    description:
      "Creating a sustainable community garden to provide fresh produce and educational opportunities.",
    category: "Community",
    goalAmount: 8000,
    raisedAmount: 2000,
    checkpoints: [
      { title: "Land Preparation", percentage: 20, completed: true },
      { title: "Planting & Seeds", percentage: 30, completed: false },
      { title: "Irrigation System", percentage: 30, completed: false },
      { title: "Educational Materials", percentage: 20, completed: false },
    ],
    imageUrl: "/community-garden-project.jpg",
    daysLeft: 45,
    creator: {
      id: "user321",
      name: "Urban Greening Initiative",
      image: "/placeholder.svg?height=50&width=50",
      verified: false,
    },
  },
  {
    id: "5",
    title: "Homeless Shelter Renovation",
    description:
      "Renovating a local homeless shelter to improve living conditions and increase capacity.",
    category: "Community",
    goalAmount: 35000,
    raisedAmount: 12500,
    checkpoints: [
      { title: "Materials Purchase", percentage: 30, completed: true },
      { title: "Structural Repairs", percentage: 25, completed: false },
      { title: "Interior Renovation", percentage: 25, completed: false },
      { title: "Furnishing", percentage: 20, completed: false },
    ],
    imageUrl: "/homeless-shelter-renovation.webp",
    daysLeft: 20,
    creator: {
      id: "user654",
      name: "Shelter Support Network",
      image: "/placeholder.svg?height=50&width=50",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Wildlife Conservation Effort",
    description:
      "Protecting endangered species through habitat preservation and anti-poaching measures.",
    category: "Environment",
    goalAmount: 50000,
    raisedAmount: 35000,
    checkpoints: [
      { title: "Equipment & Technology", percentage: 25, completed: true },
      { title: "Team Training", percentage: 25, completed: true },
      { title: "Field Operations", percentage: 30, completed: false },
      { title: "Community Education", percentage: 20, completed: false },
    ],
    imageUrl: "/wildlife-conservation-effort.jpg",
    daysLeft: 15,
    creator: {
      id: "user987",
      name: "Wildlife Protection Trust",
      image: "/placeholder.svg?height=50&width=50",
      verified: true,
    },
  },
].map((project) => {
  // Ensure every project has a creator property
  if (!project.creator) {
    return {
      ...project,
      creator: {
        id: `default-${project.id}`,
        name: "Project Creator",
        image: "/placeholder.svg?height=50&width=50",
        verified: false,
      },
    };
  }
  return project;
});

// Category colors mapping
const CATEGORY_COLORS = {
  Environment: "from-emerald-500 to-teal-500 text-white",
  Education: "from-blue-500 to-indigo-500 text-white",
  Healthcare: "from-red-500 to-pink-500 text-white",
  Community: "from-purple-500 to-violet-500 text-white",
  Technology: "from-cyan-500 to-blue-500 text-white",
  Arts: "from-amber-500 to-orange-500 text-white",
};

export default function ExplorePage() {
  const [projects, setProjects] = useState(PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter projects by category
  useEffect(() => {
    if (!activeCategory) {
      setProjects(PROJECTS);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = PROJECTS.filter(
        (project) => project.category === activeCategory
      );
      setProjects(filtered);
      setIsLoading(false);
    }, 500);
  }, [activeCategory]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const categories = Array.from(
    new Set(PROJECTS.map((project) => project.category))
  );

  return (
    <main className="min-h-screen pb-12">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Explore Projects
              </h1>
              <p className="text-indigo-100 max-w-2xl">
                Discover projects that need your support and make a difference.
                Browse by category or search for specific causes you&apos;re
                passionate about.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/create">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none shadow-md">
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
                  Start Your Project
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Category pills */}
          <motion.div
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className={`px-4 py-2 text-sm cursor-pointer bg-gradient-to-r ${
                    activeCategory === category
                      ? CATEGORY_COLORS[
                          category as keyof typeof CATEGORY_COLORS
                        ] || "from-gray-500 to-gray-600 text-white"
                      : "from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 text-white"
                  } border-none`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <ExploreFilters />

          <div className="flex-grow">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card
                    key={i}
                    className="h-[400px] animate-pulse bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                  ></Card>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>

                {projects.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
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
                        className="text-gray-500"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveCategory(null)}
                      className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800 dark:to-gray-700"
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                )}

                {projects.length > 0 && (
                  <motion.div
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 dark:from-indigo-950/30 dark:to-purple-950/30 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30"
                    >
                      Load More Projects
                    </Button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
