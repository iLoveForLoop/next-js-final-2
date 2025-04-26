
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqxnuTu600QOd_vYTHS6rTrS9jX-R7B48",
  authDomain: "openworld-chat.firebaseapp.com",
  projectId: "openworld-chat",
  storageBucket: "openworld-chat.firebasestorage.app",
  messagingSenderId: "734958884852",
  appId: "1:734958884852:web:2627290f8e1bc70cf58ba1"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)