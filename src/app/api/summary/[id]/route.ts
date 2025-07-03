// app/api/summary/[id]/route.ts

import { connectDB } from "@/lib/connect";
import { Upload } from "@/models/upload";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { newSummary } = await req.json();

  console.log("ID from route param:", id);
  console.log("Updated summary:", newSummary);

  // You can now update your DB with `id` and `newSummary`...
  await connectDB();
  const upload = await Upload.findByIdAndUpdate(
    id,
    {
      summaryText: newSummary,
    },
    { new: true, runValidators: true }
  );

  if (!upload) {
    return new Response(JSON.stringify({ message: "Upload not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Summary updated", id }), {
    status: 200,
  });
}
