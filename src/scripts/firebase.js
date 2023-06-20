// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as refDB } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAioXDT2l4i95yeF0UPT16OAWOEC5DR3L8",
  authDomain: "listillo-openai-sasa.firebaseapp.com",
  databaseURL: "https://listillo-openai-sasa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "listillo-openai-sasa",
  storageBucket: "listillo-openai-sasa.appspot.com",
  messagingSenderId: "811871909330",
  appId: "1:811871909330:web:02521b15689b147e4f040b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);
export const conversacionesRef = refDB(db, "conversaciones");

// Config firebase authenticacion
export const auth = getAuth(app);