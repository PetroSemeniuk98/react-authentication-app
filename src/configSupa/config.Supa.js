import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIbr1mDNqvIY92cDnVOjZSviSTYicRUb4",
  authDomain: "react-user-auth-ec351.firebaseapp.com",
  projectId: "react-user-auth-ec351",
  storageBucket: "react-user-auth-ec351.appspot.com",
  messagingSenderId: "576095728176",
  appId: "1:576095728176:web:934cd7e0afc4ead09ef3f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
