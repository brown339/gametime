import './styles.css';

interface EventsListLoaderProps {
  count?: number;
}

export function EventsListLoader({ count = 4 }: EventsListLoaderProps) {
  return (
    <section
      className="events-list"
      aria-label="Loading events"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="event-card event-card-skeleton">
          <div className="event-image skeleton-shimmer" />
          <div className="skeleton-line skeleton-name skeleton-shimmer" />
          <div className="skeleton-line skeleton-details skeleton-shimmer" />
          <div className="skeleton-line skeleton-price skeleton-shimmer" />
        </div>
      ))}
    </section>
  );
}
