/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/connect";
import { User } from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const { newBlock } = await req.json();

    if (!userId || !newBlock) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.availability.push(newBlock);
    await user.save();

    return NextResponse.json({
      message: "Availability updated",
      updatedAvailability: user.availability,
    });
  } catch (error) {
    console.error("Update error", error);
    return NextResponse.json({ message: "Failed to update availability" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { userId, blockId } = await req.json();

    if (!userId || !blockId) {
      return NextResponse.json(
        { message: "Missing userId or blockId" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.availability = user.availability.filter(
      (block: any) => block.id !== blockId
    );

    await user.save();

    return NextResponse.json(
      { message: "Availability block deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting availability block:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
