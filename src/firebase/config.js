

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";   // ← add later if using images

const firebaseConfig = {
    apiKey: "AIzaSyBtwPxCFHM31A9heuDq_YgIofHa7RVWNK0",
    authDomain: "cam-catalog-2026.firebaseapp.com",
    projectId: "cam-catalog-2026",
    storageBucket: "cam-catalog-2026.firebasestorage.app",
    messagingSenderId: "266887831282",
    appId: "1:266887831282:web:9b3013da95af5ea5a97a6b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
// export const storage = getStorage(app);