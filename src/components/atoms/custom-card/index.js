import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./style";

const CustomCard = ({
  title,
  description,
  createdAt,
  id,
  color,
  deleteNotebyId,
}) => {
  const classes = useStyles();

  const handleDelete = () => {
    deleteNotebyId(id);
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
      </CardContent>
      <CardActions>
        <Button onClick={handleDelete} size="small">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
