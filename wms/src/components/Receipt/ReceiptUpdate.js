import React, { useState, useEffect } from "react";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Addproduct from "../Product/Addproduct";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import Grid from "@material-ui/core/Grid";
//css
import FormStyles from "../Po/FormStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector, useDispatch } from "react-redux";
//api
import productApi from "../../api/productApi";
import receiptApi from "../../api/receiptApi";
//alert
import CustomizedSnackbars from "../UI/CustomizedSnackbars";
import UpdateReceiptProduct from "./UpdateReceiptProduct";
const ReceiptUpdate = (props) => {
  const { id } = props;
  const classes = FormStyles();
  //alert
  const [alert, setAlert] = useState({
    nameAlert: "",
    message: "",
    open: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ nameAlert: "", message: "", open: false });
  };
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng
  let form = null;

  var moment = require("moment");
  // lưu vào danh sách
  const [listProduct, setListProduct] = useState([]);
  const [receipt, setReceipt] = useState(null);
  let listReceipt = [];

  // const [loadData, setloadData] = useState(false);
  const listItems = () => {
    return listProduct.map((item, index) => {
      let err = `isquantity${index}`;
      if (!ValidatorForm.hasValidationRule(err)) {
        console.log(Number(Number(item.Qty_order) - Number(item.Qty_receipt)));
        ValidatorForm.addValidationRule(err, (value) => {
          if (
            Number(value) <=
            Number(Number(item.Qty_order) - Number(item.Qty_receipt))
          ) {
            return true;
          }
          return false;
        });
      }
      return (
        <UpdateReceiptProduct
          key={index}
          isNew={item.isNew}
          id={index + 1}
          values={item}
          err={err}
          //onClear={removeItemHandler.bind(this, index)}
          handleChange={handleChangeAll(index)}
          // handlesetValue={handleChangeSelect(index)}
          product={item.product}
        ></UpdateReceiptProduct>
      );
    });
  };

  //hàm xử lý onchange
  const handleChangeAll = (id) => (e) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          newlist[i][e.target.name] = e.target.value;
        }
      }
      return newlist;
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //thay page
        const response = await receiptApi.getReceiptItem(id);
        const pr = await receiptApi.getProduct(response.PO);
        for (var i = 0; i < response.receiptdetail.length; i++) {
          const items = pr.find(
            ({ id }) => id === response.receiptdetail[i].item.id,
          );
          let item = {
            isNew: true,
            quantity: response.receiptdetail[i].Qty_receipt,
            product: response.receiptdetail[i].item,
            Qty_receipt: items.Qty_receipt,
            Qty_order: items.Qty_order,
          };
          listReceipt.push(item);
        }
        console.log(receipt);
        setListProduct(listReceipt);
        setReceipt(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  //xử lý submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (listProduct.length > 0) {
      //lấy items về đúng định dạng
      let items = listProduct.map((item) => {
        let rObj = {
          pk: item.product.id,
          Qty_receipt: Number(item.quantity),
        };
        return rObj;
      });
      //xử lý dữ liệu đưa lên api
      const data = {
        items: items,
      };
      // xử lý api thêm sản phẩm
      const fetchLogin = async () => {
        try {
          const response = await receiptApi.createReceipt(id, data);
          // onDelete();
          // setloadData(!loadData);
          setAlert({
            nameAlert: "success",
            message: language.success,
            open: true,
          });
        } catch (error) {
          console.log(error.response.data);
          setAlert({
            nameAlert: "Error",
            message: JSON.stringify(error.response.data),
            open: true,
          });
        }
      };
      fetchLogin();
    }
  };
  return (
    <ValidatorForm
      className={classes.form}
      ref={(r) => {
        form = r;
      }}
      instantValidate
      // onSubmit={handleOnSubmit}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={12}>
            <div className={classes.title}>
              <h3>{language.detailReceipt}</h3>
            </div>
            <div className={classes.box}>
              <div
                className={classes.text}
                style={{ float: "left", marginBottom: 20 }}
              >
                <div className={classes.textChild}>
                  <p>{language.id}:</p>
                  <p>{receipt.id}</p>
                </div>
                <div className={classes.textChild}>
                  <p>{language.poID}:</p>
                  <p>{receipt.PO}</p>
                </div>
                <div className={classes.textChild}>
                  <p>{language.dateCreated}:</p>
                  <p>{moment(receipt.add_date).format("L, h:mm")}</p>
                </div>
                <div className={classes.textChild}>
                  <p>{language.editDate}:</p>
                  <p>{moment(receipt.edit_date).format("L, h:mm")}</p>
                </div>
                <div className={classes.textChild}>
                  <p>{language.add_who}:</p>
                  <p>{receipt.add_who.username}</p>
                </div>
                <div className={classes.textChild}>
                  <p>{language.edit_who_id}:</p>
                  <p>{receipt.edit_who.username}</p>
                </div>
              </div>
            </div>
            <div className={classes.box}>
              <p className={classes.labelId} style={{ marginBottom: 20 }}>
                {language.listProducts}
              </p>
            </div>
            <div className={classes.box1}>{listItems()}</div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.box2}>
        <Button
          variant="contained"
          // onClick={onDelete}
          classes={{
            root: classes.submit, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          startIcon={<ClearIcon />}
        >
          {language.close}
        </Button>
        <Button
          variant="contained"
          type="submit"
          classes={{
            root: classes.submit, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          startIcon={<SendIcon />}
        >
          {language.sendRequire}
        </Button>
      </div>
      {alert.nameAlert && (
        <CustomizedSnackbars
          open={alert.open}
          handleClose={handleClose}
          nameAlert={alert.nameAlert}
          message={alert.message}
        ></CustomizedSnackbars>
      )}
    </ValidatorForm>
  );
};

export default ReceiptUpdate;
