import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  colorPicker: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(10),
    maxWidth: theme.spacing(20),
    display: "flex",
    flexWrap: "wrap",
  },
  colorItem: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    margin: theme.spacing(0.4),
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "#fff000",
    zIndex: 10,
  },
  paper: {
    position: "relative",
    maxWidth: "50%",
    minWidth: "400px",
    flex: 1,
    padding: theme.spacing(1, 1),
    display: "flex",
    flexDirection: "column",
    width: 400,
    borderRadius: 8,
    border: (_) =>
      _.err
        ? _.type === "success"
          ? "2px solid green"
          : "2px solid red"
        : "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  bottomBtns: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px",
  },
  icon: {
    marginRight: "12px",
  },
}));
