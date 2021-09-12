import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SecondNavigationStyles from "./MenuStyles";
import ItemMenu from "../UI/ItemMenu";
import RowToggle from "@mui-treasury/components/toggle/row";
import { useJupiterRowToggleStyles } from "@mui-treasury/styles/rowToggle/jupiter";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import StarsIcon from "@material-ui/icons/Stars";
import InputBase from "@material-ui/core/InputBase";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
// export const MenuListItem = () => {};

export default function MenuClient(props) {
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
    <div>
      <div className={classes.tags}>
        <p className={classes.tag}>{language.title}</p>
      </div>
      <MenuItem className={classes.menuItem} onClick={onToggle1}>
        <RowToggle useStyles={useJupiterRowToggleStyles}>
          {language.nameMenuSo}
          <RowToggle.Action
            button
            toggled={toggled1}
            onClick={onToggle1}
            className={classes.toggled}
          />
        </RowToggle>
      </MenuItem>
      {toggled1 &&
        listMenu1.map((item, index) => {
          return (
            <ItemMenu
              content={item.content}
              key={index}
              link={item.link}
            ></ItemMenu>
          );
        })}
      <MenuItem className={classes.menuItem} onClick={onToggle}>
        <RowToggle useStyles={useJupiterRowToggleStyles}>
          {language.nameMenuPO}
          <RowToggle.Action
            button
            toggled={toggled}
            onClick={onToggle}
            className={classes.toggled}
          />
        </RowToggle>
      </MenuItem>
      {toggled &&
        listMenu2.map((item, index) => {
          return (
            <ItemMenu
              content={item.content}
              key={index}
              link={item.link}
            ></ItemMenu>
          );
        })}
    </div>
  );
}
