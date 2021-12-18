import React from "react";
import Image from "./Image";
import { ImageList as MuiimageList } from "@material-ui/core";
import useStyles from "./style";

const images = [1, 2, 3, 4, 5];
const ImageList = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MuiimageList cols={2.5} className={classes.imageList}>
        {images.map((image) => (
          <Image key={image} item={image} />
        ))}
      </MuiimageList>
    </div>
  );
};

export default ImageList;
