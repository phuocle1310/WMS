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
import React, { useRef, useEffect, useState } from "react";
import CustomizedSnackbars from "../../components/UI/CustomizedSnackbars";
//redux api
import { addRequestPo } from "../../store/poSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//api
import productApi from "../../../src/api/productApi";
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
  tabs: {
    margin: "auto",
    textAlign: "center",
  },
  tab: {
    // background: "red",
    height: "5px",
    textTransform: "capitalize",
    border: "2px solid #ede7f6",
    borderBottom: "none",
    // width: 120,
    [theme.breakpoints.up("lg")]: {
      width: "auto",
    },
  },
  box: {
    borderBottom: "1px solid #ede7f6",
    width: "90%",
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
  //open
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSuccess1, setIsSuccess1] = useState(false);
  const [alert, setAlert] = useState({
    nameAlert: "",
    message: "",
    open: false,
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ nameAlert: "", message: "", open: false });
  };
  const handleAddProduct = (data) => {
    // xử lý api thêm sản phẩm
    const fetchLogin = async () => {
      try {
        const response = await productApi.createdProduct(data);
        console.log(response + "ủa");
        if (response) {
          setAlert({ nameAlert: "success", message: "Thành công", open: true });
        }
      } catch (error) {
        setAlert({
          nameAlert: "Error",
          message: error.response.data.non_field_errors,
          open: true,
        });
      }
    };
    fetchLogin();
    setIsSuccess(true);
  };
  const dispatch = useDispatch();
  //xứ lý thêm po
  const handleAddPo = (data) => {
    // xử lý api thêm sản phẩm
    const fetchLogin = async () => {
      try {
        dispatch(addRequestPo(data));
        setAlert({ nameAlert: "success", message: "Thành công", open: true });
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchLogin();
    setIsSuccess1(true);
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
            label={language.addNewProduct}
            className={classes.tab}
            icon={<AddIcon />}
            {...a11yProps(0)}
          />
          <Tab
            label={language.titleRPo}
            className={classes.tab}
            icon={<PostAddIcon />}
            {...a11yProps(1)}
          />
        </Tabs>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.tabPanel}>
        <TabPanel value={value} index={0} component={"div"}>
          <AddNewsProduct onProduct={handleAddProduct} isSuccess={isSuccess} />
          {alert.nameAlert && (
            <CustomizedSnackbars
              open={alert.open}
              handleClose={handleClose}
              nameAlert={alert.nameAlert}
              message={alert.message}
            ></CustomizedSnackbars>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h3>{language.titleRPo}</h3>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <AddPo isSuccess={isSuccess1} onAddProduct={handleAddPo}></AddPo>
            {alert.nameAlert && (
              <CustomizedSnackbars
                open={alert.open}
                handleClose={handleClose}
                nameAlert={alert.nameAlert}
                message={alert.message}
              ></CustomizedSnackbars>
            )}
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default AddPoPage;
