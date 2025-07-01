import { Calendar } from "@/components/calendar/calendar";
import CompletedPlan from "./completed-plan";

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

  return (
    <main className="">
      <div className="flex justify-between md:items-center mb-4 gap-2">
        <h1 className="text-xl font-bold">Study Plan</h1>
        <CompletedPlan
          plannerId={data?.plan?._id}
          isCompleted={data?.plan?.isCompleted}
        />
      </div>
      <Calendar
        events={events}
        uploadId={uploadId}
        initialDate={null}
        isCompleted={data?.plan?.isCompleted}
      />
    </main>
  );
}
