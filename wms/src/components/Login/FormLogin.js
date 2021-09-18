import React, { useState, useEffect } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, Grid, Typography, Link, Box } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import FormLoginStyles from "./FormLoginStyles";
import MulLanguage from "../../assets/language/MulLanguage";
import { useHistory } from "react-router";
//api
import userApi from "../../../src/api/userApi";
//cookies
import cookies from "react-cookies";
//redux
import { getMe } from "../../store/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

//lấy năm hiện tại
function Copyright() {
  const language = MulLanguage["vn"];
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Bản quyền thuộc về © "}
      <Link color="inherit" href="https://material-ui.com/">
        WMS.PY {language.welcome}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const FormLogin = function FormLogin() {
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const classes = FormLoginStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [issErr, setIsErr] = useState(false);
  const history = useHistory();
  //if is insSing bằng true => mở đăng nhập
  //state nhiều biến
  const [info, setInfo] = useState({
    formData: {
      username: "",
      password: "",
    },
  });
  //handler xử lý sự kiện onchange
  const handleChange = (event) => {
    const { formData } = info;
    formData[event.target.name] = event.target.value;
    setInfo({ formData });
  };
  const dispatch = useDispatch();
  //submit
  const handleSubmit = (e) => {
    //gửi nguyên trang
    e.preventDefault();
    // xử lý đăng nhập
    const fetchLogin = async () => {
      try {
        //gọi từ axios
        // const response = await userApi.login()
        const authInfo = await userApi.getAuthInfo();
        console.log(authInfo);
        //from data
        const fromData = {
          ...info.formData,
          grant_type: "password",
          ...authInfo,
        };
        const response = await userApi.login(fromData);
        //lưu vô cookie
        cookies.save("access-token", response.access_token);
        const action = getMe();
        const actionResult = await dispatch(action);
        //update thong tin user
        unwrapResult(actionResult);
        //chuyen qua trang chu
        history.replace("/");
      } catch (error) {
        setIsErr(true);
      }
    };
    fetchLogin();
  };

  const vali = ["required"];
  const errorShow = ["không để trống dòng này"];
  return (
    <div className={classes.paper}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Grid item className={classes.avatar}>
          <Link href="#" variant="body2">
            <h1> WMS.PY</h1>
          </Link>
          <p>{language.welcomelogin}</p>
        </Grid>
      </Grid>
      <Typography fontWeight="fontWeightBold" component="h1">
        <Box
          fontWeight="fontWeightBold"
          fontSize="h6.fontSize"
          m={4}
          className={classes.color}
        >
          Đăng nhập
        </Box>
      </Typography>
      <ValidatorForm
        className={classes.form}
        //ref="form"
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
      >
        <TextValidator
          className={classes.textField}
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Tên đăng nhập *"
          autoFocus
          onChange={handleChange}
          value={info.formData.username}
          name="username"
          validators={["required"]}
          errorMessages={["không để trống dòng này"]}
        />
        <TextValidator
          onChange={handleChange}
          value={info.formData.password}
          validators={vali}
          errorMessages={errorShow}
          className={classes.textField}
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Mật Khẩu *"
          id="password"
          autoComplete="current-password"
          type={showPassword ? "text" : "password"} // <-- This is where the magic happens
          // onChange={someChangeHandler}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {issErr && (
          <p style={{ textAlign: "center", color: "red" }}>
            {language.errLogin}
          </p>
        )}
        <Button
          type="submit"
          classes={{
            root: classes.submit, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
        >
          Đăng nhập
        </Button>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Grid item className={classes.avatar}>
            <Link href="#" variant="body2">
              Quên mật khẩu?
            </Link>
          </Grid>
        </Grid>
      </ValidatorForm>
      <Box mt={15}>
        <Copyright />
      </Box>
    </div>
  );
};
export default FormLogin;
