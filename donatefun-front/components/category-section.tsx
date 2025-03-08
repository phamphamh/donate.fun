import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const CATEGORIES = [
  {
    id: "education",
    name: "Education",
    icon: (
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
        className="text-blue-600"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    count: 42,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: (
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
        className="text-red-600"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    count: 38,
  },
  {
    id: "environment",
    name: "Environment",
    icon: (
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
        className="text-green-600"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    count: 29,
  },
  {
    id: "community",
    name: "Community",
    icon: (
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
        className="text-purple-600"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    count: 35,
  },
]

export default function CategorySection() {
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <Link key={category.id} href={`/explore?category=${category.id}`}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} projects</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

