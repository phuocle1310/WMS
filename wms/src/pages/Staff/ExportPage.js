import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import ExportList from "../../components/Export/ExportList";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";
import PageStyles from "../client/PageStyles";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import TableExport from "../../components/Export/TableExport";
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
const ExportPage = (props) => {
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
  function a11yPropsChild(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //tab Child
  const [valueChild, setValueChild] = React.useState(0);

  const handleChangeChild = (event, newValueChild) => {
    setValueChild(newValueChild);
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
          <ExportList index={1}></ExportList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tabs
            value={valueChild}
            onChange={handleChangeChild}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
            aria-label="scrollable force tabs example"
          >
            <Tab
              label={language.pyPo}
              className={classes.tab}
              {...a11yPropsChild(0)}
            />
            <Tab
              label={language.pyProduct}
              className={classes.tab}
              {...a11yPropsChild(1)}
            />
          </Tabs>{" "}
          <TabPanel value={valueChild} index={0}>
            <ExportList index={2}></ExportList>{" "}
          </TabPanel>
          <TabPanel value={valueChild} index={1}>
            <TableExport index={2}></TableExport>
          </TabPanel>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ExportList index={3}></ExportList>
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default ExportPage;
