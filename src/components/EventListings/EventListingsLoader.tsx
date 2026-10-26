import './styles.css';

interface EventListingsLoaderProps {
  count?: number;
}

export function EventListingsLoader({ count = 2 }: EventListingsLoaderProps) {
  return (
    <ul className="listings" aria-label="Loading listings" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index} className="listing event-card-skeleton">
          <div className="listing-image skeleton-shimmer" />

          <div className="listing-info">
            <div>
              <div className="skeleton-line skeleton-listing-subtitle skeleton-shimmer" />
              <div className="skeleton-line skeleton-listing-location skeleton-shimmer" />
            </div>

            <div className="listing-price">
              <div className="skeleton-line skeleton-listing-fees skeleton-shimmer" />
              <div className="skeleton-line skeleton-listing-amount skeleton-shimmer" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
