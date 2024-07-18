// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMxCVNfvzO-ISHXVmo82NY0a8b6WsgzcM",
  authDomain: "mern-job-portal-f57a6.firebaseapp.com",
  projectId: "mern-job-portal-f57a6",
  storageBucket: "mern-job-portal-f57a6.appspot.com",
  messagingSenderId: "334759023636",
  appId: "1:334759023636:web:8162e43876954276e04301",
  measurementId: "G-7PH348FVP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;