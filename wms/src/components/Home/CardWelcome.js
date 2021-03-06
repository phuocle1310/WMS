import React from "react";
import welcome from "../../assets/imghome/undraw_Work_time_re_hdyv.svg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { makeStyles } from "@material-ui/core/styles";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#4e57aa",
    flexDirection: "column",
    color: "#fff",
    borderRadius: 20,
    height: 150,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  img: {
    width: "100%",
    height: "60%",
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
}));
const CardWelcome = () => {
  const classes = useStyles();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //thông tin user
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.title} data-aos="fade-left">
          <h3>
            {language.welcome} {currentUser.last_name}
          </h3>
        </div>
        <div className={classes.img}>
          <img src={welcome} alt="anh"></img>
        </div>
      </div>
    </>
  );
};

export default CardWelcome;
