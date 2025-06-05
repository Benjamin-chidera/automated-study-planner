"use client";

import { EditModal } from "@/components/edit-summary-modal/EditModal";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// interface MaterialsCardsProps {
//   _id: string;
//   createdAt: string;
//   extractedText: string;
//   filename: string;
//   fileType: string;
// }

const Details = ({ detailMaterials }: { detailMaterials: any }) => {
  const [text, setText] = useState(
    `- The Industrial Revolution started in Great Britain in the late 18th century. 
- It marked a shift from agriculture to industry, driven by innovations in textiles, steam power, and iron. 
- Factories and urbanization increased, leading to societal changes and new economic systems. 
- Key inventions included the power loom, steam engine, and cotton gin, boosting production and growth. 
- Challenges arose, such as pollution, poor working conditions, and social inequality.`
  );

  return (
    <main className="flex justify-between gap-5">
      <section>
        <h1 className="font-bold text-xl md:text-3xl mb-5">Extracted Text</h1>

        <div className=" border-2 p-3 border-[#2196F3] h-[700px] overflow-y-scroll">
          <p className="text-lg max-w-xl">{detailMaterials?.extractedText}</p>
        </div>
      </section>

      <section>
        <h1 className="font-bold text-xl md:text-3xl mb-5">
          Generated Summary
        </h1>

        <div className="border-2 border-[#FF9800] p-3 h-[700px]">
          <p className="text-lg max-w-xl whitespace-pre-line">{text}</p>
        </div>

        <div className="mt-5 flex justify-between items-center">
          {/* Pass down state to EditModal */}
          <EditModal text={text} setText={setText} />

          <Button className="bg-[#4F46E5]  text-white cursor-pointer">
            Generate Study
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Details;
