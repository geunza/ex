import styles from "scss/components/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import AppRouter from "components/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setSupportInfo1 } from "redux/store";
function App() {
  const dispatch = useDispatch();
  const filterData1 = useSelector((state) => state.supportInfo1);
  const getFilterData = (code) => {
    axios({
      url: `/common/codeDtlList?ctgCd=${code}`,
      method: "POST",
    }).then((res) => {
      const data = res.data;
      console.log("a");
      // dispatch(setSupportInfo1({ name: code, value: data }));
      // dispatch(setSupportInfo1({ name: code, value: data }));
    });
  };
  useEffect(() => {
    for (let key in filterData1) {
      console.log(key);
      getFilterData(key);
      getFilterData(key);
      getFilterData(key);
      getFilterData(key);
    }
  }, []);
  useEffect(() => {
    console.log(filterData1);
  }, [filterData1]);
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
