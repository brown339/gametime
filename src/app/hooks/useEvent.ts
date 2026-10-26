import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { GTEvent } from '@/app/models/GTEvent';

export const useEvent = (eventId: string) => {
  const [event, setEvent] = useState<GTEvent | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }
        const data: GTEvent = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        router.push('/events');
      }
    };

    fetchEvent();
  }, [eventId, router]);

  return event;
};
