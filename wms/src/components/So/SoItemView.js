import React, { useState, useEffect } from "react";
import useHttp from "../../Hook/useHttp";
import soApi from "../../api/soApi";
import { CircularProgress } from "@material-ui/core";
import SoItem from "./SoItem";
const SoItemView = (props) => {
  //khai báo form ban đầu rỗng
  const { id } = props;

  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(soApi.getSoDetail, true);

  useEffect(() => {
    sendRequest(id);
    console.log(item);
  }, []);

  if (status === "pending") {
    return <CircularProgress />;
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
  return <SoItem items={{ ...item }}></SoItem>;
};

export default SoItemView;
