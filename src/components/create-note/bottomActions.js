import React, { useState } from "react";
import {
  AddAlertOutlined,
  PersonAddOutlined,
  ImageOutlined,
  ArchiveOutlined,
  ColorLensOutlined,
  MoreVertOutlined,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useStyles } from "./style";

const BottomActions = ({ onClick, fileSelect }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const actionIcons = [
    {
      id: "1",
      type: "NOTIFICATION",
      name: "addAlert",
      Icon: AddAlertOutlined,
    },
    {
      id: "2",
      type: "PERSON",
      name: "Person",
      Icon: PersonAddOutlined,
    },
    {
      id: "3",
      type: "FILE",
      name: "imagePicker",
      Icon: ImageOutlined,
    },
    {
      id: "4",
      type: "ARCHIVE",
      name: "archive",
      Icon: ArchiveOutlined,
    },
    {
      id: "5",
      type: "COLOR",
      name: "colorPicker",
      Icon: ColorLensOutlined,
    },
    {
      id: "6",
      type: "MORE",
      name: "more",
      Icon: MoreVertOutlined,
    },
  ];

  return (
    <>
      {actionIcons.map(({ Icon, type }, index) => (
        <IconButton
          key={index}
          size="small"
          aria-label="menu"
          onClick={() => onClick({ type, selectedFile })}
          className={classes.icon}
        >
          {/* <Icon fontSize="small" /> */}
          {renderIcon(type, fileSelect)}
        </IconButton>
      ))}
    </>
  );
};

export default BottomActions;

const renderIcon = (type, fileSelect) => {
  switch (type) {
    case "NOTIFICATION":
      return <AddAlertOutlined fontSize="small" />;
    case "PERSON":
      return <PersonAddOutlined fontSize="small" />;
    case "FILE":
      return (
        <>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => fileSelect(e.target.files[0])}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              aria-label="upload picture"
              component="span"
              size="small"
            >
              <ImageOutlined fontSize="small" />
            </IconButton>
          </label>
        </>
      );
    case "ARCHIVE":
      return <ArchiveOutlined fontSize="small" />;
    case "COLOR":
      return <ColorLensOutlined fontSize="small" />;
    case "MORE":
      return <MoreVertOutlined fontSize="small" />;
    default:
      return <AddAlertOutlined fontSize="small" />;
  }
};
