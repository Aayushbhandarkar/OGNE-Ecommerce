import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "e-commerce-d12ce.firebaseapp.com",
  projectId: "e-commerce-d12ce",
  storageBucket:  "e-commerce-d12ce.firebasestorage.app",
  messagingSenderId: "557351426143",
  appId: "1:557351426143:web:848ffdbc4cd3cf733d23ea"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

