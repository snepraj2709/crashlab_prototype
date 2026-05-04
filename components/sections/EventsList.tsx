import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

import type { LabEvent } from "@/lib/content/site";
import { EmptyState } from "@/components/ui";

const TYPE_LABELS: Record<string, string> = {
  conference: "Conference",
  seminar: "Seminar",
  workshop: "Workshop",
  "lab-event": "Lab Event"
};

function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function isPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

interface EventsListProps {
  events: LabEvent[];
}

export function EventsList({ events }: EventsListProps): React.ReactElement {
  if (!events.length) {
    return (
      <div className="mt-12">
        <EmptyState body="No upcoming events at this time. Check back soon." title="No events yet." />
      </div>
    );
  }

  const upcoming = events.filter((e) => !isPast(e.date));
  const past = events.filter((e) => isPast(e.date));

  return (
    <div className="mt-12 space-y-12">
      {upcoming.length ? (
        <div>
          <h2 className="font-display text-2xl text-text-primary">Upcoming</h2>
          <div className="mt-6">
            {upcoming.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        </div>
      ) : null}

      {past.length ? (
        <div className="border-t border-border pt-12">
          <h2 className="font-display text-2xl text-text-secondary">Past Events</h2>
          <div className="mt-6">
            {past.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function EventCard({ event }: { event: LabEvent }): React.ReactElement {
  const typeLabel = event.type ? (TYPE_LABELS[event.type] ?? event.type) : null;

  return (
    <div className="border-b border-border py-6">
      {typeLabel ? (
        <p className="text-xs uppercase tracking-[0.18em] text-accent-cyan">{typeLabel}</p>
      ) : null}
      <h3 className="mt-3 text-xl font-semibold text-text-primary">{event.title}</h3>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Calendar className="size-3.5 shrink-0" />
          <span>{formatEventDate(event.date)}</span>
        </div>
        {event.location ? (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <MapPin className="size-3.5 shrink-0" />
            <span>{event.location}</span>
          </div>
        ) : null}
      </div>
      {event.description ? (
        <p className="mt-4 line-clamp-3 text-text-secondary">{event.description}</p>
      ) : null}
      {event.eventUrl ? (
        <Link
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:underline"
          href={event.eventUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Event details <ExternalLink className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
