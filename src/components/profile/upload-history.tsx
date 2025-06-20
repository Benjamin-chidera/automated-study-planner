"use server";

import {
  // deleteUploadedMaterial,
  getMyUploadedStudyMaterials,
} from "@/app/actions/study-materials";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Button } from "../ui/button";
import { DeleteProfile } from "./delete-profile";

export const UploadHistory = async () => {
  const materials = await getMyUploadedStudyMaterials();

  return (
    <main className=" shadow-lg rounded-lg pb-10">
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
            {materials?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-gray-500"
                >
                  No uploads found.
                </TableCell>
              </TableRow>
            ) : (
              materials?.map((uploads) => (
                <TableRow key={uploads._id}>
                  <TableCell className="font-medium">
                    {uploads.filename}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(uploads.createdAt)?.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right ms-20">
                    <DeleteProfile uploadId={uploads._id.toString()} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};
