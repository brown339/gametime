'use client';

import { useEvent } from '@/app/hooks/useEvent';
import './styles.css';
import { useParams } from 'next/navigation';
import { EventHeader } from '@/components/EventHeader/EventHeader';
import { EventHeaderLoader } from '@/components/EventHeader/EventHeaderLoader';
import { EventListings } from '@/components/EventListings/EventListings';
import { EventListingsLoader } from '@/components/EventListings/EventListingsLoader';
import { useListings } from '@/app/hooks/useListings';

export default function EventPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const event = useEvent(eventId);
  const listings = useListings(eventId);

  return (
    <div className="event-page">
      {event ? <EventHeader event={event} /> : <EventHeaderLoader />}
      {event && listings.length > 0 ? (
        <EventListings event={event} listings={listings} />
      ) : (
        <EventListingsLoader />
      )}
    </div>
  );
}
