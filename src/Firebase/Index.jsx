import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "reactjsfirebase-be923.firebaseapp.com",
  databaseURL: "https://reactjsfirebase-be923-default-rtdb.firebaseio.com",
  projectId: "reactjsfirebase-be923",
  storageBucket: "reactjsfirebase-be923.firebasestorage.app",
  messagingSenderId: "411942484884",
  appId: "1:411942484884:web:96bdf62a8c51765372ed81",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
