import React from "react";

// import { ReactComponent as Anh } from "../../assets/ImgHome/avatar.svg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TranslateIcon from "@material-ui/icons/Translate";
import StarsIcon from "@material-ui/icons/Stars";
import { useState } from "react";
import Popover from "@material-ui/core/Popover";
import MenuIcon from "@material-ui/icons/Menu";
//css
import AppBarStyles from "./AppBarStyles";
import MenuMain from "./MenuMain.js";
export default function Appbar() {
  const classes = AppBarStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className={classes.main}>
      <div className={classes.grow}>
        <AppBar
          classes={{
            root: classes.mainMenu, // class name, e.g. `classes-nesting-root-x`
          }}
          position="static"
        >
          <Toolbar>
            <div className={classes.sectionMobi}>
              <IconButton
                onClick={handleClick}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon className={classes.logo}></MenuIcon>
              </IconButton>
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              WMS.PY
            </Typography>
            <div className={classes.grow} />
            <div>
              <div className={classes.item}>
                <Avatar className={classes.green}></Avatar>
                <div className={classes.sectionDesktop}>
                  <h3>Yến</h3>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* <MenuMain></MenuMain> */}
      <Popover
        // style={{ left: "0px !important" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuMain></MenuMain>
      </Popover>
    </div>
  );
}
