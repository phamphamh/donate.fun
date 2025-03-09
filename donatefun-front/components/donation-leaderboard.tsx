"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Type for the donor data
interface Donor {
  id: string;
  name: string;
  avatar: string;
  totalDonated: number;
  projects: number;
  primaryCategory: string;
  donationCount: number;
}

// Mock data for top donors
const TOP_DONORS: Donor[] = [
  {
    id: "d1",
    name: "Alexandra Johnson",
    avatar: "", // Using empty string to use fallbacks
    totalDonated: 2450,
    projects: 8,
    primaryCategory: "Environment",
    donationCount: 12,
  },
  {
    id: "d2",
    name: "Michael Chen",
    avatar: "",
    totalDonated: 1875,
    projects: 5,
    primaryCategory: "Education",
    donationCount: 9,
  },
  {
    id: "d3",
    name: "Sophia Rodriguez",
    avatar: "",
    totalDonated: 1650,
    projects: 4,
    primaryCategory: "Healthcare",
    donationCount: 7,
  },
  {
    id: "d4",
    name: "David Kim",
    avatar: "",
    totalDonated: 1200,
    projects: 6,
    primaryCategory: "Community",
    donationCount: 10,
  },
  {
    id: "d5",
    name: "Emma Wilson",
    avatar: "",
    totalDonated: 950,
    projects: 3,
    primaryCategory: "Arts",
    donationCount: 5,
  },
  {
    id: "d6",
    name: "James Taylor",
    avatar: "",
    totalDonated: 800,
    projects: 2,
    primaryCategory: "Technology",
    donationCount: 4,
  },
];

// Category colors mapping (same as used elsewhere in the app)
const CATEGORY_COLORS = {
  Environment: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
  Education: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
  Healthcare: "bg-gradient-to-r from-red-500 to-pink-500 text-white",
  Community: "bg-gradient-to-r from-purple-500 to-violet-500 text-white",
  Technology: "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
  Arts: "bg-gradient-to-r from-amber-500 to-orange-500 text-white",
};

// Format the badge name from the category
const getCategoryBadgeName = (category: string): string => {
  return `${category} Supporter`;
};

export default function DonationLeaderboard() {
  const [visibleDonors, setVisibleDonors] = useState(6);
  
  // Function to load more donors
  const loadMore = () => {
    setVisibleDonors((prev) => Math.min(prev + 3, TOP_DONORS.length));
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-heading text-center">Donation Leaderboard</CardTitle>
        <p className="text-muted-foreground text-center mt-1">
          Celebrating our most generous supporters
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TOP_DONORS.slice(0, visibleDonors).map((donor, index) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-card dark:from-muted/10 dark:to-card hover:from-muted hover:to-muted/80 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={donor.avatar} alt={donor.name} />
                    <AvatarFallback className="font-heading font-bold">
                      {donor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Position medal for top 3 */}
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                      ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'}`}
                    >
                      {index + 1}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-heading font-bold text-foreground">{donor.name}</h3>
                  <div className="flex items-center mt-1 gap-1.5">
                    <Badge 
                      className={`${CATEGORY_COLORS[donor.primaryCategory as keyof typeof CATEGORY_COLORS] || 'bg-gray-500'} border-none text-xs`}
                    >
                      {getCategoryBadgeName(donor.primaryCategory)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {donor.projects} projects
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-heading font-bold text-lg text-foreground">
                  ${donor.totalDonated.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {donor.donationCount} donations
                </div>
              </div>
            </motion.div>
          ))}

          {visibleDonors < TOP_DONORS.length && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={loadMore}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 