import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ValidatedCombox from "../UI/ValidatedCombox";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
//css
import AddProductStyles from "./AddProductStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import { alpha } from "@material-ui/core/styles";
const AddNewsProduct = (props) => {
  const [selectedDate, handleDateChange] = useState("");
  const [selectedDateP, handleDateChangeP] = useState("");

  if (!ValidatorForm.hasValidationRule("isexpireMatch")) {
    ValidatorForm.addValidationRule("isexpireMatch", (value) => {
      if (value < selectedDateP) {
        return false;
      }
      return true;
    });
  }
  //xử lý lỗi
  useEffect(() => {
    if (ValidatorForm.hasValidationRule("isexpireMatch")) {
      ValidatorForm.removeValidationRule("isexpireMatch");
    }
  }, []);
  const classes = AddProductStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];

  var moment = require("moment");
  //   //khai báo
  const [product, setProduct] = useState({
    name: "",
    expire_date: "",
    production_date: "",
    mu_case: "",
    unit: "",
  });
  // const selectedDate = new Date();
  const handleChange = (e) => {
    setProduct((prevState) => {
      let newProduct = { ...prevState };
      newProduct[e.target.name] = e.target.value;
      return newProduct;
    });
  };
  let form = "";
  //xử lý hàm delete

  const handleDelete = (e) => {
    setProduct({
      name: "",
      expire_date: "",
      production_date: "",
      mu_case: "",
      unit: "",
    });
    handleDateChange("");
    handleDateChangeP("");
  };
  return (
    <ValidatorForm
      className={classes.form}
      ref={(r) => {
        form = r;
      }}
      instantValidate
    >
      <div className={classes.box}>
        <div className={classes.boxChild}>
          <h4 style={{ margin: 0 }}>{language.addNewProduct}</h4>
        </div>
        <div className={classes.boxChild}>
          {" "}
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            label={language.productNew}
            autoFocus
            name="name"
            size="small"
            onChange={handleChange}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
            value={product.name ? product.name : ""}
          />{" "}
        </div>
        <div className={classes.boxChild}>
          <ValidatedDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label={language.manufactureDate}
            format="dd/MM/yyyy"
            size="small"
            fullWidth
            value={selectedDateP}
            className={classes.textField}
            InputAdornmentProps={{ position: "start" }}
            validators={["required"]}
            maxDate={new Date()}
            errorMessages={[`${language.requiredError}`]}
            onChange={(date) => {
              if (moment.isDate(date)) {
                date.setHours(0, 0, 0, 0);
                handleDateChangeP(date);
                setProduct((prevState) => {
                  let newProduct = { ...prevState };
                  newProduct["production_date"] = date.toLocaleDateString();
                  return newProduct;
                });
              }
            }}
          />{" "}
        </div>
        <div className={classes.boxChild}>
          <ValidatedDatePicker
            autoOk
            variant="inline"
            alpha="true"
            className={classes.textField}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            label={language.expirationDate}
            fullWidth
            disabled={selectedDateP ? false : true}
            value={selectedDate}
            InputAdornmentProps={{ position: "start" }}
            onChange={(date) => {
              if (moment.isDate(date)) {
                date.setHours(0, 0, 0, 0);
                handleDateChange(date);
                setProduct((prevState) => {
                  let newProduct = { ...prevState };
                  newProduct["expire_date"] = date.toLocaleDateString();
                  return newProduct;
                });
              }
            }}
            validators={["required", "isexpireMatch"]}
            errorMessages={[
              `${language.requiredError}`,
              `${language.requiredExpirationDate}`,
            ]}
          />{" "}
        </div>
        <div className={classes.boxChild}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            label={language.muCase}
            type="number"
            name="mu_case"
            onChange={handleChange}
            value={product.mu_case ? product.mu_case : ""}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
          />
        </div>
        <div className={classes.boxChild}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            label={language.unit}
            name="unit"
            onChange={handleChange}
            value={product.unit ? product.unit : ""}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
          />
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleDelete}
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
      </div>
    </ValidatorForm>
  );
};

export default AddNewsProduct;
