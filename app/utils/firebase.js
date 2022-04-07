import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnM0B9GL34ZyjvT2nLFtBOGHuXDJYGCy4",
  authDomain: "restaurante-f27c9.firebaseapp.com",
  projectId: "restaurante-f27c9",
  storageBucket: "restaurante-f27c9.appspot.com",
  messagingSenderId: "576204293528",
  appId: "1:576204293528:web:96a75cfa89a65ec65f57ed",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
