"use client"

import { AnimatedButton } from "@/components/ui/animated-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit3 } from "lucide-react"
import ReviewForm from "./review-form"
import { useState } from "react"

interface ReviewDialogProps {
  openLibraryId: string
}

export default function ReviewDialog({ openLibraryId }: ReviewDialogProps) {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)

  return (
    <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
      <DialogTrigger asChild>
        <AnimatedButton className="w-56">
          <Edit3 className="h-4 w-4 mr-2" />
          Write Review
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Write a review for this book</DialogDescription>
        </DialogHeader>
        <ReviewForm
          setReviewDialogOpen={setReviewDialogOpen}
          openLibraryId={openLibraryId}
        />
      </DialogContent>
    </Dialog>
  )
}
