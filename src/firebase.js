import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

import { toDate } from "./helperFunctions";

import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq7pOWGXxtQdQfZMj2oOKWQlXe9MvLnJ8",
  authDomain: "clone-project-sujay.firebaseapp.com",
  projectId: "clone-project-sujay",
  storageBucket: "clone-project-sujay.appspot.com",
  messagingSenderId: "419718453701",
  appId: "1:419718453701:web:513af44e87860a5e9153ac",
  measurementId: "G-E9WTEYJ187",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const notesRef = collection(db, "notes");

export const getNotes = async () => {
  const notesSnapshot = await getDocs(notesRef);
  const notesData = notesSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: toDate(doc.data().createdAt),
  }));
  return notesData;
};

export const addNote = async (note) => {
  if (note) {
    await addDoc(notesRef, note);
  }
};

export const deleteNote = async (id) => {
  if (id) {
    await deleteDoc(doc(db, "notes", id));
  }
};
export default app;
export { db, Timestamp, provider };
