import AddPo from "../../components/Po/AddPo";
import Grid from "@material-ui/core/Grid";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddNewsProduct from "../../components/Product/AddNewsProduct";
import React from "react";
import PageStyles from "../../pages/client/PageStyles";
import { useSelector } from "react-redux";
import AddNewReceipt from "./AddNewReceipt";
import ReceiptList from "./ReceiptList";
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

const CrudReceipt = (props) => {
  const classes = PageStyles();
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
            label={language.addReceipt}
            className={classes.tab}
            icon={<AddIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label={language.listReceipt}
            className={classes.tab}
            icon={<PostAddIcon />}
            {...a11yProps(1)}
          />
        </Tabs>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tabPanel}>
        <TabPanel value={value} index={0} component={"div"}>
          <AddNewReceipt id={props.idPo}></AddNewReceipt>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ReceiptList id={props.id}></ReceiptList>
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default CrudReceipt;
