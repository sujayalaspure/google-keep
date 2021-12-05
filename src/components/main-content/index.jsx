import { Container, Divider, Grid } from "@material-ui/core";
import React from "react";
import CustomCard from "../atoms/custom-card";
import CreateNote from "../create-note";
import { useStyles } from "./style";
import { useStateValue } from "../../context/StateProvider";

const MainContent = () => {
  const classes = useStyles();

  const { addNote, filteredNotes, showAlert } = useStateValue();

  const createNote = async (note) => {
    await addNote(note);
    showAlert({
      open: true,
      message: "Success",
      type: "success",
    });
  };

  return (
    <Container className={classes.container}>
      <CreateNote {...{ createNote }} />
      <br />
      <Divider />
      <br />
      <Grid container spacing={2}>
        {filteredNotes.map((note) => (
          <Grid key={note.id} item xs={12} sm={6} md={4} lg={3}>
            <CustomCard {...note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainContent;
