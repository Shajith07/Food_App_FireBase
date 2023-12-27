import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBbl28CP-jzaqJL1bo0vtdVR55jPXPsudA",
  authDomain: "movie-app-49668.firebaseapp.com",
  projectId: "movie-app-49668",
  storageBucket: "movie-app-49668.appspot.com",
  messagingSenderId: "595510349292",
  appId: "1:595510349292:web:0d329470b0656267b804c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;

export const auth =getAuth();