"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { apiClient } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { Loader2, Trash2 } from "lucide-react"
import { motion } from "motion/react"

export function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      await apiClient.deleteProfile()
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Delete account failed:", error)
      setIsDeleting(false)
    }
  }

  return (
    <Card className="border-red-200 bg-red-50/50">
      <CardHeader>
        <CardTitle className="text-xl text-red-700">Danger Zone</CardTitle>
        <CardDescription className="text-red-600">
          Irreversible and destructive actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ x: [0, -2, 2, -2, 2, 0] }}
            transition={{
              x: {
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              },
              scale: { type: "spring", stiffness: 400, damping: 17 },
            }}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
          </motion.div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all of your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
