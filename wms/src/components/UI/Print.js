import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import Button from "@material-ui/core/Button";
import PrintIcon from "@material-ui/icons/Print";
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  label: {
    textTransform: "capitalize",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),

    background: "#E4544B",
    borderRadius: 25,
    border: 0,
    color: "white",
    height: 48,
    // width: "100px",
    padding: "0 30px",
    "&:hover": {
      background: "#E4544B",
    },
    float: "left",
    marginRight: 15,
    fontSize: 13,
    "&:first-child": {
      background: "#000",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 15,
    },
  },
}));

class ComponentToPrint extends React.PureComponent {
  render() {
    return this.props.children;
  }
}

const Example = (props) => {
  const componentRef = useRef();
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  const classes = useStyles();
  return (
    <div>
      <ComponentToPrint ref={componentRef}>{props.children}</ComponentToPrint>
      <ReactToPrint
        trigger={() => (
          <Button
            variant="contained"
            classes={{
              root: classes.submit, // class name, e.g. `classes-nesting-root-x`
              label: classes.label, // class name, e.g. `classes-nesting-label-x`
            }}
            startIcon={<PrintIcon />}
          >
            {language.print}
          </Button>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
};
export default Example;
