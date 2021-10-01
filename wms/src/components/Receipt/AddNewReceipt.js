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
import AddProductReceipt from "./AddProductReceipt";


const AddNewReceipt = (props) => {
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
  //readonly
  const TextFieldComponent = (props) => {
    return <TextField fullWidth {...props} disabled={true} />;
  };
  // lưu vào danh sách
  const [listProduct, setListProduct] = useState([
    {
      isNew: true,
      quantity: "",
      Qty_receipt: "",
      Qty_order: "",
      production_date: "",
      expire_date: "",
      product: {
        name: "",
        Qty_total: "",
      },
    },
  ]);
  // lấy sản phẩm từ api
  let [product, setProduct] = useState([]);
  let [product1, setProduct1] = useState([]);
  const [loadData, setloadData] = useState(false);
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        //thay page
        const response = await receiptApi.getProduct(id);
        setProduct(response);
        setProduct1(response);
        setListProduct([
          {
            isNew: true,
            quantity: "",
            Qty_receipt: "",
            Qty_order: "",
            production_date: "",
            expire_date: "",
            product: {
              name: "",
              Qty_total: "",
            },
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    return () => {
      setIsShow(true);
    };
  }, [id]);
  //cập nhật product
  useEffect(() => {
    let newa = [...product1];
    for (var i = 0; i < listProduct.length; i++) {
      const item = getItem(listProduct[i].product);
      if (listProduct[i].product === item) {
        //xóa
        removeElement(newa, listProduct[i].product);
      }
    }
    setProduct(newa);
  }, [listProduct, id]);
  //show
  const listItems = () => {
    return listProduct.map((item, index) => {
      return (
        <AddProductReceipt
          key={index}
          isNew={item.isNew}
          id={index + 1}
          values={item}
          onClear={removeItemHandler.bind(this, index)}
          handleChange={handleChangeAll(index)}
          handlesetValue={handleChangeSelect(index)}
          product={product}
        ></AddProductReceipt>
      );
    });
  };
  //xử lý thêm mới / nhưng cũ
  const addItemProductHandler = () => {
    if (listProduct.length < product1.length) {
      setListProduct((prevState) => {
        return [
          ...prevState,
          {
            isNew: true,
            quantity: "",
            Qty_receipt: "",
            Qty_order: "",
            production_date: "",
            expire_date: "",
            product: {
              name: "",
              Qty_total: "",
            },
          },
        ];
      });
    }
  };
  const getItem = (e) => {
    const item = product1.find((item) => item === e);
    return item;
  };
  //xóa
  const removeItemHandler = (index) => {
    if (listProduct.length > 1) {
      //lấy item tính xóa
      let a = { ...listProduct[index].product };
      if (a.name !== "") {
        //thêm lại vào product
        setProduct((pre) => {
          let newlist = [...pre];
          newlist.push(a);
          //sắp xếp lại
          return newlist.sort(function (a, b) {
            return a.id - b.id;
          });
        });
      }
      //xóa
      const list = [...listProduct];
      list.splice(index, 1);
      setListProduct(list);
    }
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
  const handleChangeSelect = (id) => (e, a) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          newlist[i]["product"] = a;
          if (a !== null) {
            //lấy số lượng item có trong xe'
            newlist[i]["Qty_order"] = a.Qty_order;
            newlist[i]["Qty_receipt"] = a.Qty_receipt;
          }
        }
      }
      return newlist;
    });
  };
  //ham xoa
  function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  //xử lý PO

  const onDelete = () => {
    setListProduct([
      {
        isNew: true,
        quantity: "",
        Qty_receipt: "",
        Qty_order: "",
        production_date: "",
        expire_date: "",
        product: {
          name: "",
          Qty_total: "",
        },
      },
    ]);
  };
  // xử lý submit
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
          onDelete();
          setloadData(!loadData);
          setAlert({
            nameAlert: "success",
            message: language.success,
            open: true,
          });
        } catch (error) {
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
      onSubmit={handleOnSubmit}
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={3}>
            {/* <p className={classes.labelId}>{language.supplier}:</p>{" "}
            <TextValidator
              className={classes.textField}
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              type="text"
              value="Tra dao"
              readOnly={true}
            ></TextValidator> */}
          </Grid>
          <Grid item lg={12}>
            <div className={classes.box}>
              <nav>
                <p className={classes.labelId}>{language.addProduct}</p>{" "}
              </nav>
              <nav>
                <IconButton
                  onClick={addItemProductHandler}
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  disabled={listProduct.length < product1.length ? false : true}
                  classes={{
                    root: classes.button, // class name, e.g. `classes-nesting-root-x`
                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                  }}
                >
                  <AddIcon />
                </IconButton>
              </nav>
            </div>
            <div className={classes.box}>
              <p className={classes.labelId}>{language.listProducts}</p>
            </div>
            <div className={classes.box1}>{isShow && listItems()}</div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.box2}>
        <Button
          variant="contained"
          onClick={onDelete}
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

export default AddNewReceipt;
