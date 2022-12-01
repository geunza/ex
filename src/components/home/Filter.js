import React, { useState, useEffect } from "react";
import styles from "scss/components/home/Filter.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSupportInfo } from "redux/store/supportInfoSlice";
const Filter = () => {
  const dispatch = useDispatch();
  const supportInfo = useSelector((state) => state.supportInfo);
  const [prd, setPrd] = useState([]); // 창업기간
  const [spt, setSpt] = useState([]); // 지원분야
  const [biz, setBiz] = useState([]); // 사업분야
  const [tech, setTech] = useState([]); //기술분야
  const [loc, setLoc] = useState([]); // 지역
  const getFilterData = (code, setter) => {
    axios({
      url: `/common/codeDtlList?ctgCd=${code}`,
      method: "POST",
    }).then((res) => {
      setter(res.data);
    });
  };
  const filterBtnClick = (item) => {
    dispatch(setSupportInfo(item));
  };
  useEffect(() => {
    getFilterData("prd_cd", setPrd); // 창업기간
    getFilterData("spt_cd", setSpt); // 지원분야
    getFilterData("biz_cd", setBiz); // 사업분야
    getFilterData("tech_cd", setTech); // 기술분야
    getFilterData("loc_cd", setLoc); // 지역
  }, []);
  useEffect(() => {
    // console.log(prd);
    // console.log(spt);
    // console.log(biz);
    // console.log(tech);
    // console.log(loc);
  }, [prd]);
  return (
    <>
      <div className={styles.Filter}>
        <h3>맞춤 지원사업 조회</h3>
        <div className={styles.custom}>
          <div className={styles.topArea}></div>
          <div>
            {prd.map((item, idx, arr) => {
              return (
                <button
                  key={item.code}
                  className={
                    supportInfo[item.ctg_cd].datas.find(
                      (x) =>
                        Object.entries(x).toString() ==
                        Object.entries(item).toString()
                    )
                      ? "selected"
                      : null
                  }
                  onClick={() => {
                    filterBtnClick(item);
                  }}
                >
                  {item.code_nm}
                </button>
              );
            })}
          </div>
          <div>
            {spt.map((item, idx, arr) => {
              return (
                <button
                  key={item.code}
                  className={
                    supportInfo[item.ctg_cd].datas.find(
                      (x) =>
                        Object.entries(x).toString() ==
                        Object.entries(item).toString()
                    )
                      ? "selected"
                      : null
                  }
                  onClick={() => {
                    filterBtnClick(item);
                  }}
                >
                  {item.code_nm}
                </button>
              );
            })}
          </div>
          <div>
            {biz.map((item, idx, arr) => {
              return (
                <button
                  key={item.code}
                  className={
                    supportInfo[item.ctg_cd].datas.find(
                      (x) =>
                        Object.entries(x).toString() ==
                        Object.entries(item).toString()
                    )
                      ? "selected"
                      : null
                  }
                  onClick={() => {
                    filterBtnClick(item);
                  }}
                >
                  {item.code_nm}
                </button>
              );
            })}
          </div>
          <div>
            {tech.map((item, idx, arr) => {
              return (
                <button
                  key={item.code}
                  className={
                    supportInfo[item.ctg_cd].datas.find(
                      (x) =>
                        Object.entries(x).toString() ==
                        Object.entries(item).toString()
                    )
                      ? "selected"
                      : null
                  }
                  onClick={() => {
                    filterBtnClick(item);
                  }}
                >
                  {item.code_nm}
                </button>
              );
            })}
          </div>
          <div>
            {loc.map((item, idx, arr) => {
              return (
                <button
                  key={item.code}
                  className={
                    supportInfo[item.ctg_cd].datas.find(
                      (x) =>
                        Object.entries(x).toString() ==
                        Object.entries(item).toString()
                    )
                      ? "selected"
                      : null
                  }
                  onClick={() => {
                    filterBtnClick(item);
                  }}
                >
                  {item.code_nm}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
