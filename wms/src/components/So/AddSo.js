import React, { useState } from "react";
import { useMinimalSelectStyles } from "@mui-treasury/styles/select/minimal";
import ValidatedDatePicker from "../UI/ValidatedDatePicker";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextValidator } from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Addproduct from "../Product/Addproduct";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
//css
import FormStyles from "./FormStyles";
const AddSo = (props) => {
  const classes = FormStyles();

  //khai báo form ban đầu rỗng
  let form = null;
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
  //show
  const listItems = () => {
    return listProduct.map((item, index) => {
      return (
        <Addproduct
          key={index}
          isNew={item.isNew}
          id={index + 1}
          values={item}
          onClear={removeItemHandler.bind(this, index)}
          handleChange={handleChangeAll(index)}
          handleChangeSelect={handleChangeSelect(index)}
          handleChangeManufactureDate={handleChangeManufactureDate(index)}
          handleChangeExpirationDate={handleChangeExpirationDate(index)}
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
      return prevState.filter((item, index) => index !== selIndex);
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
            <p className={classes.labelId}>Nhà cung cấp:</p>{" "}
          </nav>
          <nav>
            <TextValidator
              className={classes.textField}
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              type="text"
            ></TextValidator>
          </nav>
        </div>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>Ngày tạo:</p>{" "}
          </nav>
          <nav>
            <ValidatedDatePicker
              autoOk
              variant="inline"
              className={classes.textFieldDate}
              inputVariant="outlined"
              format="MM/dd/yyyy"
              size="small"
              validators={["required"]}
              errorMessages={["không để trống dòng này"]}
              style={{ width: "100%" }}
              InputAdornmentProps={{ position: "start" }}
              TextFieldComponent={TextFieldComponent}
              readOnly={true}
            />
          </nav>
        </div>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>Ngày xuất:</p>{" "}
          </nav>
          <nav>
            <ValidatedDatePicker
              autoOk
              variant="inline"
              className={classes.textFieldDate}
              inputVariant="outlined"
              format="MM/dd/yyyy"
              size="small"
              validators={["required"]}
              errorMessages={["không để trống dòng này"]}
              style={{ width: "100%" }}
              InputAdornmentProps={{ position: "start" }}
            />
          </nav>
        </div>
        <div className={classes.box}>
          <nav>
            <p className={classes.labelId}>Thêm sản phẩm:</p>{" "}
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
              tạo mới
            </Button>
          </nav>
        </div>
        <div className={classes.box1}>
          <p className={classes.labelId}>Danh sách sản phẩm:</p>
        </div>
        <div className={classes.box1}>{listItems()}</div>
      </div>
      <div className={classes.box1}>
        <Button
          variant="contained"
          type="submit"
          classes={{
            root: classes.submit, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
        >
          Gửi yêu cầu
        </Button>
      </div>
    </ValidatorForm>
  );
};

export default AddSo;
