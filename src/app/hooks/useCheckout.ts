import { useEffect, useState } from 'react';
import { GTCheckoutSessionResponse } from '../models/GTCheckoutSession';
import { GTEvent } from '../models/GTEvent';
import { GTListing } from '../models/GTListing';
import { useRouter } from 'next/navigation';

type AlertId =
  | 'checkout-complete'
  | 'checkout-session-expired'
  | 'listing-no-more-seats'
  | 'listing-price-increased'
  | 'listing-price-decreased';

export const useCheckout = (sessionId: string) => {
  const router = useRouter();
  const [session, setSession] = useState<GTCheckoutSessionResponse | null>();
  const [event, setEvent] = useState<GTEvent | null>(null);
  const [listing, setListing] = useState<GTListing | null>(null);
  const [alertId, setAlertId] = useState<AlertId | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await fetchSession();
        setSession(session);
        const event = await fetchEvent(session.event.id);
        const listing = await fetchListing(
          session.event.id,
          session.listing.id,
        );

        // Ensure session is not expired
        if (new Date() > new Date(session.expiresTimestamp)) {
          setAlertId('checkout-session-expired');
          return;
        }

        // Ensure listing is still available
        if (listing.availableSeatsTogether === 0) {
          setAlertId('listing-no-more-seats');
          return;
        }

        // Has price changed?
        if (listing.price > session.listing.price) {
          setAlertId('listing-price-increased');
          return;
        }

        if (listing.price < session.listing.price) {
          setAlertId('listing-price-decreased');
          return;
        }
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchSession = async (): Promise<GTCheckoutSessionResponse> => {
    try {
      const response = await fetch(`/api/sessions/${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      const data = await response.json();

      if (data === null) {
        throw new Error('Session is null');
      }

      setSession(data);
      return data;
    } catch (error) {
      router.push('/events');
      throw error;
    }
  };

  const fetchEvent = async (eventId: string): Promise<GTEvent> => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const data = await response.json();
      setEvent(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchListing = async (
    eventId: string,
    listingId: string,
  ): Promise<GTListing> => {
    try {
      const response = await fetch(
        `/api/events/${eventId}/listings/${listingId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const data = await response.json();
      setListing(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const checkout = async () => {
    if (!session || !event) return;

    const listing = await fetchListing(session.event.id, session.listing.id);

    // Ensure listing is still available
    if (listing.availableSeatsTogether === 0) {
      setAlertId('listing-no-more-seats');
      return;
    }

    // Complete checkout
    await fetch(`/api/events/${event.id}/listings/${listing.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        availableSeatsTogether: --listing.availableSeatsTogether,
      }),
    });

    await fetch(`/api/sessions/${session.id}`, {
      method: 'DELETE',
    });

    setAlertId('checkout-complete');
  };

  const getAlertText = (): string => {
    if (alertId === 'checkout-complete') {
      return 'Purchase completed! Check your email for your receipt!';
    }

    if (alertId === 'checkout-session-expired') {
      return "We're sorry, but your checkout session has expired. Please start a new session.";
    }

    if (alertId === 'listing-no-more-seats') {
      return "Oh no! It looks like the last ticket was purchased by someone else! Let's try to find you another ticket!";
    }

    if (alertId === 'listing-price-decreased') {
      return 'Great news! It looks like the listing price has decreased!';
    }

    if (alertId === 'listing-price-increased') {
      return 'Heads up! It looks like the listing price has increased!';
    }

    return '';
  };

  return {
    session,
    event,
    listing,
    alertId,
    setAlertId,
    getAlertText,
    checkout,
  };
};
