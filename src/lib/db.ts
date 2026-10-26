import {
  addDoc as _addDoc,
  deleteDoc as _deleteDoc,
  setDoc as _setDoc,
  updateDoc as _updateDoc,
  collection,
  doc,
  QueryConstraint,
  query,
  getDocsFromCache,
  getDocsFromServer,
  getDocFromServer,
  getDocFromCache,
} from 'firebase/firestore';
import { firestore } from './firebase';

// ==== CREATE ==== //
export const addDoc = async (collectionName: string, data: any) => {
  try {
    await _addDoc(collection(firestore, collectionName), data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setDoc = async (
  collectionName: string,
  docId: string,
  data: any,
) => {
  try {
    await _setDoc(doc(firestore, collectionName, docId), data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ==== READ ==== //
export const getDoc = async (
  collectionName: string,
  docId: string,
  forceServer: boolean = false,
) => {
  const docRef = doc(firestore, collectionName, docId);
  try {
    // Go directly to getDocFromServer()
    if (forceServer) {
      throw new Error('Forcing server fetch.');
    }

    // getDocFromCache() throws an error if not found in cache.
    const docSnapshot = await getDocFromCache(docRef);
    const response = docSnapshot.data();
    console.log(`🎉 getDocFromCache(${collectionName})`);
    return response ?? null;
  } catch (cacheError) {
    try {
      const docSnapshot = await getDocFromServer(docRef);
      const response = docSnapshot.data();
      console.log(`💰 getDocFromServer(${collectionName})`);
      return response ?? null;
    } catch (networkNotAvailableError) {
      return null;
    }
  }
};

const docsFetchedFromServer = new Set<string>();

export const getDocs = async (
  cacheKey: string,
  collectionName: string,
  forceServer: boolean = false,
  ...queryConstraints: QueryConstraint[]
) => {
  const q = query(collection(firestore, collectionName), ...queryConstraints);
  let querySnapshot, response;

  try {
    // getDocsFromCache() will incorrectly return the partial result
    // if getDocFromCache(collectionName) was called beforehand.
    // We use a cache here to ensure we always fetch from the server first.
    if (docsFetchedFromServer.has(cacheKey) && !forceServer) {
      // getDocsFromCache() returns empty array if not found in cache.
      querySnapshot = await getDocsFromCache(q);
      response = querySnapshot.docs.map((doc) => doc.data());

      if (response.length) {
        console.log(`🎉 getDocsFromCache(${collectionName})`);
        return response;
      }
    }

    // If response is empty array, try fetching from server.
    querySnapshot = await getDocsFromServer(q);
    response = querySnapshot.docs.map((doc) => doc.data());
    docsFetchedFromServer.add(cacheKey);
    console.log(`💰 getDocsFromServer(${collectionName})`);
    return response;
  } catch (networkNotAvailableError) {
    return [];
  }
};

// ==== UPDATE ==== //
export const updateDoc = async (
  collectionName: string,
  docId: string,
  data: any,
) => {
  try {
    await _updateDoc(doc(firestore, collectionName, docId), data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ==== DELETE ==== //
export const deleteDoc = async (collectionName: string, docId: string) => {
  try {
    await _deleteDoc(doc(firestore, collectionName, docId));
  } catch (error) {
    console.error(error);
    throw error;
  }
};
