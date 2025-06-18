// import { Calendar } from "@/components/calendar/calendar";
// import React from "react";

// interface CalendarEvent {
//   _id: string;
//   topic: string;
//   dueDate: string;
// }

// interface StudyPlanEvent {
//   id: string;
//   title: string;
//   dueDate: string; // or Date if you handle conversion here
//   // Add other fields as necessary
// }

// const PlannerPage = async ({
//   searchParams,
// }: {
//   searchParams: { uploadId?: string | null };
// }) => {
//   const uploadId = await searchParams.uploadId;

//   // console.log(searchParams);

//   if (!uploadId) {
//     return <p className="text-red-500 p-4">Missing upload ID</p>;
//   }

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/study-plan-events?uploadId=${uploadId}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     return <p className="text-red-500 p-4">Failed to load study plan</p>;
//   }

//   const data = await res.json();

//   // console.log(data);

//   const events: CalendarEvent[] =
//     data?.plan?.studyPlan?.map((event: StudyPlanEvent) => ({
//       ...event,
//       dueDate: new Date(event.dueDate),
//     })) || [];

//   return (
//     <main className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Study Plan</h1>
//       <Calendar events={events} uploadId={uploadId} initialDate={null} />
//     </main>
//   );
// };

// export default PlannerPage;

// src/app/planner/page.tsx (server component)
import { Calendar } from "@/components/calendar/calendar";
// import { type NextRequest } from "next/server";

interface CalendarEvent {
  _id: string;
  topic: string;
  dueDate: string | Date; // Adjusted to allow Date type
}

interface StudyPlanEvent {
  _id: string;
  topic: string;
  dueDate: string;
}

// Define the props interface
interface PlannerPageProps {
  searchParams: Promise<{ uploadId?: string | null }>;
}

export default async function PlannerPage({ searchParams }: PlannerPageProps) {
  // Await the searchParams to resolve the Promise
  const resolvedSearchParams = await searchParams;
  const uploadId = resolvedSearchParams.uploadId;

  // console.log(uploadId);

  if (!uploadId) {
    return <p className="text-red-500 p-4">Missing upload ID</p>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/study-plan-events?uploadId=${uploadId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p className="text-red-500 p-4">Failed to load study plan</p>;
  }

  const data = await res.json();

  const events: CalendarEvent[] =
    data?.plan?.studyPlan?.map((event: StudyPlanEvent) => ({
      _id: event._id,
      topic: event.topic,
      dueDate: new Date(event.dueDate),
    })) || [];

  // console.log(data?.plan?.studyPlan);

  // console.log(events);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Study Plan</h1>
      <Calendar events={events} uploadId={uploadId} initialDate={null} />
    </main>
  );
}
