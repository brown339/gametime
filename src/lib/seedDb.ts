import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { events } from '@/app/data/events';
import { listings } from '@/app/data/listings';

export const seedDb = async () => {
  try {
    // Seed events
    for (const event of events) {
      await setDoc(doc(firestore, 'events', event.id), event);
    }

    // Seed listings for each event
    for (const listing of listings) {
      await setDoc(doc(firestore, 'listings', listing.id), listing);
    }

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};
