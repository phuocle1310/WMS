import React, { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import PoItem from "../../components/Po/PoItem";
import Print from "../../components/UI/Print";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import useHttp from "../../Hook/useHttp";
//api
import poApi from "../../api/poApi";
const Podetail = (props) => {
  const params = useParams();
  const { poId } = params;

  return (
    <div style={{ width: "100%" }}>
      <Print>
        <PoItem id={poId}></PoItem>
      </Print>
    </div>
  );
};

export default Podetail;
