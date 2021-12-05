import { CssBaseline } from "@material-ui/core";
import React, { useState } from "react";
import CustomAppBar from "./components/appbar";
import { useStyles } from "./style";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";
import Auth from "./components/auth";

import { useStateValue } from "./context/StateProvider";
import CustomAlert from "./components/atoms/alert";
const App = () => {
  const classes = useStyles();

  const { currentUser } = useStateValue();

  const [alert, setalert] = useState({
    open: false,
    message: "",
  });

  return (
    <>
      <CssBaseline />

      <CustomAlert />

      {currentUser ? (
        <>
          <CustomAppBar {...{ currentUser }} />

          <div className={classes.container}>
            <Sidebar />
            <MainContent {...{ alert, setalert }} />
          </div>
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
