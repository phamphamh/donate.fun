"use client";

import { useState } from "react";
import ProjectCard from "@/components/project-card";

// Mock data for popular projects
const POPULAR_PROJECTS = [
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
  },
];

export default function PopularProjects() {
  const [projects] = useState(POPULAR_PROJECTS);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
