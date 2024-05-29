import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD8sGocqX9wXNrWlsF59_DdtAjL6rxoR4s",
  authDomain: "react-35761.firebaseapp.com",
  projectId: "react-35761",
  storageBucket: "react-35761.appspot.com",
  messagingSenderId: "739089196670",
  appId: "1:739089196670:web:b8aeab5d53d88c870d9a2f"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db};
export {auth};