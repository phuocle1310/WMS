import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddReceiptStyle from "./AddReceiptStyle";
import MulLanguage from "../../assets/language/MulLanguage";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CrudReceipt from "./CrudReceipt";
import { useDispatch, useSelector } from "react-redux";
//api
import poApi from "../../api/poApi";
import useHttp from "../../Hook/useHttp";
import PoDetailByID from "./PoDetailByID";

//get po

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
    return (
      <>
        {" "}
        <PoDetailByID status={status} error={error} data={item}></PoDetailByID>
        <CrudReceipt status={status} error={error} data={item}></CrudReceipt>
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
  } = useHttp(poApi.gePoDetail, true);

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
export default ReceiptPo;
