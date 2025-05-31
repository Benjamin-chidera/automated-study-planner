"use client";

import { EditModal } from "@/components/edit-summary-modal/EditModal";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Summary = () => {
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
        <p className="text-lg max-w-xl">
          The Industrial Revolution, a period of unprecedented technological
          advancement, began in the late 18th century in Great Britain...
        </p>
      </section>

      <section>
        <h1 className="font-bold text-xl md:text-3xl mb-5">
          Generated Summary
        </h1>
        <p className="text-lg max-w-xl whitespace-pre-line">{text}</p>

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

export default Summary;
