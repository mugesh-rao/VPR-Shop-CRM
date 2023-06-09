import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD0QT-wF6iOp9MK4MBC8rDGOJcrELgm-cw",
  authDomain: "vpr-admin-84ea7.firebaseapp.com",
  projectId: "vpr-admin-84ea7",
  storageBucket: "vpr-admin-84ea7.appspot.com",
  messagingSenderId: "625335494190",
  appId: "1:625335494190:web:6883e2e4681c0d0ba021bf"
};

// Use these for db & auth

firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();


