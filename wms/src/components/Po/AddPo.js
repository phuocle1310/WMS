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
import FormStyles from "./FormStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector, useDispatch } from "react-redux";
//api
import productApi from "../../api/productApi";
const AddPo = (props) => {
  const classes = FormStyles();
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
  // lấy sản phẩm từ api
  let [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductBySupplier();
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
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
  };
  const getItem = (e) => {
    const item = product.find(({ name }) => name === e);
    return item;
  };
  const handleChangeSelect = (id) => (e) => {
    setListProduct((prevState) => {
      let newlist = [...prevState];
      for (let i = 0; i < newlist.length; i++) {
        if (i === id) {
          console.log("vo");
          newlist[i]["nameproduct"] = e.target.value;
          if (newlist[i]["nameproduct"]) {
            const item = getItem(e.target.value);
            newlist[i]["manufactureDate"] = item.expire_date;
            newlist[i]["expirationDate"] = item.production_date;
          }
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

  return (
    <ValidatorForm
      className={classes.form}
      ref={(r) => {
        form = r;
      }}
      instantValidate
    >
      <div className={classes.root}>
        <Grid container>
          <Grid item lg={3}>
            <p className={classes.labelId}>{language.supplier}:</p>{" "}
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
            <p className={classes.labelId}>{language.dateCreated}:</p>{" "}
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
            <p className={classes.labelId}>{language.importDate}:</p>{" "}
            <ValidatedDatePicker
              autoOk
              variant="inline"
              className={classes.textFieldDate}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              size="small"
              validators={["required"]}
              errorMessages={["không để trống dòng này"]}
              minDate={new Date()}
              style={{ width: "100%" }}
              InputAdornmentProps={{ position: "start" }}
              value={timepoRequest}
              onChange={(date) => {
                setTimePoRequest(date);
              }}
            />
          </Grid>
          <Grid item lg={9}>
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
              </nav>
            </div>
            <div className={classes.box}>
              <p className={classes.labelId}>{language.listProducts}</p>
            </div>
            <div className={classes.box1}>{listItems()}</div>
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
    </ValidatorForm>
  );
};

export default AddPo;
