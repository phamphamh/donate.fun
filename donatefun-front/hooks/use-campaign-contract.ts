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
    "We are raising $50 to provide school clothes and uniforms for children in Tunisia, ensuring they can attend school with dignity and confidence. Many families struggle to afford proper attire, which can lead to exclusion and barriers to education. By contributing to this project, you are helping to remove these obstacles, promoting equal opportunities, and supporting a child's right to learn in a supportive environment. Every donation goes directly to purchasing essential school clothing, with full transparency through our blockchain system. Join us in making a real difference—every contribution counts!",
  category: "Education",
  goalAmount: 50,
  checkpoints: [
    {
      id: "cp1",
      title: "Material Procurement",
      percentage: 30,
      completed: false,
      description:
        "Purchase fabric and materials for school uniforms from local Tunisian suppliers.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp2",
      title: "Production Phase",
      percentage: 20,
      completed: false,
      description:
        "Local Tunisian tailors produce uniforms according to school specifications and size requirements.",
      proofUrl: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "cp3",
      title: "Quality Control",
      percentage: 25,
      completed: false,
      description:
        "Inspect all produced uniforms to ensure quality and durability for daily school wear.",
      proofUrl: "",
    },
    {
      id: "cp4",
      title: "Distribution",
      percentage: 25,
      completed: false,
      description:
        "Distribute uniform packages to identified children in three Tunisian communities.",
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
    "Education is a fundamental right that should be accessible to all children, regardless of their socioeconomic background. In Tunisia, many children face barriers to education due to their family's inability to afford proper school clothing and uniforms.\n\nOur Education for All initiative in Tunisia aims to address this specific challenge by providing school uniforms and essential clothing to children from families with financial difficulties. We believe that every child deserves to attend school with dignity and confidence, without feeling stigmatized or excluded due to their appearance.\n\nThis project will directly benefit over 100 students in three communities across Tunisia. By providing proper school attire, we can help increase school attendance, improve students' self-esteem, and ensure they can focus on their education rather than worrying about how they're dressed.\n\nWe work directly with local Tunisian tailors and clothing manufacturers to create the uniforms, supporting the local economy while ensuring the clothing meets school requirements. Each uniform package includes shirts, pants or skirts, a sweater for colder months, and proper footwear.\n\nWith our blockchain-based tracking system, donors can see exactly how their contributions are being used, from purchasing materials to distribution of the completed uniforms. We believe in complete transparency throughout the process.",
  updates: [
    {
      date: "2023-11-10",
      title: "Materials Sourced!",
      content:
        "We're excited to announce that we've sourced all the necessary fabrics and materials from local Tunisian suppliers. The quality is excellent and we're supporting local businesses in the process.",
    },
    {
      date: "2023-12-05",
      title: "Production Underway",
      content:
        "Thanks to your generous donations, production of the school uniforms has begun! Local tailors in Tunisia are now working to create high-quality uniforms that will last throughout the school year.",
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
