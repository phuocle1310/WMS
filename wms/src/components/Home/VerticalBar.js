import React from "react";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Red Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#1565c0",
    },
    {
      label: "# of Blue Votes",
      data: [2, 3, 20, 5, 1, 4],
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
  },
  chart: {
    padding: 20,
  },
}));
const StackedBar = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.title}>
          <h4>Biểu đồ</h4>
        </div>
        <div className={classes.chart}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default StackedBar;
