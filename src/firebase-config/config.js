// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHIZe_PY44Pm4ry41JW8R8XeaUsVBLtgw",
  authDomain: "scenic-homes.firebaseapp.com",
  projectId: "scenic-homes",
  storageBucket: "scenic-homes.appspot.com",
  messagingSenderId: "886891486193",
  appId: "1:886891486193:web:ee62915d439a20cbfa8250"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export firestore data base
export const db = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
export const auth = getAuth(app);