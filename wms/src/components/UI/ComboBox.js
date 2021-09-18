/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { TextValidator } from "react-material-ui-form-validator";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
const Styles = makeStyles((theme) => ({
  textField: {
    padding: 0,
    margin: 0,
    float: "left",
    [`& fieldset`]: {
      borderRadius: 25,
      border: "1px solid #c5cae9",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      margin: 0,
      marginLeft: 0,
    },
  },
}));
export default function ComboBox(props) {
  const classes = Styles();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.product}
      getOptionLabel={(option) => option.name}
      style={{ width: "100%" }}
      name="nameproduct"
      onSelect={props.handleChange}
      fullWidth
      renderInput={(params) => (
        <TextValidator
          {...params}
          size="small"
          label={language.product}
          variant="outlined"
          fullWidth
          className={classes.textField}
          validators={["required"]}
          errorMessages={["không để trống dòng này"]}
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
