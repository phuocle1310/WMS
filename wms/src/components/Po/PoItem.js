import React, { useState } from "react";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Addproduct from "../Product/Addproduct";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
//css
import PoItemStyles from "./PoItemStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//list product
import ListProduct from "../Product/ListProduct";
const AddPo = (props) => {
  const classes = PoItemStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  let form = null;
  var moment = require("moment");

  return (
    <ValidatorForm
      className={classes.form}
      ref={(r) => {
        form = r;
      }}
      instantValidate
    >
      <Grid container>
        <Grid item xs={12} className={classes.title}>
          <h3>Chi tiết đơn nhập</h3>
        </Grid>
        <Grid item xs={12} className={classes.box}>
          <Grid container className={classes.box}>
            <Grid item xs={6} md={3} lg={3} className={classes.left}>
              <p>{language.id}:</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className={classes.right}>
              <p>hhhhh</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className={classes.left}>
              <p>{language.supplier}:</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <p>hhhhh</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className={classes.left}>
              <p>{language.dateCreated}:</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <p>hhhhh</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className={classes.left}>
              <p>{language.importDate}:</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <p>hhhhh</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3} className={classes.left}>
              <p>{language.status}:</p>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <p>hhhhh</p>
            </Grid>
            <Grid item xs={12} className={classes.left}>
              <p>{language.listProducts}:</p>
            </Grid>
            <Grid item xs={12}>
              <ListProduct></ListProduct>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default AddPo;
