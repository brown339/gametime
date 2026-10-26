import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { GTListing } from '@/app/models/GTListing';

export const useListings = (eventId: string | undefined) => {
  const [listings, setListings] = useState<GTListing[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!eventId) {
      setListings([]);
      return;
    }

    const fetchListings = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}/listings`);
        if (!response.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data: GTListing[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
        router.push('/listings');
      }
    };

    fetchListings();
  }, [eventId, router]);

  return listings;
};
