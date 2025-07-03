import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
const HowToUseData = [
  {
    title: "Upload",
    description:
      "Click on the Browse File Button or Drag and Drop the file - Image/PDF",
    image: "/how_to_use/upload.jpeg",
  },
  {
    title: "Select a file",
    description:
      "Choose the file you want to upload and run the OCR process. The file should be an image or a PDF file.",
    image: "/how_to_use/select-file.jpeg",
  },
  {
    title: "Summary",
    description:
      "Once the file is uploaded, the summary of the file will be displayed. You can see the number of pages, the number of words, and the number of characters in the file. You can also see the file name and the file size. Click on the Create Study Plan button to create a study plan.",
    image: "/how_to_use/summary.jpeg",
  },
  {
    title: "Calendar",
    description:
      "Once the study plan is created, you can see the calendar view of the study plan. You can see the number of days and the number of hours for each day. You can also see the number of hours for each subject.",
    image: "/how_to_use/calendar.jpeg",
  },
  {
    title: "Completed",
    description:
      "Once you're done with the study plan, you can click on the Completed button to mark the plan as completed. You can also download the study plan as a PDF file.",
    image: "/how_to_use/completed-plan.jpeg",
  },
  {
    title: "Profile",
    description:
      "You can create a profile and save your availability. You can also see your previous uploaded files and study plans.",
    image: "/how_to_use/profile.jpeg",
  },
];

export const HowToUse = () => {
  return (
    <main>
      <h1 className="font-black text-4xl text-gray-800 capitalize text-center mb-10">
        How to Use
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="">
          {HowToUseData.map((item, i) => (
            <CarouselItem key={i} className="">
              <div className="p-1">
                <Card className=" h-full border border-blue-700">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      <Image
                        src={item.image}
                        alt={item.title}
                        height={500}
                        width={500}
                        loading="lazy"
                        className="w-full h-full object-contain max-w-full"
                      />
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className=" hidden md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </main>
  );
};
