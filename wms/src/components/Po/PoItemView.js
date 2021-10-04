import React, { useState, useEffect } from "react";
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
import moment from "moment";
import useHttp from "../../Hook/useHttp";
import poApi from "../../api/poApi";
import { CircularProgress } from "@material-ui/core";
import PoItem from "./PoItem";
const PoItemView = (props) => {
  //khai báo form ban đầu rỗng
  const { id } = props;

  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(poApi.gePoDetail, true);

  useEffect(() => {
    sendRequest(id);
    console.log(item);
  }, []);

  if (status === "pending") {
    return (
      <div className="centered" style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        404
      </p>
    );
  }

  if (!item) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        {item.id}
      </p>
    );
  }
  return <PoItem items={{ ...item }}></PoItem>;
};

export default PoItemView;
