import { doc, updateDoc, arrayUnion, getDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { firestore } from '../../config/firebaseConfig';

export const submitPriceUpdate = async (pubId, userId, newPrice) => {
  const pubRef = doc(firestore, "pubs", pubId);
  const pubDoc = await getDoc(pubRef);

  if (pubDoc.exists()) {
    await updateDoc(pubRef, {
      price_updates: arrayUnion({
        user_id: userId,
        price: `£${newPrice.toFixed(2)}`,
        timestamp: serverTimestamp(), // Use serverTimestamp for accurate time
      }),
    });
  } else {
    console.error("Pub not found!");
  }
};

export const checkForMatchingPrices = async (pubId) => {
  const pubRef = doc(firestore, "pubs", pubId);
  const pubDoc = await getDoc(pubRef);

  if (pubDoc.exists()) {
    const priceUpdates = pubDoc.data().price_updates;

    // Count occurrences of each price
    const priceMap = priceUpdates.reduce((acc, update) => {
      acc[update.price] = acc[update.price] ? acc[update.price] + 1 : 1;
      return acc;
    }, {});

    // Check for matching prices from two different users
    for (const price in priceMap) {
      if (priceMap[price] >= 2) {
        await updateDoc(pubRef, {
          pint_price: price,
          price_updates: [], // Clear the updates after a match
        });
        console.log(`Price updated to ${price}`);
        break;
      }
    }
  } else {
    console.error("Pub not found!");
  }
};

export const discardOutdatedPrices = async (pubId) => {
  const pubRef = doc(firestore, "pubs", pubId);
  const pubDoc = await getDoc(pubRef);

  if (pubDoc.exists()) {
    const priceUpdates = pubDoc.data().price_updates;
    const fourWeeksAgo = Timestamp.now().toMillis() - (28 * 24 * 60 * 60 * 1000); // Calculate timestamp for 4 weeks ago

    // Filter out updates older than four weeks
    const recentUpdates = priceUpdates.filter(update => {
      return update.timestamp.toMillis() >= fourWeeksAgo;
    });

    await updateDoc(pubRef, {
      price_updates: recentUpdates, // Only keep recent updates
    });

    console.log("Outdated prices discarded");
  } else {
    console.error("Pub not found!");
  }
};