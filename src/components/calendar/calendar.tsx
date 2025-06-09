"use client";

import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

// Dummy external events
const externalEvents = [
  { title: "Study Math" },
  { title: "Read AI Paper" },
  { title: "Write Blog Post" },
];

export const Calendar = () => {
  const externalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalRef.current) {
      new Draggable(externalRef.current, {
        itemSelector: ".fc-event",
        eventData: (eventEl) => ({
          title: eventEl.getAttribute("data-title") || "",
        }),
      });
    }
  }, []);

  return (
    <main className="flex gap-8">
      {/* External draggable events */}
      <div ref={externalRef} className="w-1/4 p-4 border">
        <h2 className="font-bold mb-4">Draggable Events</h2>
        {externalEvents.map((event, index) => (
          <div
            key={index}
            className="fc-event bg-blue-500 text-white px-2 py-1 rounded mb-2 cursor-move"
            data-title={event.title}
          >
            {event.title}
          </div>
        ))}
      </div>

      {/* FullCalendar */}
      <div className="flex-1">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          droppable={true}
          //   select={(info) => {
          //     const title = prompt("What do you want to study?");
          //     if (title) {
          //       info.view.calendar.addEvent({
          //         title,
          //         start: info.startStr,
          //         end: info.endStr,
          //         allDay: false,
          //       });
          //     }
          //   }}
          drop={(info) => {
            const title = info.draggedEl.getAttribute("data-title");
            const date = info.dateStr;

            // connect backend to this
            console.log("Dropped:", title, "at", date);
          }}
        />
      </div>
    </main>
  );
};
