"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CreateCheckpoints from "@/components/create-checkpoints"

const CATEGORIES = [
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
  { id: "environment", name: "Environment" },
  { id: "community", name: "Community" },
  { id: "technology", name: "Technology" },
  { id: "arts", name: "Arts & Culture" },
]

export default function CreateProjectPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    goalAmount: "",
    description: "",
    story: "",
    checkpoints: [{ title: "", description: "", percentage: 25 }],
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevious = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would submit the form data to your API
    console.log("Submitting project:", formData)

    // Redirect to success page or dashboard
    // router.push("/dashboard")
  }

  return (
    <main className="container py-8 md:py-12 max-w-3xl">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 flex items-center gap-1 mb-4 hover:underline">
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
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-2">Create a Project</h1>
        <p className="text-muted-foreground">Share your cause and set up checkpoints to receive funding</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            1
          </div>
          <div className={`h-1 flex-grow ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <div className={`h-1 flex-grow ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className={step >= 1 ? "text-blue-600 font-medium" : "text-muted-foreground"}>Basic Info</div>
          <div className={step >= 2 ? "text-blue-600 font-medium" : "text-muted-foreground"}>Checkpoints</div>
          <div className={step >= 3 ? "text-blue-600 font-medium" : "text-muted-foreground"}>Review & Submit</div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    placeholder="Give your project a clear, descriptive title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goalAmount">Funding Goal ($)</Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    value={formData.goalAmount}
                    onChange={(e) => updateFormData("goalAmount", e.target.value)}
                    placeholder="Enter amount in USD"
                    min="100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Briefly describe your project (100-150 characters)"
                    maxLength={150}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Project Story</Label>
                  <Textarea
                    id="story"
                    value={formData.story}
                    onChange={(e) => updateFormData("story", e.target.value)}
                    placeholder="Tell potential donors about your project, why it matters, and how their contributions will help"
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
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
                      className="mx-auto text-muted-foreground mb-4"
                    >
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                      <path d="M18 2v4h4" />
                      <path d="M21 8H16a2 2 0 0 1-2-2V1" />
                    </svg>
                    <p className="text-muted-foreground mb-2">Drag and drop images here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (max. 5MB each)</p>
                    <input type="file" className="hidden" multiple accept="image/*" />
                    <Button type="button" variant="outline" size="sm" className="mt-4">
                      Upload Images
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={handleNext}>
                    Continue to Checkpoints
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Define Your Checkpoints</h3>
                  <p className="text-muted-foreground mb-4">
                    Checkpoints help donors track your progress and ensure transparency. Define what you'll accomplish
                    at each stage and what percentage of the total funding you'll need.
                  </p>

                  <CreateCheckpoints
                    checkpoints={formData.checkpoints}
                    onChange={(checkpoints) => updateFormData("checkpoints", checkpoints)}
                  />
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Back
                  </Button>
                  <Button type="button" onClick={handleNext}>
                    Review Project
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Review Your Project</h3>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Project Title</h4>
                      <p>{formData.title || "Not provided"}</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Category</h4>
                      <p>{CATEGORIES.find((c) => c.id === formData.category)?.name || "Not selected"}</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Funding Goal</h4>
                      <p>${formData.goalAmount || "0"}</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Description</h4>
                      <p>{formData.description || "Not provided"}</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-1">Checkpoints</h4>
                      {formData.checkpoints.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {formData.checkpoints.map((checkpoint, index) => (
                            <li key={index}>
                              <strong>{checkpoint.title}</strong> ({checkpoint.percentage}%) - {checkpoint.description}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No checkpoints defined</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="terms" className="mr-2" required />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </Link>{" "}
                      and confirm that all information provided is accurate.
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handlePrevious}>
                      Back
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Submit Project
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

