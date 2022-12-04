import React from "react";
import styles from "scss/components/support/SupportFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo, setSupportInfoModal } from "redux/store";
import { useEffect, useState } from "react";
import Tooltip from "components/Tooltip";
const SupportFilter = ({}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportItem = useSelector((state) => state.supportItem);
  const supportInfo = useSelector((state) => state.supportInfo);
  const [objDummy, setObjDummy] = useState({ ...supportInfo });
  const [modalIdx, setModalIDx] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const modalControl = (step) => {
    // 안열려있을때
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
    let copy = JSON.parse(JSON.stringify(objDummy));
    const require = copy[cate].require;
    const multiply = copy[cate].multiply;
    if (multiply) {
      if (someItem(copy[cate].datas, item)) {
        if (require && copy[cate].length == 1) {
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
    } else {
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
  const rederItems = ["prd_cd", "spt_cd", "biz_cd", "tech_cd", "loc_cd"];
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
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_tooltip.png"
                }
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
          <input type="checkbox" id="chkAll" />
          <label htmlFor="chkAll">전체 지원사업 보기</label>
        </div>
        <div className={styles.filterBox}>
          <ul className={styles.filterList}>
            {rederItems.map((cate, idx) => {
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
                            src={
                              process.env.PUBLIC_URL +
                              "/public_assets/img/global/btn/btn_arr.png"
                            }
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
                          src={
                            process.env.PUBLIC_URL +
                            "/public_assets/img/global/btn/btn_arr.png"
                          }
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
            <button type="button">
              <span>조회</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportFilter;
