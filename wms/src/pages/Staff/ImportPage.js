import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ImportList from "../../components/Import/ImportList";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import PageStyles from "../client/PageStyles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
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
const ImportPage = (props) => {
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //css
  const classes = PageStyles();
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
            label={language.importDone}
            className={classes.tab}
            icon={<AddIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label={language.importProcess}
            className={classes.tab}
            icon={<AutorenewIcon />}
            {...a11yProps(1)}
          />
          <Tab
            label={language.importFinish}
            className={classes.tab}
            icon={<DoneIcon />}
            {...a11yProps(3)}
          />
        </Tabs>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tabPanel}>
        <TabPanel value={value} index={0} component={"div"}>
          <ImportList index={1}></ImportList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ImportList index={2}></ImportList>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ImportList index={3}></ImportList>
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default ImportPage;
