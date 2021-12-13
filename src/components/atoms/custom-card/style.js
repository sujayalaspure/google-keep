import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },

  tagList: {
    display: "flex",
    marginTop: "10px",
  },
  tag: {
    margin: "0 4px",
    backgroundColor: "lightgrey",
    padding: "2px 4px",
    borderRadius: "4px",
  },
}));
