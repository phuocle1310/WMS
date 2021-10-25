import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

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
  const { items, idPo } = props;
  const data = items;
  let newList = [];
  for (let items in data) {
    let dataItem = {
      idIP: data[items].id,
      id: data[items].item.id,
      idImport: data[items].id,
      name: data[items].item.name,
      unit: data[items].item.unit,
      expire_date: data[items].item.expire_date,
      production_date: data[items].item.production_date,
      mu_case: data[items].item.mu_case,
      row_location: data[items].location.row_location,
      shelf_column: data[items].location.shelf_column,
      shelf_floor: data[items].location.shelf_floor,
      qty: data[items].qty,
      importStatus: data[items].status,
      add_date: data[items].add_date,
    };
    newList.push(dataItem);
  }
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
            </Grid>
          </Grid>
          <Grid item xs={12} lg={12} className={classes.list}>
            <p className={classes.left}>{language.listProductsImport}:</p>
            <ListItemImport
              rows={newList}
              index={props.index}
              listUpdateImport={props.handleUpdateImport}
            ></ListItemImport>
          </Grid>
          <Grid item xs={12} className={classes.box}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImportItem;
