import {
  Button,
  Collapse,
  Fade,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { Timestamp } from "../../firebase/firebase";

import {
  AddAlertOutlined,
  PersonAddOutlined,
  ImageOutlined,
  ArchiveOutlined,
  ColorLensOutlined,
  MoreVertOutlined,
} from "@material-ui/icons";
import { useStateValue } from "../../context/StateProvider";
import TagsInput from "../atoms/taginput";

const CreateNote = ({ createNote, inputProp }) => {
  const { alert, showAlert } = useStateValue();

  const classes = useStyles({ err: alert.open, type: alert.type });

  const [expand, setExpand] = useState(false);

  const [openColor, setOpenColor] = useState(false);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    color: "#fff",
    tags: [],
  });

  const actionIcons = [
    { name: "addAlert", Icon: AddAlertOutlined, onClick: null },
    { name: "Person", Icon: PersonAddOutlined, onClick: null },
    { name: "imagePicker", Icon: ImageOutlined, onClick: null },
    { name: "archive", Icon: ArchiveOutlined, onClick: null },
    {
      name: "colorPicker",
      Icon: ColorLensOutlined,
      onClick: () => setOpenColor(!openColor),
    },
    { name: "more", Icon: MoreVertOutlined, onClick: null },
  ];

  useEffect(() => {
    if (inputProp) {
      setInput({
        id: inputProp.id,
        title: inputProp.title,
        description: inputProp.description,
        color: inputProp.color,
      });
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = () => {
    if (input.title.trim() === "" || input.description.trim() === "") {
      showAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
    } else {
      const createdAt = Timestamp.now();
      createNote({ ...input, createdAt });

      setInput({
        title: "",
        description: "",
        color: "#fff",
        tags: [],
      });
      setTags([]);
    }
  };

  const colorArray = [
    "#f15bb5",
    "#fee440",
    "#00bbf9",
    "#00f5d4",
    "#83c5be",
    "#edf6f9",
    "#ffddd2",
    "#e29578",
    "#ffffff",
  ];

  const selectedTags = (tags) => {
    console.log(tags);
    setInput((prevValue) => ({ ...prevValue, tags }));
  };

  return (
    <div className={classes.container}>
      <Paper
        elevation={5}
        className={classes.paper}
        style={{ backgroundColor: input.color }}
      >
        <Fade in={openColor} transition={200}>
          <Paper className={classes.colorPicker}>
            {colorArray.map((color, index) => (
              <div
                onClick={() => {
                  setInput({ ...input, color: color });
                  setOpenColor(false);
                }}
                key={index}
                className={classes.colorItem}
                style={{
                  backgroundColor: color,
                  border: color === "#ffffff" ? "1px solid black" : "none",
                }}
              />
            ))}
          </Paper>
        </Fade>
        <InputBase
          value={input.title}
          className={classes.input}
          placeholder="Title..."
          onChange={handleChange}
          name="title"
          onFocus={() => setExpand(true)}
          // onBlur={() => setExpand(false)}
        />

        <Collapse in={expand}>
          <InputBase
            value={input.description}
            multiline
            minRows={3}
            className={classes.input}
            placeholder="Take a Note..."
            onChange={handleChange}
            name="description"
          />
          <TagsInput selectedTags={selectedTags} {...{ tags, setTags }} />
          <div className={classes.bottomBtns}>
            <div>
              {actionIcons.map(({ Icon, onClick }, index) => (
                <IconButton
                  key={index}
                  size="small"
                  aria-label="menu"
                  onClick={onClick}
                  className={classes.icon}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </div>

            <Button onClick={handleSubmit} size="small">
              Save
            </Button>
          </div>
        </Collapse>
      </Paper>
    </div>
  );
};

export default CreateNote;
