import React, { useState, useEffect } from "react";
import useHttp from "../../Hook/useHttp";
import importApi from "../../api/importApi";
import { CircularProgress } from "@material-ui/core";
import ImportItem from "./ImportItem";
const ImportItemView = (props) => {
  //khai báo form ban đầu rỗng
  const { id } = props;

  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(importApi.getPoImport, true);

  useEffect(() => {
    sendRequest(id);
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
        404
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
  return <ImportItem items={{ ...item }} idPo={id}></ImportItem>;
};

export default ImportItemView;
