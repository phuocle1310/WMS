import React, { useEffect } from "react";
import useHttp from "../../Hook/useHttp";
import importApi from "../../api/importApi";
import { CircularProgress } from "@material-ui/core";
import ImportItem from "./ImportItem";
const ImportItemView = (props) => {
  //khai báo form ban đầu rỗng
  const { id, index } = props;

  const {
    sendRequest,
    status,
    data: item,
    error,
  } = useHttp(
    index === 2 ? importApi.getPoImportInprocess : importApi.getPoImportFinish,
    true,
  );

  useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);

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
  return <ImportItem items={{ ...item }} idPo={id} index={index}></ImportItem>;
};

export default ImportItemView;
