import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
//css
import FormStyles from "./FormStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import {
  TextValidator,
  SelectValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import CustomizedSnackbars from "../UI/CustomizedSnackbars";
import poApi from "../../api/poApi";
const EditPo = (props) => {
  const { id } = props;
  const minimalSelectClasses = useMinimalSelectStyles();
  const classes = FormStyles();
  //alert
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
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const menuProps = {
    classes: {
      paper: minimalSelectClasses.paper,
      list: minimalSelectClasses.list,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
      color: "#000",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    getContentAnchorEl: null,
  };
  const iconComponent = (props) => {
    return (
      <ExpandMoreIcon
        className={props.className + " " + minimalSelectClasses.icon}
      />
    );
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleOnSubmit(status);
    // const fetchUpadte = async () => {
    //   try {
    //     const data = { status: status };
    //     const response = await poApi.updateStatus(props.id, data);
    //     setAlert({
    //       nameAlert: "success",
    //       message: language.success,
    //       open: true,
    //     });
    //     return response;
    //   } catch (error) {
    //     setAlert({
    //       nameAlert: "Error",
    //       message: JSON.stringify(error.response.data),
    //       open: true,
    //     });
    //   }
    // };
    // fetchUpadte();
  };
  return (
    <>
      <ValidatorForm
        className={classes.form}
        instantValidate
        onSubmit={handleOnSubmit}
      >
        <div className={classes.select}>
          <h3 style={{ padding: 20 }}>{language.confirmEdit}</h3>
          <SelectValidator
            className={classes.textField1}
            variant="outlined"
            SelectProps={{
              IconComponent: iconComponent,
              MenuProps: menuProps,
            }}
            size="small"
            onChange={handleChange}
            value={status ? status : ""}
            select={status ? status : ""}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          >
            <MenuItem value={3}>FAILED</MenuItem>
            <MenuItem value={1}>ACCEPTED</MenuItem>
          </SelectValidator>
        </div>
        <div className={classes.box2}>
          <Button
            variant="contained"
            onClick={props.onDelete}
            classes={{
              root: classes.submit, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            startIcon={<ClearIcon />}
          >
            {language.close}
          </Button>
          <Button
            variant="contained"
            type="submit"
            classes={{
              root: classes.submit, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            startIcon={<SendIcon />}
          >
            {language.sendRequire}
          </Button>
        </div>
        {alert.nameAlert && (
          <CustomizedSnackbars
            open={alert.open}
            handleClose={handleClose}
            nameAlert={alert.nameAlert}
            message={alert.message}
          ></CustomizedSnackbars>
        )}
      </ValidatorForm>
    </>
  );
};

export default EditPo;
