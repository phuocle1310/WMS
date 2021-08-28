import React, { useState } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, Grid, Typography, Link, Box, Fab } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { ReactComponent as GG } from "../../../assets/Login/google.svg";
import FormLoginStyles from "./FormLoginStyles";

//lấy năm hiện tại
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Bản quyền thuộc về © "}
      <Link color="inherit" href="https://material-ui.com/">
        WMS.PY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const FormLogin = function FormLogin() {
  const classes = FormLoginStyles();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  //if is insSing bằng true => mở đăng nhập
  //state nhiều biến
  const [info, setInfo] = useState({
    formData: {
      email: "",
      password: "",
    },
  });
  //handler xử lý sự kiện onchange
  const handleChange = (event) => {
    const { formData } = info;
    formData[event.target.name] = event.target.value;
    setInfo({ formData });
  };

  //submit
  const handleSubmit = () => {
    // your submit logic
  };
  //
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
          <p>Chào mừng bạn, tham gia sử dụng web bằng cách đăng nhập!!!</p>
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
          id="email"
          label="Tên đăng nhập *"
          autoFocus
          onChange={handleChange}
          value={info.formData.email}
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
