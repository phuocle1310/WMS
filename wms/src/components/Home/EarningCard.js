import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SendIcon from "@material-ui/icons/Send";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneIcon from "@material-ui/icons/Done";
import { useSpring, animated, config } from "react-spring";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 90,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    color: "#fff",
    borderRadius: 20,
    marginRight: 0,
    "& h5,h3": {
      margin: 5,
    },
    marginBottom: 10,
    [theme.breakpoints.up("lg")]: {
      marginRight: 40,
    },
    transition: "transform .3s",
  },
  iconButton: {
    color: "#fff",
  },
  container: {
    background: "#fff",

    [theme.breakpoints.up("lg")]: {
      display: "flex",
    },
    "& div:nth-child(2)": {
      background: "#5e35b1",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.1)",
      },
    },
    "& div:nth-child(3)": {
      // backgroundImage:
      //   "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)",
      background: "#1565c0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.1)",
      },
    },
    "& div:nth-child(4)": {
      // backgroundImage:
      //   "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)",
      background: "#1e88e5",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.1)",
      },
    },
    "& div:nth-child(1)": {
      // backgroundImage: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",
      background: "#4527a0",
      "&:hover": {
        background: "#0b2559",
        transform: "scale(1.1)",
      },
    },
  },
}));
function Number(props) {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: props.num,
    delay: 1000,
    config: { duration: 2000 },
    onRest: () => set(!flip),
  });

  return <animated.h3>{number.to((n) => n.toFixed())}</animated.h3>;
}
const Card = () => {
  const classes = useStyles();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <Box component="div" className={classes.container}>
      <div className={classes.root}>
        <nav data-aos="fade-down">
          {" "}
          <IconButton aria-label="add an alarm" className={classes.iconButton}>
            <ReceiptIcon fontSize="large" />
          </IconButton>
        </nav>
        <nav data-aos="fade-down">
          <Number num={200}></Number>
          <h5>Đơn hàng</h5>
        </nav>
      </div>
      <div className={classes.root}>
        <nav data-aos="fade-down">
          {" "}
          <IconButton aria-label="add an alarm" className={classes.iconButton}>
            <SendIcon fontSize="large" />
          </IconButton>
        </nav>
        <nav data-aos="fade-down">
          <Number num={500}></Number>
          <h5>Đơn hàng</h5>
        </nav>
      </div>
      <div className={classes.root}>
        <nav data-aos="fade-down">
          {" "}
          <IconButton aria-label="add an alarm" className={classes.iconButton}>
            <DoneIcon fontSize="large" />
          </IconButton>
        </nav>
        <nav data-aos="fade-down">
          <Number num={100}></Number>
          <h5>Đơn hàng</h5>
        </nav>
      </div>
      <div className={classes.root}>
        <nav data-aos="fade-down">
          {" "}
          <IconButton aria-label="add an alarm" className={classes.iconButton}>
            <DescriptionIcon fontSize="large" />
          </IconButton>
        </nav>
        <nav data-aos="fade-down">
          <Number num={50}></Number>
          <h5>Sản phẩm</h5>
        </nav>
      </div>
    </Box>
  );
};
export default Card;
