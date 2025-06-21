// src/app/api/jobs/notify/route.ts
import { notifyDuePlans } from "@/app/actions/jobs";
import { NextResponse } from "next/server";

export async function GET() {
  await notifyDuePlans();
  return NextResponse.json({ status: "Notification check complete" });
}
 