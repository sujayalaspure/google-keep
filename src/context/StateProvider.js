import React, { useContext, useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  collection,
  setDoc,
} from "firebase/firestore/lite";
import { toDate } from "../helperFunctions";
import { db, auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "@firebase/auth";
// @ts-ignore
const StateContext = React.createContext();

export function useStateValue() {
  return useContext(StateContext);
}

const StateProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [path, setPath] = useState("notes/notes/dummy");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (currentUser) {
      getNotes();
    }
  }, [currentUser]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);
      console.log("[context/StateProvider.js:43] ---> user", user);
      setPath(`notes/notes/${user.uid}`);
      await setDoc(doc(db, `notes/notes/${user.uid}`, "userProfile"), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      showAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const searchNotes = (text) => {
    if (text) {
      setfilteredNotes(notes.filter((note) => note.title.match(text)));
    } else {
      setfilteredNotes(notes);
    }
  };

  const getNotes = async () => {
    setLoading(true);
    const notesRef = collection(db, path);
    const notesSnapshot = await getDocs(notesRef);
    const notesData = notesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: toDate(doc.data().createdAt),
    }));
    setNotes(notesData);
    setfilteredNotes(notesData);
    setLoading(false);
    return notesData;
  };

  const addNote = async (note) => {
    if (note) {
      const notesRef = collection(db, path);
      await addDoc(notesRef, note);
      getNotes();
    }
  };

  const deleteNotebyId = async (id) => {
    console.log("[context/StateProvider.js:59] ---> id", id);
    if (id) {
      await deleteDoc(doc(db, path, id));
      await getNotes();
    }
  };

  const showAlert = ({ open, message, type = "success" }) => {
    setAlert({
      open,
      message,
      type,
    });
    setTimeout(() => {
      setAlert({
        open: false,
        message: "",
        type: "success",
      });
    }, 2000);
  };
  const value = {
    currentUser,
    notes,
    filteredNotes,
    loading,
    getNotes,
    addNote,
    deleteNotebyId,
    setfilteredNotes,
    searchNotes,
    handleSignIn,
    showAlert,
    alert,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
