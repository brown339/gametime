import { useState, useEffect } from 'react';
import type { GTEvent } from '@/app/models/GTEvent';

export const useEvents = () => {
  const [events, setEvents] = useState<GTEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data: GTEvent[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return events;
};
