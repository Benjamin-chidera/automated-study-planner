import axios from "axios";
import { NextResponse } from "next/server";

export const welcomeEmail = async (name: string, email: string) => {
  await axios.post(
    "https://discover-benix.app.n8n.cloud/webhook/4f206342-e616-4c1a-8791-1e867a98f79e",
    {
      name: name,
      email: email,
    }
  );

  return NextResponse.json(
    { message: "Welcome email sent successfully" },
    { status: 200 }
  );
};
