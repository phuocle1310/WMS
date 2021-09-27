import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddReceiptStyle from "./AddReceiptStyle";
import MulLanguage from "../../assets/language/MulLanguage";
import { useDispatch, useSelector } from "react-redux";
import PoItem from "../Po/PoItem";
import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import Print from "../../components/UI/Print";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import CrupReceipt from "./CrupReceipt";
//api
import poApi from "../../api/poApi";
import useHttp from "../../Hook/useHttp";
import PoDetailByID from "./PoDetailByID";

const ReceiptPo = () => {
  //css
  const classes = AddReceiptStyle();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //lấy id
  const [poId, setId] = useState(0);
  const [poId1, setId1] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const handleChange = (e) => {
    setId(e.target.value);
  };

  const renderPoItem = () => {
    return <PoDetailByID poId={poId1}></PoDetailByID>;
  };

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(true);
    setId1(poId);
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} onSubmit={handleSubmit}>
          <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <ReceiptIcon style={{ fontSize: 30 }} />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder={language.sreach}
              type="number"
              fullWidth
              onChange={handleChange}
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              type="submit"
            >
              <SearchIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Paper>{" "}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.po}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {isOpen && renderPoItem()}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CrupReceipt></CrupReceipt>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ReceiptPo;
