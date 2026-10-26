# README

## What you built and how to run it

I built a checkout flow that handles sessions, price changes, and ticket availability.

Please visit `https://gametime-backend--gametime-6b6ae.us-east4.hosted.app/events` to see it in action. 
Note that it will be taken down in two weeks.

To run locally:

- Create a Firebase project at `https://console.firebase.google.com`
- Update `src/lib/firebaseConfig.example.ts` with the firebase project credentials
- Uncomment the `seedDb()` line in `src/app/(pages)/events`
- Run `npm run dev`

To test price changes, run locally, create a session by clicking on any listing in any event, and then use the Firebase UI to alter the price of a listing in the `listings` collection in Firestore. After that, refresh the page.

## User flow

- Navigate to events.
- Select an event to view the listing page.
- Select a listing to go to checkout.
- Note the url (/checkout/{ sessionId }). You can copy this url and use it to resume on another device. Note that it will expire in 15 minutes.
- Click the Buy button to complete your checkout.
- An alert box will appear if the price increases or decreases.
- An alert box will appear if you try to purchase when there are no more tickets.

## The checkout session state model

```ts
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
```

## How web and mobile resume the same session

Upon clicking a listing a checkout session is created. The session contains a unique id that can be used to resume. Simply navigate to `/checkout/{sessionId}`.

## How you handle stale inventory, price changes, or duplicate completion

Upon checkout page load, we fetch the session given as a url param. With the session, we have access to the event and the selected listing. If the session is no longer valid, the listing no longer has available seats, or the listing has had a price increase or decrease, we alert the user. Upon completing the checkout, we delete the session from the database. This, combined with a session check upon attempting to purchase allows us to avoid duplicate completion.

## What tradeoffs you made

I went back and forth between performing logic checks on checkout load vs subscribing to changes via websockets for real-time updates on ticket availability, pricing changes, etc. In the end, I went with logic checks on load and on attempt to purchase in order to keep (theoretical) costs down and the development simpler.

## What you'd do differently with more time

If I had more time I would explore the real-time listing subscriptions.

## Other files to look at

`/ASSUMPTIONS.md`