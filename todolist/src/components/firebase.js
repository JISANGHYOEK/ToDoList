import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8sGocqX9wXNrWlsF59_DdtAjL6rxoR4s",
  authDomain: "react-35761.firebaseapp.com",
  projectId: "react-35761",
  storageBucket: "react-35761.appspot.com",
  messagingSenderId: "739089196670",
  appId: "1:739089196670:web:b8aeab5d53d88c870d9a2f",
};

const app = initializeApp(firebaseConfig);

<<<<<<< HEAD
export const auth = getAuth(app);
export const db = getFirestore(app);
=======
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
export { auth };
>>>>>>> 8fc60e61ad3d00226af5681c291739d88c859e3c
