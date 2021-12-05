import { Container, Divider, Grid } from "@material-ui/core";
import React from "react";
import CustomCard from "../atoms/custom-card";
import CreateNote from "../create-note";
import { useStyles } from "./style";
import { db } from "../../firebase/firebase";
import { useStateValue } from "../../context/StateProvider";

const MainContent = ({ alert, setalert, notes }) => {
  const classes = useStyles();

  const { addNote, filteredNotes } = useStateValue();

  const createNote = async (note) => {
    await addNote(note);
  };

  // const deleteNotebyId = async (id) => {
  //   await deleteNote(id);
  // };

  return (
    <Container className={classes.container}>
      <CreateNote {...{ alert, setalert, createNote }} />
      <br />
      <Divider />
      <br />
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={6} lg={3}>
          <CustomCard deleteNotebyId={null} />
        </Grid> */}
        {filteredNotes.map((note) => (
          <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
            <CustomCard
              id={note.id}
              title={note.title}
              description={note.description}
              createdAt={note.createdAt}
              color={note?.color || "#fff"}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainContent;
