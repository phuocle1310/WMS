import React, { useState, useEffect } from "react";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import { CircularProgress } from "@material-ui/core";
//css
import PoItemStyles from "../Po/PoItemStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import useHttp from "../../Hook/useHttp";
//list product
import ListProduct from "../Product/ListProduct";
//api
import receiptApi from "../../api/receiptApi";

const ReceiptItem = (props) => {
  const classes = PoItemStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  let form = null;
  var moment = require("moment");
  //   const item = props.items;
  const id = props.id;
  // const poId = props.poId;
  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(receiptApi.getReceiptItem, true);

  useEffect(() => {
    sendRequest(id);
  }, [id]);

  if (status === "pending") {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        {error}
      </p>
    );
  }

  if (!item) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        not found
      </p>
    );
  }

  const filterItem = () => {
    let items = item.receiptdetail;
    return items.map((item) => {
      return { ...item, Qty_order: item.Qty_receipt };
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <div className={classes.text} style={{ float: "left" }}>
        <div className={classes.textChild}>
          <p>{language.id}:</p>
          <p>{item.id}</p>
        </div>
        <div className={classes.textChild}>
          <p>{language.poID}:</p>
          <p>{item.PO}</p>
        </div>
        <div className={classes.textChild}>
          <p>{language.dateCreated}:</p>
          <p>{item.add_date}</p>
        </div>
        <div className={classes.textChild}>
          <p>{language.editDate}:</p>
          <p>{item.edit_date}</p>
        </div>
      </div>
      <div className={classes.text} style={{ float: "left", marginBottom: 20 }}>
        <div className={classes.textChild}>
          <p>{language.add_who}:</p>
          <p>{item.add_who.username}</p>
        </div>
        <div className={classes.textChild}>
          <p>{language.edit_who_id}:</p>
          <p>{item.edit_who.username}</p>
        </div>
      </div>
      <p className={classes.left} style={{ clear: "left" }}>
        {language.listProducts}:
      </p>
      <ListProduct rows={filterItem()}></ListProduct>
    </div>
  );
};

export default ReceiptItem;
