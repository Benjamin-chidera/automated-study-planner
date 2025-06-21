"use client"

import { deleteUser } from "@/app/actions/profile"
import type { SessionPayload } from "@/types/session"
import { useActionState, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { AlertTriangle, Trash2 } from "lucide-react"

interface ProfileProps {
  user: SessionPayload | undefined
}

export const ProfileDeleted = ({ user }: ProfileProps) => {
  const [state, action, isPending] = useActionState(deleteUser, null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle errors from server action
  if (state?.errors) {
    toast.error(state.message || "Failed to delete account")
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      // Show loading toast
      // toast.loading("Deleting your account...", { id: "delete-account" })

      // Call the server action
      await action(formData)

      // Close dialog
      setIsDialogOpen(false)

      // Dismiss loading toast
      toast.dismiss("delete-account")
    } catch (error) {
      console.error("Delete account error:", error)
      toast.dismiss("delete-account")
      toast.error("Failed to delete account. Please try again.")
    }
  }

  return (
    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
      <div className="flex items-start gap-4">
        <AlertTriangle className="text-red-600 mt-1" size={24} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Delete Account</h3>
          <p className="text-red-700 mb-4">Once you delete your account, there is no going back. Please be certain.</p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={isPending}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Account
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <DialogHeader>
                <DialogTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle size={20} />
                  Delete Account
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-2">
                  This action cannot be undone. This will permanently delete your account, all your study planners,
                  uploads, and remove all your data from our servers.
                </DialogDescription>
              </DialogHeader>

              <div className="bg-red-50 border border-red-200 rounded-md p-3 my-4">
                <p className="text-sm text-red-800 font-medium">
                  Are you absolutely sure you want to delete your account?
                </p>
              </div>

              <form action={handleSubmit}>
                <input type="hidden" name="userId" value={user?.userId || ""} />

                <DialogFooter className="flex gap-3 mt-6">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="flex-1" disabled={isPending}>
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    variant="destructive"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    disabled={isPending || !user?.userId}
                  >
                    {isPending ? "Deleting..." : "Yes, Delete Account"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {state?.errors && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-red-800 text-sm font-medium">Error:</p>
          {Object.entries(state.errors).map(([key, value]) => (
            <p key={key} className="text-red-700 text-sm">
              {value}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
