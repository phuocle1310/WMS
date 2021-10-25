import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
//css
import FormStyles from "../Po/FormStyles";
//lang
import MulLanguage from "../../assets/language/MulLanguage";
import { useSelector } from "react-redux";

const ConfirmExport = (props) => {
  const { id } = props;
  const classes = FormStyles();
  //lang
  const currentLanguage = useSelector(
    (state) => state.currentLanguage.currentLanguage,
  );
  const language = MulLanguage[`${currentLanguage}`];
  //khai báo form ban đầu rỗng

  return (
    <>
      <div className={classes.box}>
        <p className={classes.labelId} style={{ padding: 20 }}>
          {language.confirmImport}
        </p>
      </div>
      <div className={classes.box2}>
        <Button
          variant="contained"
          onClick={props.onDelete}
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
          onClick={props.onSubmitImport}
          classes={{
            root: classes.submit, // class name, e.g. `classes-nesting-root-x`
            label: classes.label, // class name, e.g. `classes-nesting-label-x`
          }}
          startIcon={<SendIcon />}
        >
          {language.sendRequire}
        </Button>
      </div>
    </>
  );
};

export default ConfirmExport;
