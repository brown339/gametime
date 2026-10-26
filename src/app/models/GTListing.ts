export interface GTListing {
  id: string;
  eventId: string;
  location: string;
  thumbnail: string;
  price: number;
  availableSeatsTogether: number;
  purchasedByUserId?: string;
  purchasedTimestamp?: Date;
}
