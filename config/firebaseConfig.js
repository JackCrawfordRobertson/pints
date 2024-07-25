// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5e5dgpcw5RpV3M8JsSLMCLAOZ4SsnE6c",
  authDomain: "pints-a2c0e.firebaseapp.com",
  projectId: "pints-a2c0e",
  storageBucket: "pints-a2c0e.appspot.com",
  messagingSenderId: "331435425657",
  appId: "1:331435425657:web:d75dd8a125d31dd5faf9a8",
  measurementId: "G-BSCKPJ5RXG"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
