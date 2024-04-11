// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCazrRH_w0LnlWLDdajRTypGZOEo-tN7k8",
  authDomain: "restaurantmanagementsyst-f017c.firebaseapp.com",
  projectId: "restaurantmanagementsyst-f017c",
  storageBucket: "restaurantmanagementsyst-f017c.appspot.com",
  messagingSenderId: "1074032920342",
  appId: "1:1074032920342:web:e3e4228e5bfebc99e2b237",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
