import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    zIndex: 100,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "grid",
    placeItems: "center",

    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  toolbar: {},
}));
export default useStyles;
