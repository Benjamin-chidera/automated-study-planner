"use client";

import { EditModal } from "@/components/modals/edit-summary-modal/EditModal";
import { Button } from "@/components/ui/button";
import { SessionPayload } from "@/types/session";
import axios from "axios";
import React from "react";

interface MaterialsCardsProps {
  _id: string;
  createdAt: string;
  extractedText: string;
  filename: string;
  fileType: string;
  summaryText: string;
}

interface DetailsProps {
  detailMaterials: MaterialsCardsProps;
  user: SessionPayload | undefined;
}

const Details: React.FC<DetailsProps> = ({ detailMaterials, user }) => {
  const handleGeneratePlan = async () => {
    try {
      const { data } = await axios.post("/api/generate-study-plan", {
        uploadId: detailMaterials._id,
        userId: user,
      });
      console.log(data);
    } catch (error) {
      console.error("Error generating plan:", error);
    }
  };

  return (
    <main className="flex justify-between gap-5">
      <section>
        <h1 className="font-bold text-xl md:text-3xl mb-5">Extracted Text</h1>
        <div className="border-2 p-3 border-[#2196F3] h-[700px] overflow-y-scroll">
          <p className="text-lg max-w-xl">{detailMaterials?.extractedText}</p>
        </div>
      </section>

      <section>
        <h1 className="font-bold text-xl md:text-3xl mb-5">
          Generated Summary
        </h1>
        <div className="border-2 border-[#FF9800] p-3 h-[700px] overflow-y-scroll">
          <p className="text-lg max-w-xl whitespace-pre-line">
            {detailMaterials?.summaryText}
          </p>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <EditModal text={detailMaterials?.summaryText} />
          <Button
            className="bg-[#4F46E5] text-white cursor-pointer"
            onClick={handleGeneratePlan}
          >
            Generate Study Plan
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Details;
