import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const styles = makeStyles((theme) => ({
  menuItem: {
    borderBottom: 0,
    width: 230,
    [theme.breakpoints.up("lg")]: {
      borderBottom: "1px solid  #D1CBCB",
      height: "70px",
      [`&:last-child`]: {
        borderBottom: 0,
      },
    },
  },
}));

const ItemMenu = (props) => {
  const classes = styles();
  const history = useHistory();
  const handerOnClick = () => {
    history.push(`${props.content.replace(/\s+/g, "")}`);
  };
  return (
    <MenuItem className={classes.menuItem} onClick={handerOnClick}>
      <p>{props.content}</p>
    </MenuItem>
  );
};
export default ItemMenu;
