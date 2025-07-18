/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/generate-study-plan/route.ts
import { connectDB } from "@/lib/connect";
import { generatePlan } from "@/lib/generate-plan";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import { User } from "@/models/user";
import sendEmail from "@/utils/sendEmail";
import { NextResponse, NextRequest } from "next/server";

function extractJSON(text: string) {
  try {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;
    const jsonString = text.slice(start, end);
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse plan:", e);
    return [];
  }
}

// export async function POST(req: NextRequest) {

//   try {
//     const body = await req.json();
//     const { uploadId, userId } = body;

//     if (!uploadId || !userId) {
//       return NextResponse.json(
//         { error: "Missing uploadId or userId" },
//         { status: 400 }
//       );
//     }

//     await connectDB();
//     const user = await User.findById(userId);
//     const getSummary = await Upload.findById(uploadId);

//     const userAvailability = user?.availability || [];

//     const formattedAvailability =
//       userAvailability.length > 0
//         ? userAvailability
//             .map((slot: any) => {
//               return `${slot.day} from ${slot.startTime} to ${slot.endTime} (${slot.label})`;
//             })
//             .join("; ")
//         : null;

//     console.log("user availability: ", userAvailability);

//     if (!getSummary) {
//       return NextResponse.json({ error: "Upload not found" }, { status: 404 });
//     }

//     const planText =
//       (await generatePlan(getSummary.summaryText, formattedAvailability)) ||
//       "{}";
//     const fileName = getSummary.filename;
//     console.log(fileName);

//     const parsedPlan = extractJSON(planText);

//     const plan = new Planner({
//       studyPlan: parsedPlan,
//       uploadId,
//       userId,
//       fileName,
//     });

//     await Upload.findByIdAndUpdate(uploadId, {
//       $set: { hasGeneratedAStudyPlan: true },
//     });

//     plan.hasGeneratedAStudyPlan = true;

//     await plan.save();

//     await sendEmail({
//       to: user.email,
//       subject: "Your study plan is ready!",
//       template: "genericEmail",
//       context: {
//         subject: "Your study plan is ready!",
//         header: `Hey, ${user.fullname}!`,
//         body: " Your study plan is ready. Check your email for more details.",
//         ctaText: "View study plan",
//         ctaLink: `https://automated-study-planner.vercel.app/planner?uploadId=${uploadId}`,
//         logoUrl:
//           "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png", // Replace with your logo URL
//         date: new Date().getFullYear(), // Replace with current year
//       },
//     });

//     return NextResponse.json(
//       { success: true, studyPlan: parsedPlan },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in generate-study-plan:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// check if hasGeneratedAStudyPlan is true in upload schema

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uploadId, userId } = body;

    if (!uploadId || !userId) {
      return NextResponse.json(
        { error: "Missing uploadId or userId" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    const getSummary = await Upload.findById(uploadId);

    // 1. User availability formatting
    const userAvailability = user?.availability || [];
    const formattedAvailability =
      userAvailability.length > 0
        ? userAvailability
            .map((slot: any) => {
              return `${slot.day} from ${slot.startTime} to ${slot.endTime} (${slot.label})`;
            })
            .join("; ")
        : null;

    // 2. Check for existing scheduled study sessions
    const existingPlans = await Planner.find({ userId });
    const scheduledDates = existingPlans.flatMap((plan: any) =>
      plan.studyPlan.map((item: any) => item.dueDate)
    );

    const formattedScheduledDates = scheduledDates
      .map((iso: string) => {
        const d = new Date(iso);
        return `${d.toUTCString()}`;
      })
      .join("; ");

    if (!getSummary) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    const planText =
      (await generatePlan(
        getSummary.summaryText,
        formattedAvailability,
        formattedScheduledDates
      )) || "{}";

    const parsedPlan = extractJSON(planText);

    const newPlan = new Planner({
      studyPlan: parsedPlan,
      uploadId,
      userId,
      fileName: getSummary.filename,
      hasGeneratedAStudyPlan: true,
    });

    await newPlan.save();

    await Upload.findByIdAndUpdate(uploadId, {
      $set: { hasGeneratedAStudyPlan: true },
    });

    // Notify user via email
    await sendEmail({
      to: user.email,
      subject: "Your study plan is ready!",
      template: "genericEmail",
      context: {
        subject: "Your study plan is ready!",
        header: `Hey, ${user.fullname}!`,
        body: "Your study plan is ready. Check your email for more details.",
        ctaText: "View study plan",
        ctaLink: `https://automated-study-planner.vercel.app/planner?uploadId=${uploadId}`,
        logoUrl:
          "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
        date: new Date().getFullYear(),
      },
    });

    return NextResponse.json(
      { success: true, studyPlan: parsedPlan },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in generate-study-plan:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const uploadId = url.searchParams.get("uploadId");

    const getPlan = await Upload.findById(uploadId);

    if (!getPlan) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    console.log(getPlan.hasGeneratedAStudyPlan);

    return NextResponse.json(
      { success: true, hasGeneratedAStudyPlan: getPlan.hasGeneratedAStudyPlan },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in generate-study-plan:", error);
  }
}
