import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextValidator } from "react-material-ui-form-validator";
//css
import AddProductStyles from "../Product/AddProductStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
const UpdateReceiptProduct = (props) => {
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
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            style={{ width: 190 }}
            size="small"
            type="number"
            label={language.id}
            value={values.product.id ? values.product.id : ""}
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
            type="text"
            label={language.product}
            value={values.product.name ? values.product.name : ""}
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
            validators={["required", `${props.err}`]}
            errorMessages={[
              `${language.requiredError}`,
              `${language.soQuantityError}`,
            ]}
            inputProps={
              values.product ? { readOnly: false } : { readOnly: true }
            }
          />
        </div>
      </>
    );
  };
  return <div className={classes.product}>{props.isNew && itemProduct()}</div>;
};

export default UpdateReceiptProduct;
