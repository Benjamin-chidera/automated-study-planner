import { getMyUploadedStudyMaterials } from "@/app/actions/study-materials";
import { MaterialsCards } from "@/components/material-cards/materials-cards";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const UploadedMaterial = async () => {
  const materials = await getMyUploadedStudyMaterials();

  // console.log(materials);

  return (
    <main>
      <div className=" flex justify-between items-center">
        <h1 className="font-bold text-xl md:text-3xl">
          Uploaded Study Material
        </h1>

        <Button className="bg-blue-600 text-white rounded-md px-4 py-2 md:px-6 md:py-5 cursor-pointer font-bold">
          <Plus /> <p className="hidden md:block">Create a new plan</p>
        </Button>
      </div>

      {/* list of uploaded materials */}

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-4">
        {materials?.map((material) => (
          <MaterialsCards material={material} key={material._id}/>
        ))}
      </section>
    </main>
  );
};

export default UploadedMaterial;
