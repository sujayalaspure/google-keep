import React from "react";
import useStyles from "./style";

const Image = ({ item }) => {
  const classes = useStyles();
  return (
    <div className={classes.img}>
      <img
        src={`https://source.unsplash.com/random/${item}`}
        height={100}
        alt=""
      />
    </div>
  );
};

export default Image;
