import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import SoItem from "../../components/So/SoItem";
import Print from "../../components/UI/Print";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import useHttp from "../../Hook/useHttp";
//api
import soApi from "../../api/soApi";
const SoDetail = (props) => {
  const params = useParams();
  const { soId } = params;
  // const poId = props.poId;
  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(soApi.getSoDetail, true);

  useEffect(() => {
    sendRequest(soId);
  }, []);

  if (status === "pending") {
    return (
      <div className="centered" style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        {error}
      </p>
    );
  }

  if (!item) {
    return (
      <p className="centered" style={{ margin: 300 }}>
        {item.id}
      </p>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Print>
        <SoItem items={{ ...item }}></SoItem>
      </Print>
    </div>
  );
};

export default SoDetail;
