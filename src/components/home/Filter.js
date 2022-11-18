import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "components/home/FilterButton";
import FilterSelect from "components/home/FilterSelect";
import FilterModal from "components/home/FilterModal";
import axios from "axios";
import styles from "scss/components/home/Filter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "store/supportInfoSlice";
const Filter = ({ modalOpener, setModalOn, modalOn, Modal1 }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState(supportInfo);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [modalStep, setModalStep] = useState(0);
  const [modalSet, setModalSet] = useState({});
  const getFilterData = () => {
    axios.get("/db/supportData1.json").then((res) => {
      const data = res.data;
      setData1(data);
    });
    axios.get("/db/supportData2.json").then((res) => {
      const data = res.data;
      setData2(data);
    });
  };
  const clickSubmit = (e) => {
    const {
      currentTarget: { name },
    } = e;
    if (name == "login") {
      if (isLoggedIn == true) {
        navigate("/support/supportList");
      } else {
        e.preventDefault();
        alert("로그인하세용");
      }
    } else if (name == "noLogin") {
      navigate("/support/supportList");
    }
  };
  const filterSubmit = (e) => {
    //맞춤 지원사업 조회 전송
    console.log(e);
    e.preventDefault();
  };
  const infoBtnClick = (e, infoName, multiply, order) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인X");
      return false;
    }
    dispatch(
      setSupportInfo({
        name: infoName,
        value: value,
        multiply: multiply,
        order: order,
      })
    );
  };
  useEffect(() => {
    setSelectedItems(supportInfo);
  }, [supportInfo]);
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
              {data1.map((v, i) => {
                return (
                  <FilterButton
                    key={v.name}
                    v={v}
                    i={i}
                    styles={styles}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    infoBtnClick={infoBtnClick}
                  />
                );
              })}
              <li className={styles.sltItem}>
                {data2.map((v, i) => {
                  return (
                    <div key={i}>
                      <p>{v.name}</p>
                      <ol>
                        <li>
                          <button
                            type="button"
                            name="Modal1"
                            value={true}
                            onClick={(e) => {
                              setModalStep(i);
                              modalOpener(e);
                            }}
                          >
                            {selectedItems[v.data[v.data.length - 1].infoName]
                              .length > 1
                              ? `${
                                  selectedItems[
                                    v.data[v.data.length - 1].infoName
                                  ][0].text
                                } 외 ${
                                  selectedItems[
                                    v.data[v.data.length - 1].infoName
                                  ].length - 1
                                }건`
                              : selectedItems[
                                  v.data[v.data.length - 1].infoName
                                ].length == 1
                              ? `${
                                  selectedItems[
                                    v.data[v.data.length - 1].infoName
                                  ][0].text
                                }`
                              : "없어용"}
                          </button>
                        </li>
                      </ol>
                    </div>
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
      {modalOn && Modal1 ? (
        <FilterModal
          modalOpener={modalOpener}
          modalStep={modalStep}
          setModalStep={setModalStep}
          data2={data2}
          selectedItems={selectedItems}
        />
      ) : null}
    </>
  );
};
export default Filter;
