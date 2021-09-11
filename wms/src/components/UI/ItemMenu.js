import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";

import IconButton from "@material-ui/core/IconButton";
const styles = makeStyles((theme) => ({
  menuItem: {
    borderBottom: 0,
    // width: 230,
    fontSize: 15,

    [theme.breakpoints.up("lg")]: {
      // borderBottom: "1px solid  #D1CBCB",
      height: "60px",
      [`&:last-child`]: {
        borderBottom: 0,
      },
    },
    subButton: {
      paddingLeft: 0,
    },
    color: "current",
    "&:hover": {
      background: "#000051",
    },
  },
}));

const ItemMenu = (props) => {
  const classes = styles();
  const history = useHistory();
  const handerOnClick = () => {
    history.push(`${props.link}`);
  };
  return (
    <MenuItem className={classes.menuItem} onClick={handerOnClick}>
      <p>{props.content}</p>
    </MenuItem>
  );
};
export default ItemMenu;
