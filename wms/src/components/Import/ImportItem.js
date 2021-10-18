import React, { useState, useEffect } from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GreenCheckbox from "../UI/GreenCheckbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
//css
import PoItemStyles from "../Po/PoItemStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//list item
import ListItemImport from "./ListItemImport";

const ImportItem = (props) => {
  const classes = PoItemStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  let form = null;
  var moment = require("moment");
  const { items, idPo } = props;
  const [data, setData] = useState(items);
  let newList = [];
  for (let items in data) {
    let dataItem = {
      idIP: data[items].id,
      id: data[items].item.id,
      name: data[items].item.name,
      unit: data[items].item.unit,
      expire_date: data[items].item.expire_date,
      production_date: data[items].item.production_date,
      mu_case: data[items].item.mu_case,
      row_location: data[items].location.row_location,
      shelf_column: data[items].location.shelf_column,
      shelf_floor: data[items].location.shelf_floor,
      qty: data[items].qty,
      add_date: data[items].add_date,
    };
    newList.push(dataItem);
  }
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <h3>{language.detailPo}</h3>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={3}>
                <div className={classes.text}>
                  <div className={classes.textChild}>
                    <p>{language.poID}:</p>
                    <p>{idPo}</p>
                  </div>
                </div>
              </Grid>

              {/* <Grid item xs={12} lg={4}>
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
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12} className={classes.list}>
            <p className={classes.left}>{language.listProductsImport}:</p>
            <ListItemImport rows={newList}></ListItemImport>
          </Grid>
          <Grid item xs={12} className={classes.box}>
            <Button
              variant="contained"
              type="submit"
              classes={{
                root: classes.submit, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              // startIcon={<SendIcon />}
            >
              {language.sendRequire}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImportItem;
