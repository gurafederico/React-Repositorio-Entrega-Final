// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANsDu91lPFVTrmFFgsKF0rycclXVM8ei8",
  authDomain: "base-de-datos-gridiron.firebaseapp.com",
  projectId: "base-de-datos-gridiron",
  storageBucket: "base-de-datos-gridiron.firebasestorage.app",
  messagingSenderId: "99873047940",
  appId: "1:99873047940:web:141ef457f23f001ca849d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); 

/* login*/
const auth = getAuth(app);

export { db, auth };

