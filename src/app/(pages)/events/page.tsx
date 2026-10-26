'use client';

import './styles.css';
import { seedDb } from '@/lib/seedDb';
import { EventsList } from '@/components/EventsList/EventsList';
import { EventsListLoader } from '@/components/EventsList/EventsListLoader';
import { useEvents } from '@/app/hooks/useEvents';

export default function EventsPage() {
  // Uncomment to seed the database.
  // seedDb();

  const events = useEvents();

  return (
    <div className="events-page">
      <h1>Upcoming events</h1>
      {events.length > 0 ? (
        <EventsList events={events} />
      ) : (
        <EventsListLoader />
      )}
    </div>
  );
}
