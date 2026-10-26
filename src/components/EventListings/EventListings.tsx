'use client';

import { useSession } from '@/app/hooks/useSession';
import './styles.css';
import { GTEvent } from '@/app/models/GTEvent';
import { GTListing } from '@/app/models/GTListing';

export function EventListings({
  event,
  listings,
}: {
  event: GTEvent;
  listings: GTListing[];
}) {
  const { onListingClick } = useSession(event);

  const cheapestPrice = Math.min(...listings.map((l) => l.price));

  return (
    <ul className="listings">
      {listings.map((listing) => (
        <li
          key={listing.id}
          onClick={() => onListingClick(listing)}
          className="listing"
        >
          <div className="listing-image">
            <img
              src={listing.thumbnail}
              alt={`View from ${listing.location}`}
            />
            {listing.price === cheapestPrice && (
              <span className="listing-badge">🔥 Cheapest</span>
            )}
          </div>

          <div className="listing-info">
            <div>
              <p className="listing-subtitle">
                {listing.availableSeatsTogether} seats together
              </p>
              <p className="listing-location">{listing.location}</p>
            </div>

            <div className="listing-price">
              <p className="listing-fees">Includes Fees</p>
              <p className="listing-amount">
                ${listing.price}
                <span className="listing-unit">/ea</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
