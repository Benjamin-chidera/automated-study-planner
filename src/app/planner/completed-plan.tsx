"use client";

import { Button } from "@/components/ui/button";
import React, { useActionState, useEffect, useState } from "react";
import { completePlanner } from "../actions/study-materials";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { redirect } from "next/navigation";

const CompletedPlan = ({
  plannerId,
  isCompleted,
}: {
  plannerId: string;
  isCompleted: boolean;
}) => {
  const [state, action, isPending] = useActionState(completePlanner, null);
  const { width, height } = useWindowSize();

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (state && state?.message) {
      setShowConfetti(true);

      // Stop confetti after 5 seconds
      const timeout = setTimeout(() => {
        setShowConfetti(false);
        redirect("/completed-plans");
      }, 5000);

      return () => clearTimeout(timeout); // Clean up
    }
  }, [state]);

//   console.log(isCompleted);

  return (
    <main className="text-right md:mt-3">
      {showConfetti && <Confetti width={width} height={height} />}
      {!isCompleted && (
        <form action={action}>
          <input type="hidden" name="plannerId" value={plannerId} />
          <Button
            className="bg-blue-600 text-white cursor-pointer font-medium"
            disabled={isPending}
          >
            Complete this plan
          </Button>
        </form>
      )}
    </main>
  );
};

export default CompletedPlan;
