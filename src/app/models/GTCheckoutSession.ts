import { Timestamp } from 'firebase/firestore';
import { GTEvent } from './GTEvent';
import { GTListing } from './GTListing';

export interface GTCheckoutSessionRequest {
  event: GTEvent;
  listing: GTListing;
  userId: string;
}

export interface GTCheckoutSessionResponse {
  id: string;
  event: GTEvent;
  listing: GTListing;
  userId: string;
  createdTimestamp: Date;
  expiresTimestamp: Date;
}
