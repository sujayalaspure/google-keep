import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
  },
  img: {
    margin: "2px",
  },
  imageList: {
    flexWrap: "nowrap",
    // overflowX: "scroll",
  },
}));
export default useStyles;
