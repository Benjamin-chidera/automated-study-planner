"use client";

import { useUploadStore } from "@/app/store/upload-store";
import { EditModal } from "@/components/modals/edit-summary-modal/EditModal";
import { Button } from "@/components/ui/button";
import { SessionPayload } from "@/types/session";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
  user: SessionPayload | undefined | string;
}

const Details = ({ detailMaterials, user }: DetailsProps) => {
  // check if study plan is already generated

  const {
    isPlanGenerated,
    setIsPlanGenerated,
    isCheckingPlan,
    setIsCheckingPlan,
    loading,
    setLoading,
  } = useUploadStore();
  const router = useRouter();

  useEffect(() => {
    const isGenerated = async () => {
      try {
        const { data } = await axios.get(
          `/api/generate-study-plan?uploadId=${detailMaterials._id}`
        );
        setIsPlanGenerated(data.hasGeneratedAStudyPlan);
      } catch (error) {
        console.log(error);
      } finally {
        setIsCheckingPlan(false); // <-- finish checking
      }
    };

    isGenerated();
  }, [detailMaterials?._id]);

  // function to handle generate study plan
  const handleGeneratePlan = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/generate-study-plan", {
        uploadId: detailMaterials._id,
        userId: user,
      });
      console.log(data);

      if (data?.success) {
        // Redirect to calendar page with upload ID
        window.location.href = `/planner?uploadId=${detailMaterials._id}`;
      }
    } catch (error) {
      console.error("Error generating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="lg:flex justify-between gap-5">
      <section className=" hidden md:block w-full">
        <h1 className="font-bold text-xl md:text-3xl mb-5">Extracted Text</h1>
        <div className="border-2 p-3 border-[#2196F3] h-[700px] overflow-y-scroll">
          <p className="text-lg max-w-full">{detailMaterials?.extractedText}</p>
        </div>
      </section>

      <section className="w-full mt-10 lg:mt-0">
        <h1 className="font-bold text-xl md:text-3xl mb-5">
          Generated Summary
        </h1>
        <div className="border-2 border-[#FF9800] p-3 h-[700px] overflow-y-scroll">
          <p className="text-lg max-w-full whitespace-pre-line">
            {detailMaterials?.summaryText}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="mt-5">
            {!isCheckingPlan && !isPlanGenerated && (
              <Button
                className="bg-[#4F46E5] text-white cursor-pointer"
                onClick={handleGeneratePlan}
                disabled={loading}
              >
                {loading ? "  Generating..." : "  Generate Study Plan"}
              </Button>
            )}
          </div>

          <div className="mt-5 flex justify-between items-center gap-5">
            <EditModal
              text={detailMaterials?.summaryText}
              id={detailMaterials?._id}
            />
            {!isCheckingPlan && isPlanGenerated && (
              <Button
                className="bg-[#4F46E5] text-white cursor-pointer"
                onClick={() =>
                  router.push(`/planner?uploadId=${detailMaterials._id}`)
                }
              >
                View Study Plan
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Details;
