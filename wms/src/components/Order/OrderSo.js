import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddReceiptStyle from "../Receipt/AddReceiptStyle";
import MulLanguage from "../../assets/language/MulLanguage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//api
import soApi from "../../api/soApi";
import useHttp from "../../Hook/useHttp";
//order
import SoDetailByID from "./SoDetailByID";
import CrudOrder from "./CrudOrder";
const OrderSo = () => {
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
    return (
      <>
        {" "}
        <SoDetailByID status={status} error={error} data={item}></SoDetailByID>
        <CrudOrder status={status} error={error} data={item}></CrudOrder>
      </>
    );
  };

  function handleSubmit(e) {
    setOpen(true);
    setId1(poId);
  }
  //gọi api
  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(soApi.getSoDetail, true);

  useEffect(() => {
    if (poId1 !== 0) sendRequest(poId1);
  }, [poId1]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} onSubmit={handleSubmit}>
          <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
              <ReceiptIcon style={{ fontSize: 30 }} />
            </IconButton>
            <InputBase
              className={classes.input}
              placeholder={language.sreachPo}
              type="number"
              fullWidth
              onChange={handleChange}
              required
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={handleSubmit}
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default OrderSo;
