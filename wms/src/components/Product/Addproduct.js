import React from "react";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import ComboBox from "../UI/ComboBox";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ValidatedCombox from "../UI/ValidatedCombox";
//css
import AddProductStyles from "./AddProductStyles";

const Addproduct = (props) => {
  const classes = AddProductStyles();
  //khai báo
  //   const { values, handleChange } = props;
  const minimalSelectClasses = useMinimalSelectStyles();
  const selectedDate = new Date();

  const itemProduct = () => {
    return (
      <>
        {" "}
        <Grid item md={1} lg={1}>
          {props.id}
        </Grid>
        <Grid item xs={9} lg={3}>
          {" "}
          <ValidatedCombox
            name="nameproduct"
            handleChange={props.handleChangeSelect}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          ></ValidatedCombox>
        </Grid>
        <Grid item lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            inputVariant="outlined"
            format="MM/dd/yyyy"
            size="small"
            label="With keyboard"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            onChange={props.handleChangeManufactureDate}
            readOnly={true}
          />{" "}
        </Grid>
        <Grid item lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            label="With keyboard"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            size="small"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            onChange={props.handleChangeExpirationDate}
            readOnly={true}
          />{" "}
        </Grid>
        <Grid item lg={2}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            type="number"
            label="số lượng*"
            name="quantity"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          />
        </Grid>
        <Grid item lg={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            classes={{
              root: classes.submit, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            onClick={props.onClear}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </>
    );
  };
  const itemNewProduct = () => {
    return (
      <>
        {" "}
        <Grid item lg={1}>
          {props.id}
        </Grid>
        <Grid item lg={3}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            size="small"
            label="Sản phẩm mới"
            autoFocus
            name="nameproduct"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          />
        </Grid>
        <Grid item lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            inputVariant="outlined"
            format="MM/dd/yyyy"
            size="small"
            label="With keyboard"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            onChange={props.handleChangeManufactureDate}
          />{" "}
        </Grid>
        <Grid item lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            label="With keyboard"
            inputVariant="outlined"
            format="MM/dd/yyyy"
            size="small"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            onChange={props.handleChangeExpirationDate}
          />{" "}
        </Grid>
        <Grid item lg={2}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            type="number"
            label="số lượng*"
            autoFocus
            name="quantity"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          />
        </Grid>
        <Grid item lg={2}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={props.onClear}
            classes={{
              root: classes.submit, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
          >
            <ClearIcon />
          </IconButton>
        </Grid>
      </>
    );
  };
  return (
    <Grid container spacing={3}>
      {props.isNew ? itemProduct() : itemNewProduct()}
    </Grid>
  );
};

export default Addproduct;
