import { CssBaseline } from "@material-ui/core";
import React, { useState } from "react";
import CustomAppBar from "./components/appbar";
import { useStyles } from "./style";
import MainContent from "./components/main-content";
import Sidebar from "./components/sidebar";
import Auth from "./components/auth";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { useStateValue } from "./context/StateProvider";
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
