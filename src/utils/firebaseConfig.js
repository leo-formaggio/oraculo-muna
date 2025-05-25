import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MENSSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID
	// apiKey: "AIzaSyAFJj1JeLIE0ikDVxlU4w9motvQcCbSFcM",
	// authDomain: "oraculo-muna.firebaseapp.com",
	// projectId: "oraculo-muna",
	// storageBucket: "oraculo-muna.firebasestorage.app",
	// messagingSenderId: "659628118550",
	// appId: "1:659628118550:web:3e4a883c2ecdb8bae25b37"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app, '(default)')

export { db, collection, addDoc }