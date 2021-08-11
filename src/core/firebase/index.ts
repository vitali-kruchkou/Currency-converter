/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/firestore';
import '@firebase/database';
import config from './firebaseConfig';
import { UserProps } from '@type/types';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
const storage = firebaseApp.storage();
export const storageRef = storage.ref();
export const database = firebaseApp.database();

export const generateUserDocument = async (user: {
  email: string;
  displayName: string;
  photoURL: string;
  uid: string;
}): Promise<{ uid: string }> => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const addCurrencyList = (currency: string[], user: UserProps): void => {
  firestore.collection('currency').doc(user.uid).set({
    currency: currency,
  });
};

export const getCurrencyList = (userUid: string) => {
  return firestore
    .collection('currency')
    .doc(userUid)
    .get()
    .then(doc => {
      if (doc.exists) {
        return Array.from(new Set(doc.data().currency));
      }
    });
};
