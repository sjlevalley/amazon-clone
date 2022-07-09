import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyD_vFoF3bcJNqbqzUEpuOTPFzNgyHhCwsM',
  authDomain: 'clone-c04a7.firebaseapp.com',
  projectId: 'clone-c04a7',
  storageBucket: 'clone-c04a7.appspot.com',
  messagingSenderId: '408653519747',
  appId: '1:408653519747:web:314aeeedfc88ad2ce7f4b6'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

const auth = getAuth()


export { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword }