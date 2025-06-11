"use client";

import { Calendar } from "@/components/calendar/calendar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface CalendarEvent {
  _id: string;
  topic: string;
  dueDate: string | Date;
}

const Planner = () => {
  const searchParams = useSearchParams();
  const uploadId = searchParams.get("uploadId");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!uploadId) {
        setError("Missing uploadId parameter");
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/study-plan-events?uploadId=${uploadId}`
        );
        if (data?.plan?.studyPlan) {
          const parsedEvents = data.plan.studyPlan.map(
            (event: CalendarEvent) => ({
              ...event,
              dueDate: new Date(event.dueDate), // Ensure dueDate is a Date object
            })
          );
          setEvents(parsedEvents);
        } else {
          setEvents([]);
       
        }
        setError(null);
      } catch (error) {
        console.error("Failed to load study plan:", error);
        setError("Failed to load study plan");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [uploadId]);

  return (
    <main className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Study Plan</h1>
      </div>
      {loading && <p>Loading study plan...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <Calendar events={events} uploadId={uploadId} initialDate={null} />}
    </main>
  );
};

export default Planner;
