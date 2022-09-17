import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./style";

const SidebarItem = ({ isActive, text, icon: Icon, onClick }) => {
  const classes = useStyles({ isActive });

  return (
    <div className={classes.sideBarItem} onClick={onClick}>
      <Icon fontSize="medium" className={classes.icon} />
      <Typography className={classes.text}>{text}</Typography>
    </div>
  );
};

export default SidebarItem;
