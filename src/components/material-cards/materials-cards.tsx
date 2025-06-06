import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export interface MaterialsCardsProps {
  material: {
    _id: string;
    createdAt: string;
    extractedText: string;
    filename: string;
    fileType: string;
  };
}

export const MaterialsCards = ({ material }: MaterialsCardsProps) => {
  return (
    <main>
      <Link href={`/summary/${material._id}`}>
        <Card
          className={`h-[170px] max-w-full border-2 ${
            material.fileType === "pdf"
              ? "border-[#F44336] hover:[background-color:#F44336] hover:text-white duration-500"
              : "border-[#4CAF50] hover:[background-color:#4CAF50] hover:text-white duration-500"
          } text-black `}
        >
          <CardHeader>
            <CardTitle className="truncate overflow-hidden whitespace-nowrap max-w-[80%]">
              {material.filename}
            </CardTitle>
            <CardAction>View</CardAction>
          </CardHeader>
          <CardContent>
            <p className=" uppercase text-xs font-bold">{material.fileType}</p>
          </CardContent>
          {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
        </Card>
      </Link>
    </main>
  );
};
