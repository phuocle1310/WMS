import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SecondNavigationStyles from "../Layout/MenuStyles";
const ItemMenu = (props) => {
  const classes = SecondNavigationStyles();
  const history = useHistory();
  const handerOnClick = () => {
    history.push(`${props.link}`);
  };
  return (
    <MenuItem className={classes.menuItem} onClick={handerOnClick}>
      <NavLink
        activeClassName={classes.activeLink}
        className={classes.navlink}
        exact
        to={props.link}
      >
        {/* <IconButton
          className={classes.subButton}
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <HomeOutlinedIcon></HomeOutlinedIcon>
        </IconButton>{" "} */}
        <p>{props.content}</p>
      </NavLink>
    </MenuItem>
  );
};
export default ItemMenu;
