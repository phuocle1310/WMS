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
import EarningCardStyles from "./EarningCardStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector, } from "react-redux";
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

const Card = (props) => {
  const classes = EarningCardStyles();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const {item}= props
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
          <h5>{language.orderPo}</h5>
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
          <h5>{language.orderSo}</h5>
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
          <h5>{language.orderDone}</h5>
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
          <h5>{language.product}</h5>
        </nav>
      </div>
    </Box>
  );
};
export default Card;
