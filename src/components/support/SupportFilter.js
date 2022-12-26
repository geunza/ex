import React from "react";
import styles from "scss/pages/SupportList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setSupportInfo,
  setSupportInfoModal,
  setLoginCheck,
} from "redux/store";
import { useEffect, useState } from "react";
import Tooltip from "components/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
const SupportFilter = ({
  getSupportCont,
  setScrollStorage,
  allSupport,
  setAllSupport,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportItem = useSelector((state) => state.supportItem);
  const supportInfo = useSelector((state) => state.supportInfo);
  const location = useLocation();
  const [objDummy, setObjDummy] = useState({ ...supportInfo });
  const [modalIdx, setModalIDx] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const modalControl = (step) => {
    // 안열려있을때
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
      return false;
    }
    if (modalOn == false) {
      setModalOn(true);
      setModalIDx(step);
    } else {
      if (step == modalIdx) {
        setModalOn(false);
      } else {
        setModalIDx(step);
      }
    }
    // 열려있는데 다른거 눌렀을때
    // 열려있는거 누를때
  };
  const filterBtnClick = (item, e) => {
    const cate = item.ctg_cd;
    const name = item.code_nm;
    let copy = JSON.parse(JSON.stringify(objDummy));
    const require = copy[cate].require;
    const multiply = copy[cate].multiply;
    if (multiply) {
      console.log("A");
      if (name == "전체" || name == "전국") {
        if (
          copy[cate].datas
            .filter((x) => x.code_nm != "전체")
            .filter((x) => x.code_nm != "전국").length == 0
        ) {
          alert("한가지 이상 선택해주세요.");
        }
        copy[cate].datas = [item];
      } else {
        copy[cate].datas = copy[cate].datas
          .filter((x) => x.code_nm != "전체")
          .filter((x) => x.code_nm != "전국");
        if (someItem(copy[cate].datas, item)) {
          if (require && copy[cate].datas.length == 1) {
            alert("한가지 이상 선택해주세요.");
          } else {
            copy[cate].datas = filterItem(copy[cate].datas, item);
          }
        } else {
          if (cate == "loc_cd") {
            copy[cate].datas = addItemLoc(copy[cate].datas, item);
          } else {
            copy[cate].datas = addItem(copy[cate].datas, item);
          }
        }
      }
    } else {
      console.log("B");
      if (someItem(copy[cate].datas, item)) {
        if (require) {
          alert("한가지 이상 선택해주세요.");
        }
      } else {
        copy[cate].datas = [item];
      }
    }
    setObjDummy(copy);

    function addItemLoc(target, item) {
      const sortArr = [...target, item].sort((a, b) => {
        return a.code.replace("C", "") - b.code.replace("C", "");
      });
      if (sortArr.some((item) => item.code == "C82")) {
        if (sortArr.length == 1) {
          return sortArr;
        } else {
          const tObj = sortArr.find((item) => item.code == "C82");
          const tIdx = sortArr.findIndex((item) => item.code == "C82");
          sortArr.splice(tIdx, 1);
          sortArr.unshift(tObj);
        }
      }
      return sortArr;
    }
  };
  const filterModalSubmit = () => {
    for (let key in objDummy) {
      dispatch(setSupportInfoModal({ name: key, datas: objDummy[key].datas }));
    }
    setModalOn(false);
  };

  const tooltipOpen = (e) => {
    e.stopPropagation();
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  function someItem(target, item) {
    return target.some(
      (x) => Object.entries(x).toString() == Object.entries(item).toString()
    );
  }
  function filterItem(target, item) {
    return target.filter(
      (x) => Object.entries(x).toString() != Object.entries(item).toString()
    );
  }
  function addItem(target, item) {
    const sortArr = [...target, item].sort((a, b) => {
      return a.code - b.code;
    });
    return sortArr;
  }
  const [renderItems, setRenderItems] = useState([]);

  function navigateSearchTxt(name, value) {
    const searchTxt = location.search;
    const searchArr = searchTxt.replace("?", "").split("&");
    let searchObj = {};
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decodeURI(arrObj[1]);
    });
    let newSearchTxt = "";
    for (let key in searchObj) {
      if (searchObj[key] == "undefined" || key == name) {
        continue;
      } else if (key == "page") {
        newSearchTxt += `page=1&`;
      } else {
        newSearchTxt += `${key}=${searchObj[key]}&`;
      }
    }
    newSearchTxt += `${name}=${value}`;
    navigate("?" + newSearchTxt);
  }
  useEffect(() => {
    setRenderItems([]);
    for (let key in supportInfo) {
      setRenderItems((prev) => [...prev, key]);
    }
  }, [supportInfo]);
  useEffect(() => {
    setObjDummy({ ...supportInfo });
  }, [modalIdx, modalOn]);
  return (
    <>
      <div className={styles.SupportFilter}>
        <h4>
          <span>
            조회 필터
            <i className="btnToolTip" onClick={tooltipOpen}>
              <img
                src={require("assets/img/global/btn/btn_tooltip.png")}
                alt="tooltip"
              />
              <Tooltip
                cont={
                  "입력한 정보는 저장되며 해당 정보를 기반으로 맞춤 추천이 진행됩니다."
                }
              />
            </i>
          </span>
        </h4>
        <div className={styles.chkArea}>
          <input
            type="checkbox"
            id="chkAll"
            checked={allSupport}
            onChange={(e) => {
              if (!isLoggedIn) {
                dispatch(setLoginCheck(true));
                return false;
              }
              navigateSearchTxt("all", e.currentTarget.checked);
              setAllSupport(e.currentTarget.checked);
            }}
          />
          <label htmlFor="chkAll">전체 지원사업 보기</label>
        </div>
        <div className={styles.filterBox}>
          <ul className={styles.filterList}>
            {renderItems.map((cate, idx) => {
              if (cate == "biz_cd") return false;
              if (cate == "tech_cd") {
                return (
                  <li className={styles.filterItem} key={idx}>
                    <button
                      type="button"
                      onClick={() => {
                        modalControl(idx);
                      }}
                    >
                      <div className={styles.itemTit}>
                        <span>{supportInfo[cate].name}</span>
                        <div className={styles.arr}>
                          <img
                            src={require("assets/img/global/btn/btn_arr.png")}
                            alt="Select"
                          />
                        </div>
                      </div>
                      <p className={styles.currentSelected}>
                        {supportInfo[cate].datas.length > 1
                          ? `${supportInfo[cate].datas[0].code_nm} 외 ${
                              supportInfo[cate].datas.length - 1
                            }건`
                          : supportInfo[cate].datas.length == 1
                          ? supportInfo[cate].datas[0].code_nm
                          : "선택"}
                      </p>
                    </button>
                    {modalOn && modalIdx == idx && (
                      <div className={styles.filterItemModal}>
                        <div className={styles.modalCont}>
                          <p className={styles.itemTit}>
                            {supportInfo.biz_cd.name}
                          </p>
                          <ul>
                            {supportItem.biz_cd.map((item, idx) => {
                              return (
                                <li>
                                  <button
                                    className={
                                      someItem(objDummy.biz_cd.datas, item)
                                        ? styles.selected
                                        : null
                                    }
                                    onClick={(e) => {
                                      filterBtnClick(item, e);
                                    }}
                                  >
                                    {item.code_nm}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                          <p className={styles.itemTit}>
                            {supportInfo[cate].name}
                          </p>
                          <ul>
                            {supportItem[cate].map((item, idx) => {
                              return (
                                <li>
                                  <button
                                    className={
                                      someItem(objDummy[cate].datas, item)
                                        ? styles.selected
                                        : null
                                    }
                                    onClick={(e) => {
                                      filterBtnClick(item, e);
                                    }}
                                  >
                                    {item.code_nm}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className={styles.modalConfirm}>
                          <button
                            className={styles.submitBtn}
                            onClick={filterModalSubmit}
                          >
                            선택완료
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li className={styles.filterItem} key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      modalControl(idx);
                    }}
                  >
                    <div className={styles.itemTit}>
                      <span>{supportInfo[cate].name}</span>
                      <div className={styles.arr}>
                        <img
                          src={require("assets/img/global/btn/btn_arr.png")}
                          alt="Select"
                        />
                      </div>
                    </div>
                    <p className={styles.currentSelected}>
                      {supportInfo[cate].datas.length > 1
                        ? `${supportInfo[cate].datas[0].code_nm} 외 ${
                            supportInfo[cate].datas.length - 1
                          }건`
                        : supportInfo[cate].datas.length == 1
                        ? supportInfo[cate].datas[0].code_nm
                        : "선택"}
                    </p>
                  </button>
                  {modalOn && modalIdx == idx && (
                    <div className={styles.filterItemModal}>
                      <div className={styles.modalCont}>
                        <p className={styles.itemTit}>
                          {supportInfo[cate].name}
                        </p>
                        <ul>
                          {supportItem[cate].map((item, idx) => {
                            return (
                              <li>
                                <button
                                  className={
                                    someItem(objDummy[cate].datas, item)
                                      ? styles.selected
                                      : null
                                  }
                                  onClick={(e) => {
                                    filterBtnClick(item, e);
                                  }}
                                >
                                  {item.code_nm}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className={styles.modalConfirm}>
                        <button
                          className={styles.submitBtn}
                          onClick={filterModalSubmit}
                        >
                          선택완료
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.submitArea}>
            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                } else {
                  navigate("./");
                  getSupportCont("전체", "");
                  setScrollStorage(window.scrollY);
                }
              }}
            >
              <span>조회</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportFilter;
