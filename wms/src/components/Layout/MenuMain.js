import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SecondNavigationStyles from "./MenuStyles";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
// export const MenuListItem = () => {};

export default function MenuMain(props) {
  const classes = SecondNavigationStyles();

  //lg
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];

  return (
    <div className={classes.secondMenu}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <p>WMS.PY</p>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <IconButton
            className={classes.subButton}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <HomeOutlinedIcon></HomeOutlinedIcon>
          </IconButton>{" "}
          {language.titleHome}
        </MenuItem>
        {props.children}
        <MenuItem className={classes.menuItem}>
          <IconButton
            className={classes.subButton}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <SettingsIcon></SettingsIcon>
          </IconButton>
          <p>cài đặt</p>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <IconButton
            className={classes.subButton}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon></ExitToAppIcon>
          </IconButton>
          <p>Đăng xuất</p>
        </MenuItem>
      </MenuList>
    </div>
  );
}
