import ListPo from "../components/Po/ListPo";
import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    color: "#4251b5",
    padding: 5,
  },
  content: {
    width: "100%",
    margin: "auto",
    // textAlign: "center",
    marginBottom: 13,
    background: "#fff",
    // paddingTop: 20,
    borderTop: "5px solid #4251b5",
    // borderBottom: "5px solid #4251b5",
    [theme.breakpoints.up("lg")]: {
      width: "90%",
    },
  },
  title: {
    textTransform: "uppercase",
  },
}));
const ListPoPage = (props) => {
  const classes = useStyles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <h3 className={classes.title}>{language.listPo}</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className={classes.content}>
          <ListPo></ListPo>
        </div>
      </Grid>
    </Grid>
  );
};

export default ListPoPage;
