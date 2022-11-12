import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "components/home/FilterButton";
import FilterSelect from "components/home/FilterSelect";
import FilterModal from "components/home/FilterModal";
import axios from "axios";
import styles from "scss/components/home/Filter.module.scss";
import { useSelector } from "react-redux";
const Filter = ({ modalOpener, setModalOn, modalOn, Modal1 }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState(supportInfo);
  const [dataDummy1, setDataDummy1] = useState([]);
  const [dataDummy2, setDataDummy2] = useState([]);
  const getFilterDataDummy = () => {
    axios.get("/db/supportData1.json").then((res) => {
      const data = res.data;
      setDataDummy1(data);
    });
    axios.get("/db/supportData2.json").then((res) => {
      const data = res.data;
      setDataDummy2(data);
    });
  };

  useEffect(() => {
    getFilterDataDummy();
  }, []);
  //
  //
  //

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const getFilterData = () => {
    axios.get("/db/filterData.json").then((res) => {
      const data = res.data;
      setData1(data.btnData);
      setData2(data.sltData);
    });
  };
  const clickSubmit = (e) => {
    const {
      currentTarget: { name },
    } = e;
    if (name == "login") {
      if (isLoggedIn == true) {
        console.log("loginO");
      } else {
        e.preventDefault();
        console.log("loginX");
      }
    } else if (name == "noLogin") {
      console.log("noLogin");
    }
  };
  const filterSubmit = (e) => {
    //맞춤 지원사업 조회 전송
    console.log(e);
    e.preventDefault();
  };
  useEffect(() => {
    getFilterData();
  }, []);
  return (
    <>
      <form className={styles.Filter} onSubmit={filterSubmit}>
        {/* <button type="button" name="Modal2" value={true} onClick={modalOpener}>
        모달2 오픈
      </button> */}
        <h3>맞춤 지원사업 조회</h3>
        <div className={styles.custom}>
          <div className={styles.topArea}>
            <ul>
              {dataDummy1.map((v, i) => {
                return (
                  <FilterButton
                    key={v.name}
                    v={v}
                    i={i}
                    styles={styles}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                );
              })}
            </ul>
            <ul>
              <li className={styles.sltItem}>
                <button
                  type="button"
                  name="Modal1"
                  value={true}
                  onClick={modalOpener}
                  style={{
                    position: "absolute",
                  }}
                >
                  모달1 오픈
                </button>
                {data2.map((v, i) => {
                  const idx = i + data1.length;
                  return (
                    <FilterSelect
                      key={v.name}
                      v={v}
                      i={i}
                      idx={idx}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                    />
                  );
                })}
              </li>
            </ul>
          </div>
          <div className={styles.bottomArea}>
            <button type="submit" name="login" onClick={clickSubmit}>
              <span>
                {isLoggedIn
                  ? "맞춤 지원사업 조회하기"
                  : "로그인하고 맞춤 지원사업 조회하기"}
              </span>
            </button>
            {isLoggedIn == false ? (
              <button type="submit" name="noLogin" onClick={clickSubmit}>
                <span>비회원으로 조회하기</span>
              </button>
            ) : null}
          </div>
        </div>
      </form>
      {modalOn && Modal1 ? <FilterModal modalOpener={modalOpener} /> : null}
    </>
  );
};
export default Filter;
