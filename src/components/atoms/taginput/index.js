import { InputBase } from "@material-ui/core";
import { useState } from "react";
import useStyles from "./style";

const TagsInput = ({ selectedTags, tagList = [] }) => {
  const classes = useStyles();
  const [tags, setTags] = useState(tagList);
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  return (
    <div className={classes.tagsInput}>
      <ul id="tags" className={classes.tags}>
        {tags.map((tag, index) => (
          <li key={index} className={classes.tag}>
            <span className={classes.tagTitle}>{tag}</span>
            <span
              className={classes.tagCloseIcon}
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <InputBase
        className={classes.input}
        type="text"
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};

export default TagsInput;
