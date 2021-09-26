// /* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { TextValidator } from "react-material-ui-form-validator";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
// const Styles = makeStyles((theme) => ({
//   textField: {
//     padding: 0,
//     margin: 0,
//     float: "left",
//     [`& fieldset`]: {
//       borderRadius: 25,
//       border: "1px solid #c5cae9",
//     },
//     "& .MuiOutlinedInput-inputMarginDense": {
//       margin: 0,
//       marginLeft: 0,
//     },
//   },
// }));
// export default function ComboBox(props) {
//   const classes = Styles();
//   const currentLanguage = useSelector(
//     (state) => state.currentLanguage.currentLanguage,
//   );
//   const language = MulLanguage[`${currentLanguage}`];
//   console.log("value", props.value);

//   return (
//     <Autocomplete
//       id="combo-box-demo"
//       options={props.product}
//       getOptionLabel={(option) => option.name || ""}
//       // onChange={(event, newValue) => {
//       //   setValue(newValue);
//       // }}
//       renderOption={(option) => (
//         <React.Fragment>
//           {option.id} - ({option.name})
//         </React.Fragment>
//       )}
//       style={{ width: "200px" }}
//       name="nameproduct"
//       onSelect={props.handleChange}
//       fullWidth
//       renderInput={(params) => {
//         console.log("rerender", params);
//         return (
//           <TextValidator
//             {...params}
//             size="small"
//             // value={props.value || ""}
//             label={language.product}
//             variant="outlined"
//             fullWidth
//             className={classes.textField}
//             required
//           />
//         );
//       }}
//     />
//   );
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const options = ["Option 1", "Option 2"];
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
  const { value, handlesetValue, product } = props;

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={handlesetValue}
        id="controllable-states-demo"
        style={{ width: "250px" }}
        fullWidth
        options={product}
        renderOption={(option) => (
          <React.Fragment>
            {option.id
              ? option.id.toString() + " " + option.name
              : option.name + "-total: " + option.Qty_total}
          </React.Fragment>
        )}
        getOptionLabel={(option) => option.name || ""}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextValidator
            {...params} //
            size="small"
            required
            label={language.product}
            variant="outlined"
            fullWidth
            className={classes.textField}
            requiredlabel="Controllable"
          />
        )}
      />
    </div>
  );
}
