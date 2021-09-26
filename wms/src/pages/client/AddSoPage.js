import AddPo from "../../components/Po/AddPo";
import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//api
import AddSo from "../../components/So/AddSo";
import PageStyles from "./PageStyles";

const AddSoPage = (props) => {
  const classes = PageStyles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
        <h4>{language.titleRSo}</h4>
        <AddSo></AddSo>
      </Grid>
    </Grid>
  );
};

export default AddSoPage;
