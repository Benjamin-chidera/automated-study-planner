import React from "react";
import UploadedMaterial from "./materials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uploaded Materials - StudyM8",
  description: "View and manage your uploaded study materials in one place.",
  keywords: ["uploaded materials", "study plan", "study history", "studym8 materials"],
  openGraph: {
    title: "Your Uploaded Materials - StudyM8",
    description:
      "Access all your uploaded materials and their AI-generated study plans.",
    url: "https://studym8.vercel.app/uploaded-materials",
    siteName: "StudyM8",
    images: [
      {
        url: "https://studym8.vercel.app/materials-og.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Study Materials - StudyM8",
    description:
      "Browse your uploaded notes and review your AI-generated study plan.",
    images: ["https://studym8.vercel.app/materials-og.png"],
  },
};

const page = () => {
  return (
    <div>
      <UploadedMaterial />
    </div>
  );
};

export default page;
