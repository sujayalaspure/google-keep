import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  AppBar: {
    backgroundColor: "#fff",
  },
  toolBar: {
    display: "grid",
    gridTemplateColumns: "50px 150px auto max-content",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    // position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "gray",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0, 4),
    backgroundColor: "rgba(0,0,0,.1)",
    maxWidth: "60%",
    alignSelf: "center",
  },
  inputInput: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
}));
