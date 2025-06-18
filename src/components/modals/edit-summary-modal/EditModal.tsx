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

export const EditModal = ({ text, id }: { text: string; id: string }) => {
  const [editedText, setEditedText] = useState(text); // use state for changes

  // console.log(id);

  const handleSave = async () => {
    try {
      const { data } = await axios.patch(
        `/api/summary-edit/${id}`,
        {
          newSummary: editedText,
        }
      );

      console.log("Updated summary:", data);
      toast.success("Summary updated successfully!");
    } catch (error) {
      console.error("Error updating summary:", error);
      toast.error("Failed to update summary. Please try again.");
    }
  };

  return (
    <Dialog>
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
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
