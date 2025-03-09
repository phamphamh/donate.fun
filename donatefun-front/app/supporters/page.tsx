import DonationLeaderboard from "@/components/donation-leaderboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SupportersPage() {
  return (
    <main className="min-h-screen pb-12">
      {/* Header section with gradient background */}
      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white">
        <div className="container py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Donation Leaderboard</h1>
              <p className="text-indigo-100 max-w-2xl">
                Celebrating our most generous supporters who help make projects a reality. Their contributions drive meaningful change across communities and causes.
              </p>
            </div>

            <Link href="/explore">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-none shadow-md">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main leaderboard container */}
      <div className="container mt-10">
        <div className="md:grid md:grid-cols-3 gap-8">
          {/* Information panel */}
          <div className="md:col-span-1 mb-8 md:mb-0">
            <div className="bg-card rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4">About Our Supporters</h2>
              <p className="text-muted-foreground mb-4">
                Our supporters come from all walks of life but share a common passion for making a difference. From one-time donors to regular contributors, each person plays a vital role in our mission.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Category Badges</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
                  <span className="text-sm">Environment Supporter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></span>
                  <span className="text-sm">Education Supporter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500"></span>
                  <span className="text-sm">Healthcare Supporter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500"></span>
                  <span className="text-sm">Community Supporter</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main leaderboard */}
          <div className="md:col-span-2">
            <DonationLeaderboard />
            
            <div className="mt-8 text-center">
              <div className="p-4 bg-muted rounded-lg inline-block">
                <h3 className="text-lg font-bold mb-2">Want to join the leaderboard?</h3>
                <p className="text-muted-foreground mb-4">
                  Make a donation to any project and help bring positive change to the world.
                </p>
                <Link href="/explore">
                  <Button className="bg-primary">Donate Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 