import { CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomAppBar from "./components/appbar";
import { useStyles } from "./style";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";
import Auth from "./components/auth";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { getNotes } from "./firebase";
const App = () => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setfilteredNotes] = useState([]);
  const [alert, setalert] = useState({
    open: false,
    message: "",
  });
  useEffect(() => {
    getNotes().then((notes) => {
      setNotes(notes);
      setfilteredNotes(notes);
    });
  }, []);
  const searchNotes = (text) => {
    if (text) {
      setfilteredNotes(notes.filter((note) => note.title.match(text)));
    } else {
      setfilteredNotes(notes);
    }
  };

  return (
    <>
      <CssBaseline />
      <Slide direction="right" in={alert.open} mountOnEnter unmountOnExit>
        <Alert
          variant="outlined"
          onClose={() =>
            setalert({
              open: false,
              message: "",
            })
          }
          className={classes.alert}
          severity="error"
        >
          {alert.message || "Something went right"}
        </Alert>
      </Slide>

      {currentUser ? (
        <>
          <CustomAppBar {...{ notes, currentUser, searchNotes }} />

          <div className={classes.container}>
            <Sidebar />
            <MainContent
              notes={filteredNotes}
              {...{ alert, setNotes, setfilteredNotes, setalert }}
            />
          </div>
        </>
      ) : (
        <Auth setCurrentUser={setCurrentUser} />
      )}
    </>
  );
};

export default App;
