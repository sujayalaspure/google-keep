import React, { useContext, useState, useEffect } from "react";
import { getDocs, addDoc, deleteDoc, doc } from "firebase/firestore/lite";
import { toDate } from "../helperFunctions";
import { notesRef, db, auth, provider } from "../firebase/firebase";
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

  useEffect(() => {
    getNotes();
  }, []);

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setCurrentUser(user);
      })
      .catch((error) => {
        console.log("[auth/index.js:21] ---> error", error);
      });
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
      await addDoc(notesRef, note);
      getNotes();
    }
  };

  const deleteNotebyId = async (id) => {
    console.log("[context/StateProvider.js:59] ---> id", id);
    if (id) {
      await deleteDoc(doc(db, "notes", id));
      await getNotes();
    }
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
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
