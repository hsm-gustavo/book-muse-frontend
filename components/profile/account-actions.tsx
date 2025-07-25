import { deleteUserAccount, logout } from "@/app/me/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { AnimatedButton } from "../ui/animated-button"
import { Loader2, LogOut, Trash2 } from "lucide-react"
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

export default function AccountActions() {
  const [logoutState, logoutAction, isLoggingOut] = useActionState(
    logout,
    undefined
  )
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteUserAccount,
    undefined
  )

  useEffect(() => {
    if (logoutState?.error) {
      toast.error(logoutState.error)
    }
  }, [logoutState])

  useEffect(() => {
    if (deleteState?.error) {
      toast.error(deleteState.error)
    }
  }, [deleteState])

  return (
    <div className="flex gap-2">
      <form action={logoutAction}>
        <AnimatedButton
          size="icon"
          type="submit"
          variant="outline"
          className="gap-2 bg-transparent rounded-full h-8 w-8"
          disabled={isLoggingOut || isDeleting}
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="sr-only">Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </>
          )}
        </AnimatedButton>
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <AnimatedButton
            size="icon"
            variant="destructive"
            className="gap-2 rounded-full h-8 w-8"
            disabled={isLoggingOut || isDeleting}
          >
            <span className="sr-only">Delete Account</span>
            <Trash2 className="h-4 w-4" />
          </AnimatedButton>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <form action={deleteAction} className="inline">
              <AlertDialogAction
                type="submit"
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete Account"
                )}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
