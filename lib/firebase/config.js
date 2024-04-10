// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVeAYqhUQr_WxlDijs7leFzl-PbmfHXAw",
  authDomain: "metri-web.firebaseapp.com",
  projectId: "metri-web",
  storageBucket: "metri-web.appspot.com",
  messagingSenderId: "368691551575",
  appId: "1:368691551575:web:0643188edbb1b6f6b9b212",
  measurementId: "G-J39CN8X5SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // User is signed in
    console.log('User is signed in')
  } catch (error) {
    console.error(error);
    // Handle Errors here.
  }
};

export const register = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // User is registered
    console.log('User is registered')
  } catch (error) {
    console.error(error);
    // Handle Errors here.
  }
};