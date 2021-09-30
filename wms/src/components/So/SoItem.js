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
import PoItemStyles from "../Po/PoItemStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//list product
import ListProduct from "../Product/ListProduct";
const SoItem = (props) => {
  const classes = PoItemStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  let form = null;
  var moment = require("moment");
  const item = props.items;
  console.log("hello");
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
          <h3>{language.detailSo}</h3>
        </Grid>
        <Grid item xs={12} className={classes.box}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              {" "}
              <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                  <div className={classes.text}>
                    <div className={classes.textChild}>
                      <p>{language.id}:</p>
                      <p>{item.id}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.dateCreated}:</p>
                      <p>{moment(item.add_date).format("L, h:mm")}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.importDate}:</p>
                      <p>{moment(item.effective_date).format("L")}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.status}:</p>
                      <p>{item.status}</p>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <div className={classes.text}>
                    <div className={classes.textChild}>
                      <p>{language.supplier}:</p>
                      <p>{item.supplier.company_name}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.address}:</p>
                      <p>{item.supplier.address}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.phone}:</p>
                      <p>{item.supplier.phone}</p>
                    </div>
                    <div className={classes.textChild}>
                      <p>{language.email}:</p>
                      <p>{item.supplier.email}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12} className={classes.list}>
              <p className={classes.left}>{language.listProducts}:</p>
              <ListProduct rows={item.sodetail}></ListProduct>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default SoItem;
