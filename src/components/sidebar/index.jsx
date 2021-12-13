import React from "react";
import { useStyles } from "./style";
import SidebarItem from "../atoms/sidebar-item";

import { useStateValue } from "../../context/StateProvider";
const Sidebar = () => {
  const classes = useStyles();
  const { sidebarItems, selectSidebarItem, selectedSidebarItem } =
    useStateValue();

  return (
    <div className={classes.container}>
      {sidebarItems.map((item, idx) => (
        <SidebarItem
          key={idx}
          onClick={() => selectSidebarItem(item)}
          text={item.text}
          icon={item.Icon}
          isActive={selectedSidebarItem.id === item.id}
        />
      ))}
    </div>
  );
};

export default Sidebar;
