import React, { useState, useEffect } from "react";
import useHttp from "../../Hook/useHttp";
import poApi from "../../api/poApi";
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
  } = useHttp(poApi.ImportItem, true);

  useEffect(() => {
    sendRequest(id);
    console.log(item);
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
  return <ImportItem items={{ ...item }}></ImportItem>;
};

export default ImportItemView;
