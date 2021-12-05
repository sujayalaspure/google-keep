import { Container, Divider, Grid } from "@material-ui/core";
import React from "react";
import CustomCard from "../atoms/custom-card";
import CreateNote from "../create-note";
import { useStyles } from "./style";
import { db, getNotes, addNote, deleteNote } from "../../firebase";

const MainContent = ({
  alert,
  setfilteredNotes,
  setalert,
  notes,
  setNotes,
}) => {
  const classes = useStyles();

  const createNote = async (note) => {
    await addNote(note);
    getNotes().then((notes) => {
      setNotes(notes);

      setfilteredNotes(notes);
    });
  };

  const deleteNotebyId = async (id) => {
    await deleteNote(id);
    getNotes().then((notes) => {
      setNotes(notes);

      setfilteredNotes(notes);
    });
  };

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
        {notes.map((note) => (
          <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
            <CustomCard
              deleteNotebyId={deleteNotebyId}
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
