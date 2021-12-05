import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  sideBarItem: {
    display: "flex",
    padding: theme.spacing(1.2, 3),
    alignItems: "center",
    backgroundColor: (_) => (_.isActive ? "#feefc3" : "transparent"),
    borderTopRightRadius: theme.spacing(6),
    borderBottomRightRadius: theme.spacing(6),
    cursor: "pointer",
    "&:hover": {
      backgroundColor: (_) => (_.isActive ? "#feefc3" : "#f1f3f4"),
    },
  },

  icon: {
    marginRight: theme.spacing(2),
    color: "#161616",
  },
  text: {
    fontWeight: 600,
    color: "#161616",
  },
}));
