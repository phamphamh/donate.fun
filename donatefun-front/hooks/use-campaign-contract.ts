"use client";
import { useReadContract, useWriteContract } from "wagmi";
import { formatEther, parseEther } from "viem";
import CampaignManagerABI from "@/app/CampaignManager.json";
import { useEffect } from "react";

const CONTRACT_ADDRESS = "0xA319151b0B5C2143f7A7a9a2E3822F0E34cEF900";

interface Campaign {
  owner: string;
  name: string;
  description: string;
  currentDistributionPhase: bigint;
  totalContributors: bigint;
  totalContributions: bigint;
  contributionPhaseFinished: boolean;
  isCampaign: boolean;
}

const PROJECT = {
  id: "2",
  title: "Education for All",
  description:
    "Providing quality education to underprivileged children in rural communities. This project aims to build 3 schools, train 20 teachers, and provide educational materials to over 500 students. Access to education will improve literacy rates and create opportunities for these communities.",
  category: "Education",
  goalAmount: 200,
  raisedAmount: 8000,
  checkpoints: [
    {
      id: "cp1",
      title: "School Construction Phase 1",
      percentage: 30,
      completed: true,
      description:
        "Begin construction of the first school facility with classrooms and basic infrastructure.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp2",
      title: "Teaching Materials",
      percentage: 20,
      completed: true,
      description:
        "Purchase and distribute textbooks, notebooks, and other educational materials for students.",
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
};

export function useCampaignContract() {
  const { data: campaign } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CampaignManagerABI.abi,
    functionName: "campaigns",
    args: [BigInt(0)], // Campaign ID 0
  }) as { data: any[] | undefined };

  const { data: contributions, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CampaignManagerABI.abi,
    functionName: "contributions",
    query: {
      refetchInterval: 1000,
    },
    args: [BigInt(0)], // Campaign ID 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refetching");
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { writeContract: contribute, isPending } = useWriteContract();

  const handleContribute = async (amount: number) => {
    try {
      await contribute({
        address: CONTRACT_ADDRESS,
        abi: CampaignManagerABI.abi,
        functionName: "contribute",
        args: [BigInt(0)], // Campaign ID 0
        value: parseEther(amount.toString()),
      });
    } catch (error) {
      console.error("Error contributing:", error);
      throw error;
    }
  };

  return {
    project: {
      ...PROJECT,
      raisedAmount: campaign
        ? campaign[5] * BigInt(10 ** 10) || BigInt(0)
        : BigInt(0),
      backers: campaign ? Number(campaign[4]) : 0,
    },
    contributions,
    contribute: handleContribute,
    isContributePending: isPending,
  };
}
