import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import statisticalApi from "../../api/statisticalApi";
import { CircularProgress } from "@material-ui/core";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import useHttp from "../../Hook/useHttp";
const useStyles = makeStyles((theme) => ({
  root: {
    // background: ` transparent url(${welcome}) no-repeat`,
    // backgroundPosition: "center right",
    background: "#fff",
    // padding: 30,
    borderRadius: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  title: {
    background: "#f8fafb",
    padding: "1px 18px",
    color: "#4251b5",
    fontWeight: 700,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  chart: {
    padding: 20,
  },
}));
const StackedBar = (props) => {
  const classes = useStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const { item } = props;
  const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: `${language.orderPo}`,
        data: Object.values(item.po.months),
        backgroundColor: "#1565c0",
      },
      {
        label: `${language.orderSo}`,
        data: Object.values(item.so.months),
        backgroundColor: "#4527a0",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          <p>{language.chart}</p>
        </div>
        <div className={classes.chart}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default StackedBar;
