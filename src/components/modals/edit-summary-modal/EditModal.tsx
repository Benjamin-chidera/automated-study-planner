import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { SquarePen } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EditModal = ({ text, id }: { text: string; id: string }) => {
  const [editedText, setEditedText] = useState(text);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // control dialog open state
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/summary/${id}`, {
        newSummary: editedText,
      });
      toast.success("Summary updated successfully!");
      router.refresh();
      setLoading(false);
      setOpen(false);  // <-- close dialog here
    } catch (error) {
      console.error("Error updating summary:", error);
      toast.error("Failed to update summary. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4F46E5] text-white cursor-pointer">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Summary</DialogTitle>
          <DialogDescription>
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={30}
              name="summary"
              className="mt-4 h-[300px] resize-none"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-[#4F46E5] hover:bg-blue-900 cursor-pointer text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
