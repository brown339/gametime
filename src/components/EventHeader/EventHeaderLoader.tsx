import Link from 'next/link';
import './styles.css';

export function EventHeaderLoader() {
  return (
    <header className="event-header" aria-label="Loading event header" aria-busy="true">
      <Link href="/events" className="back-button">
        <span aria-hidden="true">←</span> Back to events
      </Link>
      <div className="skeleton-line skeleton-header-title skeleton-shimmer" />
      <div className="skeleton-line skeleton-header-subtitle skeleton-shimmer" />
    </header>
  );
}

