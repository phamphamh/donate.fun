"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProjectGalleryProps {
  images: string[]
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(image)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img
                src={image || "/placeholder.svg"}
                alt={`Project image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-3 text-white">
                <p className="text-sm">Click to enlarge</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Project image"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  )
}

