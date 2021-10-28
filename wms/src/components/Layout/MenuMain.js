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
import { useDispatch } from "react-redux";
import uiActions from "../../store/userSlice";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
export default function MenuMain(props) {
  const classes = SecondNavigationStyles();

  //lg
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const history = useHistory();
  //logout
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(uiActions.actions.logout());
    history.replace("/");
  };
  const homeHandler = () => {
    history.replace("/");
  };
  return (
    <div className={classes.secondMenu}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <p>WMS.PY</p>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={homeHandler}>
          {" "}
          <NavLink
            activeClassName={classes.activeLink}
            className={classes.navlink}
            exact
            to="/"
          >
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
          </NavLink>
        </MenuItem>
        {props.children}
        <MenuItem className={classes.menuItem} onClick={handleLogout}>
          <IconButton
            className={classes.subButton}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppIcon></ExitToAppIcon>
          </IconButton>
          <p>{language.logout}</p>
        </MenuItem>
      </MenuList>
    </div>
  );
}
