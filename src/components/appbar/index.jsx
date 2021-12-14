import {
  AppBar,
  Avatar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
  withStyles,
  CircularProgress,
} from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./style";
import {
  Brightness4Outlined as ToggleDarkModeIcon,
  Brightness5Outlined as ToggleLightModeIcon,
  Menu as MenuIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  RefreshOutlined as RefreshOutlinedIcon,
  Search as SearchIcon,
} from "@material-ui/icons";
import { useStateValue } from "../../context/StateProvider";

const CustomAppBar = ({ currentUser }) => {
  const classes = useStyles();
  const { searchNotes, loading, getNotes } = useStateValue();

  const [isDarkMode, setisDarkMode] = useState(false);
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#2e2e2e",
      color: "#dadde9",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);
  const icons = [<SettingsOutlinedIcon />];
  return (
    <AppBar position="static" className={classes.AppBar}>
      <Toolbar className={classes.toolBar}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <Typography color="textPrimary" variant="h6" className={classes.title}>
          Keep
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon color="inherit" />
          </div>
          <InputBase
            onChange={(e) => searchNotes(e.target.value)}
            placeholder="Search…"
            className={classes.inputInput}
          />
        </div>

        <div className={classes.rightIcon}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => setisDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Tooltip title="Toggle Light Mode">
                <ToggleDarkModeIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Toggle Dark Mode">
                <ToggleLightModeIcon />
              </Tooltip>
            )}
          </IconButton>

          {loading ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <CircularProgress size={24} />
            </IconButton>
          ) : (
            <IconButton
              onClick={getNotes}
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <RefreshOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <SettingsOutlinedIcon />
          </IconButton>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  {currentUser?.displayName || "name"}
                </Typography>
                <em>{currentUser?.email}</em>
              </React.Fragment>
            }
          >
            <Avatar
              alt={currentUser?.displayName || "name"}
              src={
                currentUser?.photoURL ||
                "https://cdn-icons-png.flaticon.com/512/2965/2965358.png"
              }
            />
          </HtmlTooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
