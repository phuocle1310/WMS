import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import EarningCard from "../../components/Home/EarningCard";
import { makeStyles } from "@material-ui/core/styles";
import VerticalBar from "../../components/Home/VerticalBar";

const HomePage = (props) => {
  // const classes = useStyles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <EarningCard></EarningCard>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <VerticalBar></VerticalBar>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4}>
        <VerticalBar></VerticalBar>
        <VerticalBar></VerticalBar>
      </Grid>
    </Grid>
  );
};

export default HomePage;
