"use client";

import React, { useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import { EventDropArg } from "@fullcalendar/core/index.js";
import { useRouter } from "next/navigation";

// Define the event type for TypeScript
interface CalendarEvent {
  _id: string;
  topic: string;
  dueDate: string | Date;
}

// Define props type
interface CalendarProps {
  events: CalendarEvent[];
  uploadId: string | null;
  initialDate: Date | null;
}

export const Calendar = ({ events, uploadId, initialDate }: CalendarProps) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Transform events to FullCalendar format
  const formattedEvents = useMemo(() => {
    const mappedEvents =
      events?.map((event) => {
        const start = new Date(event.dueDate);
        // console.log("Event mapping:", {
        //   id: event._id,
        //   title: event.topic,
        //   start,
        // }); // Debug
        return {
          id: event._id,
          title: event.topic,
          start,
        };
      }) || [];
    // console.log("Formatted events:", mappedEvents); // Debug
    return mappedEvents;
  }, [events]);

  // Handle event drop (existing event moved)
  const handleEventDrop = async (info: EventDropArg) => {
    if (info.event.start) {
      const updatedEvent = {
        eventId: info.event.id,
        newDueDate: info.event.start.toISOString(),
      };

      if (!uploadId) {
        setError("Missing uploadId parameter");
        info.revert();
        return;
      }

      try {
        const response = await axios.patch(
          `/api/study-plan-events?uploadId=${uploadId}`,
          updatedEvent
        );
        console.log("Event updated:", response.data);
        setError(null);
        router.refresh();
        // window.location.reload();
      } catch (error) {
        console.error("Failed to update event:", error);
        setError("Failed to update event due date");
        info.revert();
      }
    }
  };

  return (
    <main className="p-4 md:flex gap-8 h-[600px]">
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="w-1/4 p-4 border hidden md:block  overflow-y-scroll">
        <h2 className="font-bold mb-4">Topics</h2>
        {formattedEvents.map((event, index) => (
          <div
            key={index}
            className="fc-event bg-blue-500 text-white px-2 py-1 rounded mb-2"
            data-title={event.title}
          >
            <h3> {event.title}</h3>
            <p className=" text-sm font-bold mt-2">
              {event.start.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={initialDate || undefined} // Focus on earliest event date
          editable={true}
          selectable={true}
          droppable={false}
          events={formattedEvents}
          eventDrop={handleEventDrop}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          slotDuration="00:30:00" // 30-minute slots
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventClick={(info) => {
            console.log("Event clicked:", {
              id: info.event.id,
              title: info.event.title,
              start: info.event.start?.toISOString(),
            });
          }}
          height="auto" // Adjust height dynamically
        />
      </div>
    </main>
  );
};
