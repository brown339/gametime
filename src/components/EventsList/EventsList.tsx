'use client';

import Link from 'next/link';
import './styles.css';
import { GTEvent } from '@/app/models/GTEvent';

export function EventsList({ events }: { events: GTEvent[] }) {
  return (
    <section className="events-list">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <div className="event-card">
            <div className="event-image">
              <img src={event.thumbnail} alt={event.name} />
              <span className="event-favorite" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <p className="event-name">{event.name}</p>
            <p className="event-details">
              {event.dateTime} — {event.venue}
            </p>
            <p className="event-price">From ${event.lowestPrice}</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
