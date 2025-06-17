// "use client";

// import { Calendar } from "@/components/calendar/calendar";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// interface CalendarEvent {
//   _id: string;
//   topic: string;
//   dueDate: string | Date;
// }

// const Planner = () => {
//   const searchParams = useSearchParams();
//   const uploadId = searchParams.get("uploadId");
//   const [events, setEvents] = useState<CalendarEvent[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (!uploadId) {
//         setError("Missing uploadId parameter");
//         return;
//       }

//       setLoading(true);
//       try {
//         const { data } = await axios.get(
//           `/api/study-plan-events?uploadId=${uploadId}`
//         );
//         if (data?.plan?.studyPlan) {
//           const parsedEvents = data.plan.studyPlan.map(
//             (event: CalendarEvent) => ({
//               ...event,
//               dueDate: new Date(event.dueDate), // Ensure dueDate is a Date object
//             })
//           );
//           setEvents(parsedEvents);
//         } else {
//           setEvents([]);
//         }
//         setError(null);
//       } catch (error) {
//         console.error("Failed to load study plan:", error);
//         setError("Failed to load study plan");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [uploadId]);

//   return (
//     <main className="p-4">
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Study Plan</h1>
//       </div>
//       {loading && <p>Loading study plan...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {!loading && !error && (
//         <Calendar events={events} uploadId={uploadId} initialDate={null} />
//       )}
//     </main>
//   );
// };

// export default Planner;

import { Calendar } from "@/components/calendar/calendar";
import React from "react";

interface CalendarEvent {
  _id: string;
  topic: string;
  dueDate: string;
}

interface StudyPlanEvent {
  id: string;
  title: string;
  dueDate: string; // or Date if you handle conversion here
  // Add other fields as necessary
}

const PlannerPage = async ({
  searchParams,
}: {
  searchParams: { uploadId?: string | null };
}) => {
  const uploadId = await searchParams.uploadId;

  // console.log(searchParams);

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

  // console.log(data);

  const events: CalendarEvent[] =
    data?.plan?.studyPlan?.map((event: StudyPlanEvent) => ({
      ...event,
      dueDate: new Date(event.dueDate),
    })) || [];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Study Plan</h1>
      <Calendar events={events} uploadId={uploadId} initialDate={null} />
    </main>
  );
};

export default PlannerPage;
