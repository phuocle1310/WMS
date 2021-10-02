import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import welcome from "../../assets/imghome/undraw_Welcome_re_h3d9.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 100,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bottom: 0,
    color: "#fff",
    borderRadius: 20,
    marginRight: 0,
    "& h5,h3": {
      margin: 5,
      textTransform: "uppercase",
    },
    marginBottom: 10,
    [theme.breakpoints.up("lg")]: {
      marginRight: 50,
    },
    transition: "transform .3s",
  },
  container: {
    background: "#fff",

    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    "& div:nth-child(1)": {
      background: "#5e35b1",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(3)": {
      // backgroundImage:
      //   "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)",
      background: "#1565c0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(4)": {
      // backgroundImage:
      //   "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
      background: "#1e88e5",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
    "& div:nth-child(2)": {
      // backgroundImage: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",
      background: "#4527a0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.05)",
      },
    },
  },
}));
const Card = () => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.container}>
      <div className={classes.root}>
        <h3>1,99</h3>
        <h5>Đơn hàng</h5>
      </div>
      <div className={classes.root}>
        <h3>1,99</h3>
        <h5>Đơn hàng</h5>
      </div>
      <div className={classes.root}>
        <h3>1,99</h3>
        <h5>Đơn hàng</h5>
      </div>
      <div className={classes.root}>
        <h3>1,99</h3>
        <h5>Đơn hàng</h5>
      </div>
    </Box>
  );
};
export default Card;
