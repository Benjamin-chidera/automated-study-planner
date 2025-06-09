import { getMaterialDetail } from "@/app/actions/study-materials";
import React from "react";
import Details from "./detail";
import { getAuthUser } from "@/lib/getUser";

type Params = Promise<{ id: string }>;

const Summary = async ({ params }: { params: Params }) => {
  const { id } = await params;

  const user = await getAuthUser();

  const detailMaterials = await getMaterialDetail(id);

  // console.log(detailMaterials);

  return (
    <div>
      <Details detailMaterials={detailMaterials} user={user?.userId} />
    </div>
  );
};

export default Summary;
