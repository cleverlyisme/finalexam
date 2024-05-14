// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGBwKqp4EMlVD6km2jeuzLQFVakspql8o",
  authDomain: "tomi-541b0.firebaseapp.com",
  projectId: "tomi-541b0",
  storageBucket: "tomi-541b0.appspot.com",
  messagingSenderId: "642237580442",
  appId: "1:642237580442:web:815fdd4242e997c17d8b23",
  measurementId: "G-YEPLQ3NBH0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
