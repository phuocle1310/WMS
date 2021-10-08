import React from "react";
import Grid from "@material-ui/core/Grid";
//css
import PoItemStyles from "./PoItemStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
//list product
import ListProduct from "../Product/ListProduct";

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
  const item = props.items;
  return (
    <Grid container>
      <Grid item xs={12} className={classes.title}>
        <h3>{language.detailPo}</h3>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        <Grid container>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} lg={3}>
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
              </Grid> */}
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
            <p className={classes.left}>{language.listProducts}:</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImportItem;
