import React, { useState } from "react";

// import { ReactComponent as Anh } from "../../assets/ImgHome/avatar.svg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
//css
import AppBarStyles from "./AppBarStyles";
import MenuMain from "./MenuMain.js";
import MenuClient from "./MenuClient";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector, useDispatch } from "react-redux";
//img
import en from "../../assets/ImgLanguage/en.svg";
import vn from "../../assets/ImgLanguage/vn.svg";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
//redux
import { languageActions } from "../../store/language";
export default function Appbar() {
  const classes = AppBarStyles();
  const [isMenu, setIsMenu] = React.useState(false);
  const dispatch = useDispatch();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //thông tin user
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  //show thong tin dang nhap
  const showInfo = () => {
    return (
      <div className={classes.item}>
        <Avatar className={classes.green} src={currentUser.avatar}></Avatar>
        <div className={classes.sectionDesktop}>
          <h3>
            {currentUser.first_name} {currentUser.last_name}
          </h3>
        </div>
      </div>
    );
  };
  //set menu hide
  const [menuHideMoreAnchorEl, setMenuHide] = useState(null);

  const isMenuHideOpen = Boolean(menuHideMoreAnchorEl);

  const handleMenuHideClose = () => {
    setMenuHide(null);
  };

  const handleMenuHideOpen = (event) => {
    setMenuHide(event.currentTarget);
  };
  //handle change lang
  function changeLang(params) {
    dispatch(languageActions.changeLanguage(params));
  }
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMenuHide = (
    <Menu
      anchorEl={menuHideMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={mobileMenuId}
      PaperProps={{
        style: {
          transform: "translateX(10px) translateY(50px)",
        },
      }}
      open={isMenuHideOpen}
      onClose={handleMenuHideClose}
      keepMounted={false}
    >
      <MenuItem onClick={() => changeLang("en")}>
        <IconButton
          className={classes.subButton}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img loading="lazy" width="35" src={en} alt="" />
        </IconButton>
        <p>{language.english}</p>
      </MenuItem>
      <MenuItem onClick={() => changeLang("vn")}>
        <IconButton
          className={classes.subButton}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <img loading="lazy" width="35" src={vn} alt="" />
        </IconButton>
        <p>{language.vietnamese}</p>
      </MenuItem>
    </Menu>
  );

  const renderMenu = () => {
    return (
      <MenuMain>
        <MenuClient></MenuClient>
      </MenuMain>
    );
  };
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
                onClick={() => {
                  setIsMenu(!isMenu);
                }}
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
            <div className={classes.item}>
              <Avatar
                className={classes.green}
                src={currentLanguage === "vn" ? vn : en}
                onClick={handleMenuHideOpen}
                style={{ marginRight: 20 }}
              ></Avatar>
            </div>
            <div className={classes.grow} />
            <div>{isLoggedIn ? showInfo() : "dang nhap"}</div>
          </Toolbar>
        </AppBar>
      </div>
      {isMenu && renderMenu()}
      {renderMenuHide}
    </div>
  );
}
