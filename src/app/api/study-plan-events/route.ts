import { connectDB } from "@/lib/connect";
import { Planner } from "@/models/planner";
// import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const uploadId = url.searchParams.get("uploadId");

  if (!uploadId) {
    return NextResponse.json({ error: "Missing uploadId" }, { status: 400 });
  }

  await connectDB();

  const plan = await Planner.findOne({ uploadId });
  //   console.log(plan);

  if (!plan) {
    return NextResponse.json({ plan: [] });
  }

  return NextResponse.json({ plan });
}

// export async function PATCH(req: NextRequest) {
//   const url = new URL(req.url);
//   const uploadId = url.searchParams.get("uploadId");

//   if (!uploadId) {
//     return NextResponse.json(
//       { error: "Missing uploadId parameter" },
//       { status: 400 }
//     );
//   }

//   const { eventId, newDueDate } = await req.json();

//   if (!eventId || !newDueDate) {
//     return NextResponse.json(
//       { error: "Missing eventId or newDueDate in request body" },
//       { status: 400 }
//     );
//   }

//   await connectDB();

//   try {
//     const result = await Planner.updateOne(
//       { uploadId, "studyPlan._id": eventId },
//       { $set: { "studyPlan.$.dueDate": new Date(newDueDate) } }
//     );

//     if (result.modifiedCount === 0) {
//       return NextResponse.json(
//         { error: "Event not found or no changes applied" },
//         { status: 404 }
//       );
//     }

//     // console.log("Revalidating path:", `/planner?uploadId=${uploadId}`);
//     // revalidatePath(`/planner?uploadId=${uploadId}`);

//     // const event = result.studyPlan.id(eventId);

//     console.log(result.modifiedCount);

//     return NextResponse.json(
//       { message: "Event due date updated successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to update event:", error);
//     return NextResponse.json(
//       { error: "Internal server error while updating event" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const uploadId = url.searchParams.get("uploadId");

  if (!uploadId) {
    return NextResponse.json(
      { error: "Missing uploadId parameter" },
      { status: 400 }
    );
  }

  const { eventId, newDueDate } = await req.json();

  if (!eventId || !newDueDate) {
    return NextResponse.json(
      { error: "Missing eventId or newDueDate in request body" },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const planner = await Planner.findOne({ uploadId });

    if (!planner) {
      return NextResponse.json({ error: "Planner not found" }, { status: 404 });
    }

    const event = planner.studyPlan.id(eventId);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    event.dueDate = new Date(newDueDate);

    // Reset notified flag if due date is now in the future
    if (event.dueDate > new Date()) {
      event.notified = false;
    }

    await planner.save();

    return NextResponse.json(
      { message: "Event due date updated and notification reset if needed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json(
      { error: "Internal server error while updating event" },
      { status: 500 }
    );
  }
}
