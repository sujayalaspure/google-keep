import {
  EmojiObjectsOutlined,
  BookmarkBorderOutlined,
  SaveAltOutlined,
  DeleteOutlineOutlined,
  LabelOutlined,
} from "@material-ui/icons";
export const sideBarInitials = [
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
