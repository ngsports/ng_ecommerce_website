/* ==========================================
   NG SPORTS - Firebase Configuration
   Version: 11.9.1
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/* ==========================================
   Firebase Config
========================================== */

const firebaseConfig = {

    apiKey: "AIzaSyCJXu5vXcNBU7cPB8yGG7kFLtYmStJQxbI",

    authDomain: "ngsports08.firebaseapp.com",

    projectId: "ngsports08",

    storageBucket: "ngsports08.firebasestorage.app",

    messagingSenderId: "275544256602",

    appId: "1:275544256602:web:d62a5330382480f8e5a863"

};

/* ==========================================
   Initialize Firebase
========================================== */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* ==========================================
   Export Firebase
========================================== */

export {
    db,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc
};