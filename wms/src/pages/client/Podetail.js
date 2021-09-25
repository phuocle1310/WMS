import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import PoItem from "../../components/Po/PoItem";
import Print from "../../components/UI/Print";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import useHttp from "../../Hook/useHttp";
//api
import poApi from "../../api/poApi";
const QuoteDetail = () => {
  const params = useParams();
  const { poId } = params;
  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(poApi.gePoDetail, true);

  useEffect(() => {
    sendRequest(poId);
    console.log(item);
  }, []);

  if (status === "pending") {
    return <CircularProgress />;
  }

  if (error) {
    console.log("hả");
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
    <>
      <Print>
        <PoItem items={{ ...item }}></PoItem>
      </Print>
    </>
  );
};

export default QuoteDetail;
