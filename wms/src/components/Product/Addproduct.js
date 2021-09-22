import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { TextValidator } from "react-material-ui-form-validator";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ValidatedCombox from "../UI/ValidatedCombox";
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
          {" "}
          <ValidatedCombox
            name="nameproduct"
            product={props.product}
            handleChange={props.handleChangeSelect}
            validators={["required"]}
            value={values.nameproduct ? values.nameproduct : " "}
            errorMessages={[`${language.requiredError}`]}
          ></ValidatedCombox>
        </div>
        <div>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            style={{ width: 100 }}
            className={classes.textField}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            label={language.manufactureDate}
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.manufactureDate
                ? moment(new Date(selectedDate.manufactureDate)).format(
                    "YYYY/MM/DD",
                  )
                : selectedDate
            }
            onChange={(e) => console.log(e)}
            readOnly={true}
          />{" "}
        </div>
        <div>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            fullWidth
            className={classes.textField}
            label={language.expirationDate}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            validators={["required"]}
            errorMessages={[`${language.requiredError}`]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.expirationDate
                ? moment(new Date(values.expirationDate)).format("YYYY/MM/DD")
                : selectedDate
            }
            onChange={props.handleChangeExpirationDate}
            readOnly={true}
          />{" "}
        </div>
        <div>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            style={{ width: 130 }}
            size="small"
            type="number"
            label={language.quantity}
            name="quantity"
            defaultValue={
              values.expirationDate
                ? moment(new Date(values.expirationDate)).format("DD/MM/YYYY")
                : selectedDate
            }
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
