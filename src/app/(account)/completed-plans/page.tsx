import { getUserPlanner } from "@/app/actions/study-materials";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const CompletedPlans = async () => {
  const materials = await getUserPlanner();

  const planner = materials?.filter(
    (materials) => materials.status === "completed"
  );

  return (
    <main>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-4">
        {planner?.length === 0 && <p>Not Existing Materials</p>}
        {planner?.map((material) => (
          <div key={material._id}>
            <Link href={`/planner?uploadId=${material.uploadId.toString()}`}>
              <Card
                className={`h-[170px] max-w-full border-2 ${
                  material.fileType === "pdf"
                    ? "border-[#F44336] hover:[background-color:#F44336] hover:text-white duration-500"
                    : "border-[#4CAF50] hover:[background-color:#4CAF50] hover:text-white duration-500"
                } text-black `}
              >
                <CardHeader>
                  <CardTitle className="truncate overflow-hidden whitespace-nowrap max-w-[80%]">
                    {material.fileName}
                  </CardTitle>
                  <CardAction>View</CardAction>
                </CardHeader>
                <CardContent>
                  <p className=" uppercase text-xs font-bold">
                    {material.fileType}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CompletedPlans;
