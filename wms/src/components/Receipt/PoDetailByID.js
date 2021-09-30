import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import PoItem from "../../components/Po/PoItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import useHttp from "../../Hook/useHttp";
//api
import poApi from "../../api/poApi";
const PoDetailByID = (props) => {
  const { status, data: item, error } = props;

  if (status === "pending") {
    return <CircularProgress />;
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
  return <PoItem items={{ ...item }}></PoItem>;
};

export default PoDetailByID;
