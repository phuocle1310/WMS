import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import EarningCard from "../components/Home/EarningCard";
import VerticalBar from "../components/Home/VerticalBar";
import { useEffect, useState } from "react";
import CardWelcome from "../components/Home/CardWelcome";
import AcccessibleTable from "../components/Home/AcccessibleTable";
import useHttp from "../Hook/useHttp";
import statisticalApi from "../api/statisticalApi";
import { CircularProgress } from "@material-ui/core";
const HomePage = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  // const classes = useStyles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const [chart, setChart] = useState({});
  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(statisticalApi.statisticalAll, true);

  useEffect(() => {
    sendRequest();
  }, []);
  useEffect(() => {
    // xử lý đăng nhập
    const fetchChart = async () => {
      try {
        //gọi từ axios
        const response = await statisticalApi.getChartPoSo(
          selectedDate.getFullYear(),
        );
        setChart(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChart();
  }, [selectedDate]);
  if (status === "pending") {
    return (
      <div className="centered" style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
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
  console.log(chart);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <EarningCard item={item}></EarningCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <VerticalBar
          item={chart}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        ></VerticalBar>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardWelcome></CardWelcome>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AcccessibleTable></AcccessibleTable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
