import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextValidator } from "react-material-ui-form-validator";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { ValidatorForm } from "react-material-ui-form-validator";
// import ValidatedCombox from "../UI/ValidatedCombox";
import ComboBox from "../UI/ComboBox";
//css
import AddProductStyles from "../Product/AddProductStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
const AddProductReceipt = (props) => {
  //khai báo
  const { values } = props;

  //xử lý lỗi
  // useEffect(() => {
  //   if (ValidatorForm.hasValidationRule("isquantity")) {
  //     ValidatorForm.removeValidationRule("isquantity");
  //   }
  // }, [values]);

  const classes = AddProductStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];

  var moment = require("moment");

  // const selectedDate = new Date();

  let form = null;
  // console.log(Number(values.Qty_order - values.Qty_receipt) + "hicc");
  // console.log(values.quantity + "sl");
  const itemProduct = () => {
    return (
      <>
        <div>
          <p>{props.id}</p>
        </div>
        <div>
          <ComboBox
            value={values.product}
            handlesetValue={props.handlesetValue}
            product={props.product}
          ></ComboBox>
        </div>
        <div>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            style={{ width: 190 }}
            size="small"
            type="number"
            label={language.Qty_order}
            value={values.Qty_order ? values.Qty_order : ""}
            inputProps={{ readOnly: true }}
          />
        </div>
        <div>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            style={{ width: 190 }}
            size="small"
            type="number"
            label={language.Qty_receipt}
            value={values.Qty_receipt}
            inputProps={{ readOnly: true }}
          />
        </div>
        <div>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            style={{ width: 180 }}
            size="small"
            type="number"
            label={language.quantity}
            name="quantity"
            value={values.quantity ? values.quantity : ""}
            onChange={props.handleChange}
            validators={["required",  `${props.err}`]}
            errorMessages={[
              `${language.requiredError}`,
              `${language.soQuantityError}`,
            ]}
          />
        </div>
        <div>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={props.onClear}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </>
    );
  };
  return <div className={classes.product}>{props.isNew && itemProduct()}</div>;
};

export default AddProductReceipt;
