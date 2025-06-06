import { getMaterialDetail } from "@/app/actions/study-materials";
import React from "react";
import Details from "./detail";

type Params = Promise<{ id: string }>;

const Summary = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const detailMaterials = await getMaterialDetail(id);

  console.log(detailMaterials);

  return (
    <div>
      <Details detailMaterials={detailMaterials} />
    </div>
  );
};

export default Summary;
