import React, { useState } from "react";
import { useStyles } from "./style";
import SidebarItem from "../atoms/sidebar-item";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";

import {
  EmojiObjectsOutlined,
  BookmarkBorderOutlined,
  SaveAltOutlined,
  DeleteOutlineOutlined,
} from "@material-ui/icons";
const Sidebar = () => {
  const classes = useStyles();

  const initialState = [
    { id: "1", isActive: true, Icon: EmojiObjectsOutlined, text: "Notes" },
    {
      id: "2",
      isActive: false,
      Icon: BookmarkBorderOutlined,
      text: "Bookmarks",
    },
    { id: "3", isActive: false, Icon: SaveAltOutlined, text: "Label" },
    { id: "4", isActive: false, Icon: DeleteOutlineOutlined, text: "Bin" },
  ];

  const [sidebarItems, setsidebarItems] = useState(initialState);

  const selectSidebarItem = (item) => {
    const newState = sidebarItems.map((obj) =>
      obj.id === item.id
        ? { ...obj, isActive: true }
        : { ...obj, isActive: false }
    );
    setsidebarItems(newState);
  };

  return (
    <div className={classes.container}>
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.id}
          onClick={() => selectSidebarItem(item)}
          text={item.text}
          icon={item.Icon}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
};

export default Sidebar;
