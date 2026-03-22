// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-UZnNCpRKNIBsFyxOqIGiO82nuKkw9uw",
  authDomain: "sana-portfolio-4d1ed.firebaseapp.com",
  projectId: "sana-portfolio-4d1ed",
  storageBucket: "sana-portfolio-4d1ed.firebasestorage.app",
  messagingSenderId: "757841948689",
  appId: "1:757841948689:web:977a46c02c51cd63a841b0"
};

export const isConfigured = !!firebaseConfig.apiKey;

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// // Firebase configuration placeholder
// // Replace with your Firebase project credentials

// import { initializeApp, FirebaseApp } from "firebase/app";
// import { getAuth, Auth } from "firebase/auth";
// import { getFirestore, Firestore } from "firebase/firestore";

// // TODO: Replace with your Firebase config
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
//   appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
// };

// let app: FirebaseApp;
// let auth: Auth;
// let db: Firestore;

// // Only initialize if we have a real config
// const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

// if (isConfigured) {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
//   db = getFirestore(app);
// }

// export { app, auth, db, isConfigured };

// // Firestore collection names
// export const COLLECTIONS = {
//   media: "media",
//   journey: "journey",
//   projects: "projects",
//   blogs: "blogs",
//   settings: "settings",
// } as const;

// // Types for Firestore documents
// export interface MediaDocument {
//   id: string;
//   url: string;
//   type: "photo" | "video";
//   category: string;
//   caption: { en: string; ja: string };
//   thumbnailUrl?: string;
//   createdAt: Date;
//   order?: number;
// }

// export interface JourneyDocument {
//   id: string;
//   date: string;
//   title: { en: string; ja: string };
//   content: { en: string; ja: string };
//   mediaUrl?: string;
//   createdAt: Date;
// }

// export interface ProjectDocument {
//   id: string;
//   title: { en: string; ja: string };
//   description: { en: string; ja: string };
//   imageUrl: string;
//   link?: string;
//   tags: string[];
//   createdAt: Date;
//   order?: number;
// }

// export interface BlogDocument {
//   id: string;
//   title: { en: string; ja: string };
//   content: { en: string; ja: string };
//   excerpt: { en: string; ja: string };
//   coverUrl?: string;
//   publishedAt: Date;
//   isPublished: boolean;
// }
