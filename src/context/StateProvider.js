import React, { useContext, useState, useEffect } from "react";
import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  collection,
  setDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { toDate } from "../helperFunctions";
import { db, auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "@firebase/auth";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import { sideBarInitials } from "./data";
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
  const [tagList, setTagList] = useState([]);
  const [sidebarItems, setsidebarItems] = useState(sideBarInitials);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState({});
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [editNote, setEditNote] = useState({
    open: false,
    data: {},
  });

  useEffect(() => {
    setLoading(true);
    const notesRef = collection(db, path);
    const unsub = onSnapshot(notesRef, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({
          ...doc.data(),
          id: doc.id,
          createdAt: toDate(doc.data().createdAt),
        });
      });

      const tags = [
        ...new Set(notesData.reduce((rls, crt) => [...rls, ...crt.tags], [])),
      ];
      const tagList = tags.map((tag) => ({
        id: Math.random().toString(16).slice(2),
        text: tag,
        isActive: false,
        Icon: LabelOutlinedIcon,
      }));
      setsidebarItems([...sidebarItems, ...tagList]);
      setNotes(notesData);
      setfilteredNotes(notesData);
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser, path]);

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
    }
  };

  const updateDocbyId = async (data) => {
    if (data) {
      try {
        await updateDoc(doc(db, path, data.id), data);
        console.log("update success");
        showAlert({
          open: true,
          message: "Update Success",
          type: "success",
        });
        setEditNote({
          open: false,
          data: {},
        });
      } catch (error) {
        console.log("[context/StateProvider.js:119] ---> error", error);
        showAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  };

  const deleteNotebyId = async (id) => {
    console.log("[context/StateProvider.js:59] ---> id", id);
    if (id) {
      await deleteDoc(doc(db, path, id));
    }
  };

  const selectSidebarItem = (item) => {
    setSelectedSidebarItem(item);
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
    editNote,
    setEditNote,
    updateDocbyId,
    tagList,
    sidebarItems,
    selectedSidebarItem,
    selectSidebarItem,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
