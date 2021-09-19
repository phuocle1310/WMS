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
//css
import FormStyles from "./FormStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector, useDispatch } from "react-redux";
//api
import { getProductBySupplier } from "../../store/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const AddPo = (props) => {
  const classes = FormStyles();
  const dispatch = useDispatch();
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
      nameproduct: "",
      quantity: "",
      manufactureDate: "",
      expirationDate: "",
    },
  ]);
  //lấy product từ redux
  const product = useSelector((state) => state.product.listProductBySupplier);
  console.log(product);
  //show
  const listItems = () => {
    return listProduct.map((item, index) => {
      return (
        <Addproduct
          key={index}
          isNew={item.isNew}
          id={index + 1}
          values={item}
          onClear={removeItemHandler.bind(this, item)}
          handleChange={handleChangeAll(index)}
          handleChangeSelect={handleChangeSelect(index)}
          handleChangeManufactureDate={handleChangeManufactureDate(index)}
          handleChangeExpirationDate={handleChangeExpirationDate(index)}
          product={product}
        ></Addproduct>
      );
    });
  };
  //xử lý thêm mới / nhưng cũ
  const addItemProductHandler = () => {
    setListProduct((prevState) => {
      return [
        ...prevState,
        {
          isNew: true,
          nameproduct: "",
          quantity: "",
          manufactureDate: "",
          expirationDate: "",
        },
      ];
    });
  };
  //xử lý thêm mới hoàn toàn
  const addItemProductNewHandler = () => {
    setListProduct((prevState) => {
      return [
        ...prevState,
        {
          isNew: false,
          nameproduct: "",
          quantity: "",
          manufactureDate: "",
          expirationDate: "",
        },
      ];
    });
  };
  //xóa
  const removeItemHandler = (selIndex) => {
    setListProduct((prevState) => {
      return prevState.filter((item, index) => item !== selIndex);
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
    console.log(listProduct);
  };
  //xứ lý ngày sản xuất
  const handleChangeManufactureDate = (id) => (e) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          newlist[i]["manufactureDate"] = e.toLocaleDateString();
        }
      }
      return newlist;
    });
    console.log(listProduct);
  };
  //xử lý chọn ngày sử dụng
  const handleChangeExpirationDate = (id) => (e) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          newlist[i]["expirationDate"] = e.toLocaleDateString();
        }
      }
      return newlist;
    });
    console.log(listProduct);
  };
  const handleChangeSelect = (id) => (e) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          newlist[i]["nameproduct"] = e.target.value;
        }
      }
      return newlist;
    });
    console.log(listProduct);
  };
  //xử lý PO
  const [timepoRequest, setTimePoRequest] = useState("");
  const onDelete = () => {
    setTimePoRequest("");
    setListProduct([]);
  };
  // lấy sản phẩm từ api
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const action = getProductBySupplier();
        const actionResult = await dispatch(action);
        unwrapResult(actionResult);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <ValidatorForm
      className={classes.form}
      ref={(r) => {
        form = r;
      }}
      instantValidate
    >
      <div className={classes.root}>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>{language.supplier}:</p>{" "}
          </nav>
          <nav>
            <TextValidator
              className={classes.textField}
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              type="text"
              value="Tra dao"
              readOnly={true}
            ></TextValidator>
          </nav>
        </div>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>{language.dateCreated}:</p>{" "}
          </nav>
          <nav>
            <ValidatedDatePicker
              autoOk
              variant="inline"
              className={classes.textFieldDate}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              size="small"
              style={{ width: "100%" }}
              InputAdornmentProps={{ position: "start" }}
              TextFieldComponent={TextFieldComponent}
              readOnly={true}
            />
          </nav>
        </div>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>{language.importDate}:</p>{" "}
          </nav>
          <nav>
            <ValidatedDatePicker
              autoOk
              variant="inline"
              className={classes.textFieldDate}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              size="small"
              validators={["required"]}
              errorMessages={["không để trống dòng này"]}
              style={{ width: "100%" }}
              InputAdornmentProps={{ position: "start" }}
              value={
                timepoRequest
                  ? moment(new Date(timepoRequest)).format("DD/MM/YYYY")
                  : ""
              }
              onChange={(e) => {
                setTimePoRequest(e.toLocaleDateString());
              }}
            />
          </nav>
        </div>
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
              classes={{
                root: classes.button, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            >
              <AddIcon />
            </IconButton>
            <Button
              variant="contained"
              classes={{
                root: classes.button, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              //   size="large"
              onClick={addItemProductNewHandler}
              startIcon={<AddIcon />}
            >
              {language.createNew}
            </Button>
          </nav>
        </div>
        <div className={classes.box1}>
          <p className={classes.labelId}>{language.listProducts}</p>
        </div>
        <div className={classes.box1}>{listItems()}</div>
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
    </ValidatorForm>
  );
};

export default AddPo;
