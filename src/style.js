import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  container: {
    display: "grid",
    gridTemplateColumns: "300px auto",
    height: "100vh",
    padding: theme.spacing(5, 0),
  },
  alert: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(10),
  },
}));
