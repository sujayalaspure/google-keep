import React, { useState } from "react";
import { Add, Delete } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

const colorArray = [
  "#001219",
  "#005f73",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];
const Simple = () => {
  const [notes, setNotes] = useState([]);
  const [singleNote, setSingleNote] = useState({
    title: "",
    content: "",
    color: "#fff",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSingleNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const addNote = () => {
    setNotes([...notes, singleNote]);
    setSingleNote({
      title: "",
      content: "",
      color: "#fff",
    });
  };

  const deleteNote = (index) => {
    setNotes((prevNotes) => prevNotes.filter((note, i) => i !== index));
  };

  return (
    <>
      <header>
        <h1>Keeper</h1>
      </header>

      <div>
        <form className="create-note">
          <input
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Title"
            value={singleNote.title}
          />
          <textarea
            onChange={handleChange}
            name="content"
            rows="3"
            placeholder="Take a note ..."
            value={singleNote.content}
          />
          <Fab onClick={addNote}>
            <Add />
          </Fab>
          {/* <div style={{ display: "flex", flexDirection: "row" }}>
            {colorArray.map((color) => (
              <div
                onClick={() => setSingleNote({ ...singleNote, color })}
                style={{
                  backgroundColor: color,
                  height: 16,
                  width: 16,
                  borderRadius: singleNote.color == color ? 0 : 8,
                  margin: "0 4px",
                }}
              />
            ))}
          </div> */}
        </form>
      </div>

      {notes.map((note, index) => (
        <div
          className="note"
          style={{ backgroundColor: note.color }}
          key={index}
        >
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(index)}>
            <Delete />
          </button>
        </div>
      ))}
      <div style={{ backgroundColor: "#e9d8a6" }} className="note">
        <h1>Note Tiele</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nulla
          porr.
        </p>
        <button>
          <Delete />
        </button>
      </div>

      <footer>
        <p>Copyright &copy; {new Date().getFullYear()} Keeper by Sujay </p>
      </footer>
    </>
  );
};

export default Simple;
