import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SquarePen } from "lucide-react";

export const EditModal = ({
  text,
  setText,
}: {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [draftText, setDraftText] = useState(text);

  const handleSave = () => {
    setText(draftText);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#4F46E5]  text-white cursor-pointer">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Summary</DialogTitle>
          <DialogDescription>
            <Textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={30}
              className="mt-4 h-[300px] resize-none"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave} className="bg-[#4F46E5] hover:bg-blue-900 cursor-pointer text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
