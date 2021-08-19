import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA8Fdgk5sy0PHQ7NsParGbG1mPtp-eRtME',
  authDomain: 'crwn-db-977ec.firebaseapp.com',
  projectId: 'crwn-db-977ec',
  storageBucket: 'crwn-db-977ec.appspot.com',
  messagingSenderId: '390141894812',
  appId: '1:390141894812:web:4b6a582d26815ff67ccd59',
  measurementId: 'G-7JJFS6F718',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
