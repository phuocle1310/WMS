import NotFoundImg from "../../assets/imghome/undraw_page_not_found_su7k.svg";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  img: {
    width: "100%",
    height: "60%",
    marginTop: 60,
    textAlign: "center",
    "& img": {
      width: "50%",
      height: "50%",
    },
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.img}>
      <img src={NotFoundImg} alt="anh" />
    </div>
  );
};
export default NotFound;
