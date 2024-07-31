import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8SE0SR2U1p35V3VsxQrV4y5EiHA3_x7U",
  authDomain: "umusic-2547e.firebaseapp.com",
  projectId: "umusic-2547e",
  storageBucket: "umusic-2547e.appspot.com",
  messagingSenderId: "382633480412",
  appId: "1:382633480412:web:84262a1936a1f5c37b2419",
  measurementId: "G-GW1B0QQYC6"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, analytics, googleProvider, ref, set, get, database, storage, storageRef, uploadBytes, getDownloadURL };
