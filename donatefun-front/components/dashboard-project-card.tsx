"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ProgressBar from "@/components/progress-bar";
import { motion } from "framer-motion";

interface Checkpoint {
  title: string;
  percentage: number;
  completed: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  raisedAmount: number;
  checkpoints: Checkpoint[];
  imageUrl: string;
  daysLeft: number;
  status: "active" | "completed" | "draft";
}

interface DashboardProjectCardProps {
  project: Project;
  onCheckpointSubmit: (projectId: string) => void;
}

// Category colors mapping
const CATEGORY_COLORS = {
  Environment: "from-emerald-500 to-teal-500 text-white",
  Education: "from-blue-500 to-indigo-500 text-white",
  Healthcare: "from-red-500 to-pink-500 text-white",
  Community: "from-purple-500 to-violet-500 text-white",
  Technology: "from-cyan-500 to-blue-500 text-white",
  Arts: "from-amber-500 to-orange-500 text-white",
};

// Status colors mapping
const STATUS_COLORS = {
  active: "from-green-500 to-emerald-500 text-white",
  completed: "from-blue-500 to-indigo-500 text-white",
  draft: "from-gray-500 to-slate-500 text-white",
};

export default function DashboardProjectCard({
  project,
  onCheckpointSubmit,
}: DashboardProjectCardProps) {
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [nextCheckpoint, setNextCheckpoint] = useState<Checkpoint | null>(
    project.checkpoints.find((c) => !c.completed) || null
  );

  const percentComplete = Math.round(
    (project.raisedAmount / project.goalAmount) * 100
  );

  const categoryColor =
    CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS] ||
    "from-gray-500 to-gray-600 text-white";
  const statusColor =
    STATUS_COLORS[project.status as keyof typeof STATUS_COLORS] ||
    "from-gray-500 to-gray-600 text-white";

  const handleSubmitProof = () => {
    setIsUploading(true);

    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setIsSubmitOpen(false);
      onCheckpointSubmit(project.id);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg border-none shadow-md">
        <div className="relative">
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge className={`bg-gradient-to-r ${categoryColor} border-none`}>
              {project.category}
            </Badge>
            <Badge className={`bg-gradient-to-r ${statusColor} border-none`}>
              {project.status === "active"
                ? "Active"
                : project.status === "completed"
                ? "Completed"
                : "Draft"}
            </Badge>
          </div>
        </div>

        <CardContent className="flex-grow pt-6">
          <h3 className="text-lg font-bold mb-2">{project.title}</h3>

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

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-1 text-muted-foreground">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                {project.daysLeft > 0
                  ? `${project.daysLeft} days left`
                  : "Ended"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground">
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
                {project.checkpoints.filter((c) => c.completed).length} of{" "}
                {project.checkpoints.length}
              </span>
            </div>
          </div>

          {nextCheckpoint && project.status === "active" && (
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-3 rounded-lg mb-4">
              <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                Next Checkpoint:
              </div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400">
                {nextCheckpoint.title}
              </div>
              <div className="mt-2">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 border-none"
                  onClick={() => setIsSubmitOpen(true)}
                >
                  Submit Proof
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 pb-6 flex gap-2">
          <Link href={`/project/${project.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600"
            >
              View
            </Button>
          </Link>
          <Link href={`/project/${project.id}/edit`} className="flex-1">
            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 dark:from-indigo-950/30 dark:to-indigo-900/30 dark:hover:from-indigo-900/30 dark:hover:to-indigo-800/30"
            >
              Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 border-none">
          <DialogHeader>
            <DialogTitle>Submit Checkpoint Proof</DialogTitle>
            <DialogDescription>
              Provide evidence that you've completed the "
              {nextCheckpoint?.title}" checkpoint.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Upload Photos/Documents
              </label>
              <div className="border-2 border-dashed border-indigo-200 dark:border-indigo-800 rounded-lg p-8 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto text-indigo-400 mb-4"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <path d="M18 2v4h4" />
                  <path d="M21 8H16a2 2 0 0 1-2-2V1" />
                </svg>
                <p className="text-muted-foreground mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, PDF (max. 10MB each)
                </p>
                <input type="file" className="hidden" multiple />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4 bg-white dark:bg-gray-800"
                >
                  Upload Files
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe what you've accomplished for this checkpoint..."
                className="min-h-[100px] bg-white dark:bg-gray-800"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSubmitOpen(false)}
              className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitProof}
              disabled={isUploading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                "Submit Proof"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
