import React from "react";

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

export default function Appbar() {
  const classes = AppBarStyles();
  const [isMenu, setIsMenu] = React.useState(false);
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
            <div className={classes.grow} />
            <div>{isLoggedIn ? showInfo() : "dang nhap"}</div>
          </Toolbar>
        </AppBar>
      </div>
      {isMenu && renderMenu()}
    </div>
  );
}
