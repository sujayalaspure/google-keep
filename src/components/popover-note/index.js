import { Fade } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../context/StateProvider";
import CreateNote from "../create-note";
import useStyles from "./style";

const PopOverNote = ({ editNote, setEditNote }) => {
  const classes = useStyles();
  const { updateDocbyId } = useStateValue();

  const updateNote = async (note) => {
    setEditNote({
      open: false,
      data: {},
    });
    await updateDocbyId(note);
  };

  const handleClick = (e) => {
    if (e.target.id === "popover-note") {
      setEditNote({
        open: false,
        data: {},
      });
    }
  };
  return (
    <div id="popover-note" className={classes.container} onClick={handleClick}>
      <CreateNote inputProp={editNote.data} createNote={updateNote} />
    </div>
  );
};

export default PopOverNote;
