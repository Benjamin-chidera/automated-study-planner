"use server";

import { getMyUploadedStudyMaterials } from "@/app/actions/study-materials";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const UploadHistory = async () => {
  const materials = await getMyUploadedStudyMaterials();

  return (
    <div>
      {" "}
      <div>
        <Table className="">
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">File Name</TableHead>
              <TableHead className="text-center">Uploaded Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materials?.map((uploads) => (
              <TableRow key={uploads._id}>
                <TableCell className="font-medium">
                  {uploads.filename}
                </TableCell>
                <TableCell className="text-center">
                  {new Date(uploads.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <button className="text-red-500 font-bold">Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
