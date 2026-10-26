'use client';

import './styles.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCheckout } from '@/app/hooks/useCheckout';
import Alert from '@/components/Alert/Alert';

function GooglePayLogo() {
  return (
    <span className="gpay-logo">
      <span className="g-blue">G</span> Pay
    </span>
  );
}

function PayPalLogo() {
  return <span className="paypal-logo">PayPal</span>;
}

export default function CheckoutPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const router = useRouter();
  const {
    session,
    event,
    listing,
    alertId,
    setAlertId,
    getAlertText,
    checkout,
  } = useCheckout(sessionId);

  if (!event || !listing) {
    return <div>Loading...</div>;
  }

  const contactEmail = 'user@gmail.com';
  const quantity = 1;
  const total = listing.price * quantity;

  const formatPrice = (value: number) => `$${value.toFixed(2)}`;

  return (
    <>
      <div className="checkout-page">
        <main className="checkout-main">
          <Link href={`/events/${event.id}`} className="checkout-back">
            <span aria-hidden="true">←</span> Back to listings
          </Link>

          <section className="checkout-contact">
            <p className="checkout-label">Contact</p>
            <p>{contactEmail}</p>
          </section>

          <section className="checkout-payment">
            <div className="checkout-payment-header">
              <h2>Choose How to Pay</h2>
              <span className="checkout-secured">
                Secured
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1zm2 0h6V7a3 3 0 0 0-6 0v3z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>

            <fieldset className="payment-options">
              <legend className="visually-hidden">Payment method</legend>

              <div className="payment-option payment-option--card">
                <label className="payment-option-row">
                  <input type="radio" name="payment" value="card" />
                  <span className="payment-option-name">Add New Card</span>
                  <svg
                    className="payment-option-icon"
                    viewBox="0 0 28 20"
                    width="28"
                    height="20"
                    aria-hidden="true"
                  >
                    <rect width="28" height="20" rx="3" fill="#111" />
                    <rect x="4" y="13" width="20" height="2" fill="#fff" />
                  </svg>
                </label>

                <div className="card-fields">
                  <label className="card-field card-field--number">
                    <span className="visually-hidden">Credit Card Number</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="Credit Card Number"
                    />
                    <span className="card-brands" aria-hidden="true">
                      <span className="card-brand card-brand--visa">VISA</span>
                      <span className="card-brand card-brand--mc">
                        <span />
                        <span />
                      </span>
                      <span className="card-brand card-brand--amex">AMEX</span>
                      <span className="card-brand card-brand--discover">
                        DISCOVER
                      </span>
                    </span>
                  </label>

                  <label className="card-field">
                    <span className="visually-hidden">Expiration</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="Expiration"
                    />
                  </label>

                  <label className="card-field">
                    <span className="visually-hidden">CVV</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="CVV"
                    />
                    <svg
                      viewBox="0 0 24 18"
                      width="22"
                      height="16"
                      aria-hidden="true"
                    >
                      <rect width="24" height="18" rx="3" fill="#9a9ca3" />
                      <rect y="4" width="24" height="3" fill="#6b6d73" />
                    </svg>
                  </label>
                </div>
              </div>

              <label className="payment-option payment-option-row">
                <input
                  type="radio"
                  name="payment"
                  value="google-pay"
                  defaultChecked
                />
                <span className="payment-option-name">Google Pay</span>
                <span className="payment-option-badge">
                  <GooglePayLogo />
                </span>
              </label>

              <label className="payment-option payment-option-row">
                <input type="radio" name="payment" value="paypal" />
                <span className="payment-option-name">Pay with PayPal</span>
                <span className="payment-option-badge payment-option-badge--square">
                  <span className="paypal-mark">P</span>
                </span>
              </label>
            </fieldset>
          </section>

          <footer className="checkout-footer">
            <p className="checkout-terms">
              By purchasing you agree to our <a href="#">Terms of Use</a> and{' '}
              <a href="#">Privacy Policy</a>.
            </p>

            <div className="checkout-footer-bar">
              <div className="checkout-footer-total">
                <p className="checkout-footer-amount">{formatPrice(total)}</p>
                <p className="checkout-footer-caption">Total with fees</p>
              </div>

              <button
                type="button"
                className="buy-button"
                onClick={() => {
                  checkout();
                }}
              >
                <span className="buy-label buy-label--card">
                  Pay {formatPrice(total)}
                </span>
                <span className="buy-label buy-label--google-pay">
                  Buy with <GooglePayLogo />
                </span>
                <span className="buy-label buy-label--paypal">
                  Pay with <PayPalLogo />
                </span>
              </button>
            </div>
          </footer>
        </main>

        <aside className="checkout-summary">
          <div className="seat-map">
            <img
              src="https://placehold.co/630x300/1c1d21/3b4a6b?text=Seat+Map"
              alt={`Seat map for ${event.venue}`}
            />
            <div className="seat-map-controls">
              <button type="button" aria-label="Previous image">
                ‹
              </button>
              <button type="button" aria-label="Next image">
                ›
              </button>
            </div>
          </div>

          <p className="summary-venue">
            {event.venue} • {event.city}, {event.state}
          </p>
          <h1 className="summary-name">{event.name}</h1>
          <p className="summary-date">{event.dateTime}</p>

          <p className="summary-alert">
            ⚡ Only {listing.availableSeatsTogether} tickets left at this price!
            ⚡
          </p>

          <div className="summary-row">
            <span>Tickets</span>
            <span>
              {formatPrice(listing.price)}{' '}
              <span className="summary-muted">× {quantity}</span>
            </span>
          </div>
          <a href="#" className="summary-promo">
            Add Promo Code
          </a>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <ul className="summary-details">
            <li>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M6 3h12a2 2 0 0 1 2 2v9H4V5a2 2 0 0 1 2-2zm-2 13h16v2h-2v3h-3v-3H9v3H6v-3H4z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <p className="summary-detail-title">{listing.location}</p>
                <p className="summary-detail-sub">
                  {quantity} Ticket{quantity > 1 ? 's' : ''}
                </p>
              </div>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4zm6 3v6h2V9zm4 0v6h2V9z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <p className="summary-detail-title">Mobile Transfer Ticket</p>
              </div>
            </li>
          </ul>
        </aside>
      </div>

      {alertId !== null && (
        <Alert
          text={getAlertText()}
          onClick={function (): void {
            setAlertId(null);
            if (
              alertId === 'checkout-session-expired' ||
              alertId === 'checkout-complete'
            ) {
              router.push('/events');
            }
            if (alertId === 'listing-no-more-seats') {
              router.push(`/events/${event.id}`);
            }
          }}
        />
      )}
    </>
  );
}
