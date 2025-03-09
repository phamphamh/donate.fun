"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProgressBar from "@/components/progress-bar";
import { motion } from "framer-motion";
import Image from "next/image";

interface Checkpoint {
  title: string;
  percentage: number;
  completed: boolean;
}

interface Creator {
  id: string;
  name: string;
  image: string;
  verified: boolean;
}

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    goalAmount: number;
    raisedAmount: number;
    checkpoints: Checkpoint[];
    imageUrl: string;
    daysLeft: number;
    creator?: Creator; // Make creator optional
  };
}

// Category colors mapping
const CATEGORY_COLORS = {
  Environment: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
  Education: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
  Healthcare: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
  Community: "bg-gradient-to-r from-purple-500 to-violet-500 text-white",
  Technology: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
  Arts: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const percentComplete = Math.round(
    (project.raisedAmount / project.goalAmount) * 100
  );
  const [isHovered, setIsHovered] = useState(false);

  const categoryColor =
    CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS] ||
    "bg-gradient-to-r from-gray-500 to-gray-600 text-white";

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card
        className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg border-none shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 z-10"
            style={{ opacity: isHovered ? 0.6 : 0 }}
          ></div>
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="absolute top-3 right-3 z-20">
            <Badge className={`${categoryColor} border-none`}>
              {project.category}
            </Badge>
          </div>

          <div
            className="absolute bottom-3 left-3 right-3 transition-transform duration-300 z-20"
            style={{
              transform: isHovered ? "translateY(0)" : "translateY(10px)",
              opacity: isHovered ? 1 : 0,
            }}
          >
            <Link href={`/project/${project.id}`}>
              <Button
                size="sm"
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 shadow-md"
              >
                Quick View
              </Button>
            </Link>
          </div>
        </div>

        <CardContent className="flex-grow pt-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">
                ${project.raisedAmount.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                of ${project.goalAmount.toLocaleString()}
              </span>
            </div>
            <ProgressBar
              value={percentComplete}
              color={
                project.category === "Environment"
                  ? "green"
                  : project.category === "Healthcare"
                  ? "red"
                  : project.category === "Education"
                  ? "blue"
                  : project.category === "Community"
                  ? "purple"
                  : "blue"
              }
              size="md"
              animated={true}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                className="text-indigo-600"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{project.daysLeft} days left</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
                className="text-green-600"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>
                {project.checkpoints.filter((c) => c.completed).length} of{" "}
                {project.checkpoints.length}
              </span>
            </div>
          </div>

          {/* Creator info */}
          {project.creator ? (
            <div className="mt-4 pt-4 border-t">
              <Link
                href={`/profile/${project.creator.id}`}
                className="flex items-center gap-2 group hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded-lg transition-colors"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={project.creator.image}
                    alt={project.creator.name}
                  />
                  <AvatarFallback>
                    {project.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {project.creator.name}
                </span>
                {project.creator.verified && (
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
                    className="text-blue-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )}
              </Link>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 p-1">
                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-sm text-muted-foreground">Anonymous</span>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 pb-6">
          <Link href={`/project/${project.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
            >
              View Project
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
