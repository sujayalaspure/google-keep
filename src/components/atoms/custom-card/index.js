import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStateValue } from "../../../context/StateProvider";
import { useStyles } from "./style";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
const CustomCard = ({ title, description, createdAt, id, color, tags }) => {
  const classes = useStyles();

  const { deleteNotebyId, setEditNote } = useStateValue();

  const handleDelete = async () => {
    await deleteNotebyId(id);
  };

  return (
    <Card style={{ backgroundColor: color }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom variant="caption">
          {createdAt || "02 Dec, 05:58 PM"}
        </Typography>
        <Typography variant="h5" component="h2">
          {title || "This is a default title"}
        </Typography>

        <Typography variant="body2" component="p">
          {description || "This is a description"}
        </Typography>
        {/* <Divider /> */}
        <div className={classes.tagList}>
          {tags?.map((tag) => (
            <div className={classes.tag}>{tag}</div>
          ))}
        </div>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          size="small"
          aria-label="menu"
          onClick={() =>
            setEditNote({
              open: true,
              data: { title, description, createdAt, id, color, tags },
            })
          }
          className={classes.icon}
        >
          <BorderColorOutlinedIcon fontSize="small" />
        </IconButton>
        <Button onClick={handleDelete} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
