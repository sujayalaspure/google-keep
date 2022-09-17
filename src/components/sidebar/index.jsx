import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import clsx from "clsx";

import { useStateValue } from "../../context/StateProvider";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
const Sidebar = () => {
  const classes = useStyles();
  const {
    sidebarItems,
    selectSidebarItem,
    selectedSidebarItem,
    openSidebar,
    setOpenSidebar,
  } = useStateValue();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth <= 768);
    console.log(window.innerWidth);
    if (window.innerWidth <= 768) {
      console.log("mobile");
      setOpenSidebar(false);
    } else {
      console.log("desktop");
      setOpenSidebar(true);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <Drawer
      elevation={1}
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: openSidebar,
        [classes.drawerClose]: !openSidebar,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: openSidebar,
          [classes.drawerClose]: !openSidebar,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton></IconButton>
      </div>
      {/* {sidebarItems.map((item, idx) => (
        <SidebarItem
          key={idx}
          onClick={() => selectSidebarItem(item)}
          text={item.text}
          icon={item.Icon}
          isActive={selectedSidebarItem.id === item.id}
        />
      ))} */}
      <List>
        {sidebarItems.map((item, index) => {
          const { text, Icon } = item;
          return (
            <ListItem
              className={clsx({
                [classes.highLightBackground]:
                  selectedSidebarItem.id === item.id,
              })}
              button
              key={index}
              onClick={() => selectSidebarItem(item)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
