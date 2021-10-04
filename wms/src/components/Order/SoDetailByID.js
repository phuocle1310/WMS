import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import SoItem from "../So/SoItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import useHttp from "../../Hook/useHttp";
//api
const SoDetailByID = (props) => {
  const { status, data: item, error } = props;

  if (status === "pending") {
    return (
      <div className="centered" style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <p className="centered" style={{ margin: 200, textAlign: "center" }}>
        Not Found
      </p>
    );
  }

  if (!item) {
    return (
      <p className="centered" style={{ margin: 200 }}>
        Not Data
      </p>
    );
  }
  return <SoItem items={{ ...item }}></SoItem>;
};

export default SoDetailByID;
