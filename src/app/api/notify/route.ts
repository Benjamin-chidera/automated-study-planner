// src/app/api/jobs/notify/route.ts
import { notifyDuePlans } from "@/app/actions/jobs";
import { NextResponse } from "next/server";

// export async function GET() {
//   await notifyDuePlans();
//   return NextResponse.json(
//     { message: "Notification check complete" },
//     { status: 200 }
//   );
// }

// src/app/api/jobs/notify/route.ts
// import { NextResponse } from "next/server";

export async function GET() {
  const scheduleUrl =
    "https://qstash.upstash.io/v2/schedules/https://automated-study-planner.vercel.app/api/notify";

  try {
    const response = await fetch(scheduleUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Upstash-Cron": "* * * * *", // runs every minute
        Authorization:
          "Bearer eyJVc2VySUQiOiIwMTNlMTlkOS1hOTJhLTRjODgtYTI5Yi04NWFiYTFmMzIwY2EiLCJQYXNzd29yZCI6ImZkMmZiN2FjODE0NTQxODhiZmZkNGJmMjYwOWJhYTQ0In0=",
      },
      body: JSON.stringify({
        description: "StudyMate - Automated Study Planner Notification Job",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Failed to schedule job:", error);
      return NextResponse.json(
        { error: "Failed to schedule job" },
        { status: 500 }
      );
    }

    await notifyDuePlans();
    
    const data = await response.json();
    return NextResponse.json(
      { message: "Job scheduled successfully", data },
      { status: 200 }
    );
  } catch (err) {
    console.error("Job scheduling error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
