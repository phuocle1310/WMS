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
import { addRequestSo } from "../../store/soSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//api
import productApi from "../../../src/api/productApi";
import AddSo from "../../components/So/AddSo";
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
const AddSoPage = (props) => {
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
  const handleAddSo = (data) => {
    // xử lý api thêm sản phẩm
    const fetchLogin = async () => {
      try {
        dispatch(addRequestSo(data));
        console.log(data);
        setAlert({ nameAlert: "success", message: "Thành công", open: true });
      } catch (error) {
        console.log(error.response.data);
        setAlert({
          nameAlert: "Error",
          message: error.response.data,
          open: true,
        });
      }
    };
    fetchLogin();
    setIsSuccess(true);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
        <h4>Thêm yêu cầu po</h4>
        <AddSo isSuccess={isSuccess} onAddProduct={handleAddSo}></AddSo>
        {alert.nameAlert && (
          <CustomizedSnackbars
            open={alert.open}
            handleClose={handleClose}
            nameAlert={alert.nameAlert}
            message={alert.message}
          ></CustomizedSnackbars>
        )}
      </Grid>
    </Grid>
  );
};

export default AddSoPage;
