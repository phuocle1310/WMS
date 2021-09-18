import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "react-slideshow-image";
import Cat from "../../assets/img/Welcome-amico.svg";
import Upload from "../../assets/img/Checking boxes-amico.svg";
import Image1 from "../../assets/img/Logistics-bro.svg";
import Image2 from "../../assets/img/Container ship-amico.svg";
import Image3 from "../../assets/img/Logistics-amico.svg";
//css
import "./SlideShow.css";
import "react-slideshow-image/dist/styles.css";
const useStyles = makeStyles((theme) => ({
  layout: {
    margin: "auto",
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
}));

export default function SlideShow() {
  const classes = useStyles();
  const style = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };
  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Slide autoplay="on" arrows={false} duration={3500} className="slide">
          <div style={{ ...style }}>
            <div className="top">
              {" "}
              <div className="circle">
                <img src={Cat} alt={Cat} className="img"></img>
              </div>{" "}
            </div>{" "}
            <div className="bottom">
              <h3>Chào mừng bạn</h3>
              <p>Quản lý nhà kho tiện lợi bằng WMS.PY</p>
            </div>
          </div>
          <div style={{ ...style }}>
            <div className="top">
              <div className="circle">
                <img src={Upload} alt={Cat} className="img"></img>
              </div>
            </div>
            <div className="bottom">
              <h3>Quản lý nhà kho</h3>
              <p>
                Hệ thống giúp theo dõi mức tồn kho, đơn đặt hàng, bán hàng và
                giao hàng
              </p>
            </div>
          </div>
          <div style={{ ...style }}>
            <div className="top">
              <div className="circle">
                <img src={Image2} alt={Image1} className="img"></img>
              </div>
            </div>
            <div className="bottom">
              <h3>Quản lý vận chuyển</h3>
              <p>Tối ưu hóa việc chọn và vận chuyển đơn đặt hàng</p>
            </div>
          </div>
          <div style={{ ...style }}>
            <div className="top">
              <div className="circle">
                <img src={Image1} alt={Image1} className="img"></img>
              </div>
            </div>
            <div className="bottom">
              <h3>Quản lý sản phẩm</h3>
              <p>
                Hệ thống quản lý kho có khả năng hỗ trợ trong việc phân phối sản
                phẩm
              </p>
            </div>
          </div>
          <div style={{ ...style }}>
            <div className="top">
              <div className="circle">
                <img src={Image3} alt={Image1} className="img"></img>
              </div>
            </div>
            <div className="bottom">
              <h3>Đảm bảo chất lượng</h3>
              <p>
                Hỗ trợ cho các chương trình tuân thủ của nhà cung cấp và báo cáo
                cho nhà cung cấp
              </p>
            </div>
          </div>
        </Slide>
      </div>{" "}
    </React.Fragment>
  );
}
