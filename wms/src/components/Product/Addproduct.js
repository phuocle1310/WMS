import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { TextValidator } from "react-material-ui-form-validator";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

// import ValidatedCombox from "../UI/ValidatedCombox";
import ComboBox from "../UI/ComboBox";
//css
import AddProductStyles from "./AddProductStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
const Addproduct = (props) => {
  const classes = AddProductStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];

  var moment = require("moment");
  //khai báo
  const { values } = props;
  // const selectedDate = new Date();
  const [selectedDate, setselectedDate] = useState({ manufactureDate: "" });
  useEffect(() => {
    setselectedDate({ manufactureDate: values.manufactureDate });
    console.log(
      moment(new Date(selectedDate.manufactureDate)).format("YYYY/MM/DD"),
    );
  }, [values.manufactureDate]);
  const itemProduct = () => {
    return (
      <>
        {" "}
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
            value={values.production_date ? values.production_date : ""}
            className={classes.textField}
            label={language.manufactureDate}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
            inputProps={{ readOnly: true }}
          ></TextValidator>
        </div>
        <div>
          <TextValidator
            value={values.expire_date ? values.expire_date : ""}
            className={classes.textField}
            label={language.expirationDate}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
            inputProps={{ readOnly: true }}
          ></TextValidator>
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
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
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

export default Addproduct;
