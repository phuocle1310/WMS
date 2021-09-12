import React, { Children } from "react";
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
  const [toggled, setToggled] = React.useState(false);
  const [toggled1, setToggled1] = React.useState(false);
  const onToggle = () => setToggled(!toggled);
  const onToggle1 = () => setToggled1(!toggled1);
  //lg
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const listMenu1 = [
    { content: `${language.inputSo}`, id: 2, link: "/po" },
    { content: `${language.listSo}`, id: 3, link: "/po" },
  ];
  const listMenu2 = [
    { content: `${language.inputPo}`, id: 1, link: "/po" },
    { content: `${language.listPo}`, id: 3, link: "/po" },
  ];
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
