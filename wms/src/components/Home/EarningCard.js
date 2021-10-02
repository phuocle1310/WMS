import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SendIcon from "@material-ui/icons/Send";
import DescriptionIcon from "@material-ui/icons/Description";
import DoneIcon from "@material-ui/icons/Done";
import { useSpring, animated } from "react-spring";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useHttp from "../../Hook/useHttp";
import statisticalApi from "../../api/statisticalApi";
import { CircularProgress } from "@material-ui/core";
import EarningCardStyles from "./EarningCardStyles";
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
  const classes = EarningCardStyles();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(statisticalApi.statisticalAll, true);

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === "pending") {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        404
      </p>
    );
  }

  if (!item) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        {item.id}
      </p>
    );
  }
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
          <Number num={item.totalPo}></Number>
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
          <Number num={item.totalSo}></Number>
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
          <Number num={item.totalDone}></Number>
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
          <Number num={item.totalProduct}></Number>
          <h5>Sản phẩm</h5>
        </nav>
      </div>
    </Box>
  );
};
export default Card;
