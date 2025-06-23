// src/app/api/jobs/notify/route.ts
import { notifyDuePlans } from "@/app/actions/jobs";
import { NextResponse } from "next/server";

export async function GET() {
  await notifyDuePlans();
  return NextResponse.json(
    { message: "Notification check complete" },
    { status: 200 }
  );
}

// "$schema": "https://openapi.vercel.sh/vercel.json",
//   "crons": [
//     {
//       "path": "/api/notify",
//       "schedule": "*/30 * * * *"
//     }
//   ],