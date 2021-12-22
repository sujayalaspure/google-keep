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
  query,
  where,
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
  const [sidebarItems, setsidebarItems] = useState(sideBarInitials);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState({});
  const [isMobile, setIsMobile] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [openSidebar, setOpenSidebar] = useState(true);

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
          tags: [],
          ...doc.data(),
          id: doc.id,
          createdAt: toDate(doc.data().createdAt),
        });
      });

      const tags = [
        ...new Set(notesData.reduce((rls, crt) => [...rls, ...crt.tags], [])),
      ];

      console.log(tags);
      const tagList = tags.map((tag) => ({
        id: Math.random().toString(16).slice(2),
        text: tag,
        isActive: false,
        Icon: LabelOutlinedIcon,
        isTag: true,
      }));
      setsidebarItems([...sidebarItems, ...tagList]);
      setNotes(notesData);
      setfilteredNotes(notesData);
      setLoading(false);
    });
    // queryFirestore();

    return () => unsub();
  }, [currentUser, path]);

  const queryFirestore = async () => {
    console.log("hello");
    const notesRef = collection(db, path);
    const q = query(notesRef, where("tags", "array-contains", "hey"));
    console.log("LOG> [context/StateProvider.js:82] q --->", q);
    const querySnapshot = await getDocs(q);
    let notesData = [];
    querySnapshot.forEach((doc) => {
      notesData.push({
        ...doc.data(),
        id: doc.id,
        createdAt: toDate(doc.data().createdAt),
      });
    });
  };

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
        setEditNote({
          open: false,
          data: {},
        });
        await updateDoc(doc(db, path, data.id), data);
        console.log("update success");
        showAlert({
          open: true,
          message: "Update Success",
          type: "success",
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
    if (id) {
      await deleteDoc(doc(db, path, id));
    }
  };

  const selectSidebarItem = (item) => {
    setSelectedSidebarItem(item);
    if (item.isTag) {
      const filteredNotes = notes.filter((note) =>
        note.tags.includes(item.text)
      );
      setfilteredNotes(filteredNotes);
    } else {
      setfilteredNotes(notes);
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

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

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
    sidebarItems,
    selectedSidebarItem,
    selectSidebarItem,
    queryFirestore,
    openSidebar,
    setOpenSidebar,
    isMobile,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
