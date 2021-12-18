import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  container: {
    // backgroundColor: "lightgreen",
  },
  drawer: {
    // zIndex: -1,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  listItem: {
    backgroundColor: (_) => (_.isActive ? "#feefc3" : "transparent"),
    "&:hover": {
      backgroundColor: (_) => (_.isActive ? "#feefc3" : "#f1f3f4"),
    },
  },
  highLightBackground: {
    backgroundColor: "#feefc3",
    "&:hover": {
      backgroundColor: "#feefc3",
    },
  },
}));
