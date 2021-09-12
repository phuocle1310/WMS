import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { TextValidator } from "react-material-ui-form-validator";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ValidatedCombox from "../UI/ValidatedCombox";
//css
import AddProductStyles from "./AddProductStyles";

const Addproduct = (props) => {
  const classes = AddProductStyles();
  var moment = require("moment");
  //khai báo
  const { values } = props;
  // const selectedDate = new Date();
  const selectedDate = useState(new Date());
  const itemProduct = () => {
    return (
      <>
        {" "}
        <Grid xs={3} sm={6} md={1} lg={1}>
          {props.id}
        </Grid>
        <Grid item xs={9} sm={6} md={2} lg={2}>
          {" "}
          <ValidatedCombox
            name="nameproduct"
            handleChange={props.handleChangeSelect}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          ></ValidatedCombox>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            label="With keyboard"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.manufactureDate
                ? moment(new Date(values.manufactureDate)).format("DD/MM/YYYY")
                : selectedDate
            }
            onChange={(e) => console.log(e)}
            readOnly={true}
          />{" "}
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            label="With keyboard"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.expirationDate
                ? moment(new Date(values.expirationDate)).format("DD/MM/YYYY")
                : selectedDate
            }
            onChange={props.handleChangeExpirationDate}
            readOnly={true}
          />{" "}
        </Grid>
        <Grid item xs={4} sm={6} md={2} lg={2}>
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
        <Grid item xs={4} sm={6} md={2} lg={2}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            label="đơn vị*"
            autoFocus
            name="unit"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          />
        </Grid>
        <Grid item xs={4} sm={6} md={1} lg={1}>
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
        <Grid xs={3} sm={6} md={1} lg={1}>
          {props.id}
        </Grid>
        <Grid item xs={9} sm={6} md={2} lg={2}>
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
        <Grid item xs={6} sm={6} md={2} lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            label="With keyboard"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.manufactureDate
                ? moment(new Date(values.manufactureDate)).format("DD/MM/YYYY")
                : ""
            }
            onChange={props.handleChangeManufactureDate}
          />{" "}
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2}>
          {" "}
          <ValidatedDatePicker
            autoOk
            variant="inline"
            className={classes.textField}
            label="With keyboard"
            inputVariant="outlined"
            format="dd/MM/yyyy"
            size="small"
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
            style={{ width: "100%" }}
            InputAdornmentProps={{ position: "start" }}
            value={
              values.expirationDate
                ? moment(new Date(values.expirationDate)).format("DD/MM/YYYY")
                : ""
            }
            onChange={props.handleChangeExpirationDate}
          />{" "}
        </Grid>
        <Grid item xs={4} sm={6} md={2} lg={2}>
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
        <Grid item xs={4} sm={6} md={2} lg={2}>
          <TextValidator
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            size="small"
            label="đơn vị*"
            autoFocus
            name="unit"
            onChange={props.handleChange}
            validators={["required"]}
            errorMessages={["không để trống dòng này"]}
          />
        </Grid>
        <Grid item xs={4} sm={6} md={1} lg={1}>
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
    <Grid container style={{ width: "100%" }} spacing={2}>
      {props.isNew ? itemProduct() : itemNewProduct()}
    </Grid>
  );
};

export default Addproduct;
