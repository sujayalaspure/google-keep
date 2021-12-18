import React from "react";
import Alert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";
import { useStateValue } from "../../../context/StateProvider";
const CustomAlert = () => {
  const { alert, showAlert } = useStateValue();
  return (
    <Slide
      style={{
        position: "absolute",
        right: "20px",
        bottom: "20px",
      }}
      direction="left"
      in={alert.open}
      mountOnEnter
      unmountOnExit
    >
      <Alert
        variant="outlined"
        onClose={() =>
          showAlert({
            open: false,
            message: "",
          })
        }
        severity={alert.type}
      >
        {alert.message || "Something went right"}
      </Alert>
    </Slide>
  );
};

export default CustomAlert;
