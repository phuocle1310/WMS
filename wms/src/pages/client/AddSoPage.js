import AddSo from "../../components/So/AddSo";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    color: "#4251b5",
    marginTop: 80,
    padding: 5,
  },
  content: {
    width: "100%",
    margin: "auto",
    textAlign: "center",
    marginBottom: 13,
    background: "#fff",
    paddingTop: 20,
    borderTop: "5px solid #4251b5",
    // borderBottom: "5px solid #4251b5",
    [theme.breakpoints.up("lg")]: {
      width: "90%",
    },
  },
}));
const AddSoPage = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <h3>Tạo yêu cầu nhập hàng</h3>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className={classes.content}>
          <AddSo></AddSo>
        </div>
      </Grid>
    </Grid>
  );
};

export default AddSoPage;
