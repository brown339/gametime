import { GTEvent } from '@/app/models/GTEvent';
import Link from 'next/link';
import './styles.css';

export function EventHeader({ event }: { event: GTEvent }) {
  return (
    <header className="event-header">
      <Link href="/events" className="back-button">
        <span aria-hidden="true">←</span> Back to events
      </Link>
      <h1>{event.name}</h1>
      <p>
        {event.dateTime} · {event.venue}, {event.city}, {event.state}
      </p>
    </header>
  );
}
