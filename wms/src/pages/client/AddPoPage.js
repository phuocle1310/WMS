import AddPo from "../../components/Po/AddPo";
import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddNewsProduct from "../../components/Product/AddNewsProduct";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    color: "#4251b5",
    marginTop: 100,
    padding: 5,
  },
  content: {
    width: "100%",
    margin: "auto",
    // textAlign: "center",
    marginBottom: 13,
    background: "#fff",
    paddingTop: 20,
    borderTop: "5px solid #4251b5",
    // borderBottom: "5px solid #4251b5",
    [theme.breakpoints.up("lg")]: {
      width: "90%",
    },
  },
  tabs: {
    // background: "#4251b5",
    margin: "auto",
    textAlign: "center",
    "& .MuiTab-textColorPrimary ": {
      // color: "#fff !important",
    },
  },
  tab: {
    // background: "red",
    height: "5px",
    textTransform: "capitalize",
    border: "2px solid #ede7f6",
    borderBottom: "none",
    width: 120,
    [theme.breakpoints.up("lg")]: {
      width: "auto",
    },
  },
  box: {
    borderBottom: "1px solid #ede7f6",
    width: "90%",
  },
  tabPanel: {
    // background: "#fafafa",
  },
}));
const AddPoPage = (props) => {
  const classes = useStyles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Item One"
            className={classes.tab}
            icon={<AddIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label="Item Two"
            className={classes.tab}
            icon={<PostAddIcon />}
            {...a11yProps(1)}
          />
        </Tabs>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tabPanel}>
        <TabPanel value={value} index={0} component={"div"}>
          <AddNewsProduct />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3>{language.titleRPo}</h3>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div className={classes.content}>
              <AddPo></AddPo>
            </div>
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default AddPoPage;
