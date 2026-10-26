import { useEffect, useState } from 'react';
import {
  GTCheckoutSessionRequest,
  GTCheckoutSessionResponse,
} from '../models/GTCheckoutSession';
import { useRouter } from 'next/navigation';
import { GTListing } from '../models/GTListing';
import { GTEvent } from '../models/GTEvent';

export const useSession = (event: GTEvent) => {
  const router = useRouter();
  const [session, setSession] = useState<GTCheckoutSessionResponse | null>(
    null,
  );

  useEffect(() => {
    if (!session) return;

    router.push(`/checkout/${session.id}`);
  }, [session]);

  const onListingClick = async (listing: GTListing) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        body: JSON.stringify({
          event,
          listing,
          userId: 'user@gmail.com',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create session');
      }
      const data: GTCheckoutSessionResponse = await response.json();
      setSession(data);
      return data;
    } catch (error) {
      console.error('Error creating session:', error);
      return null;
    }
  };

  return { session, onListingClick };
};
