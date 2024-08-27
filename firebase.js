import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDz3LcAL5yaz6rRpyzMHGJgtSPqabFtBLY",
    authDomain: "schedulertest-9983e.firebaseapp.com",
    projectId: "schedulertest-9983e",
    storageBucket: "schedulertest-9983e.appspot.com",
    messagingSenderId: "134667409562",
    appId: "1:134667409562:web:154fb54505f4b979b6e723",
    measurementId: "G-B5TBVFBHS5"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, Timestamp };