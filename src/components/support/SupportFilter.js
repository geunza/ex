import React from "react";
import styles from "scss/pages/Support.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setSupportInfo,
  setSupportInfoModal,
  setLoginCheck,
} from "redux/store";
import { useEffect, useState } from "react";
import Tooltip from "components/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeSupportFilter from "components/HomeSupportFilter";
import SupportFilterMobile from "components/SupportFilterMobile";
const SupportFilter = ({
  getSupportCont,
  setScrollStorage,
  allSupport,
  setAllSupport,
  mobileFilterOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const userInfo = useSelector((state) => state.userInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportInfo = useSelector((state) => state.supportInfo);
  const location = useLocation();
  const [objDummy, setObjDummy] = useState({ ...supportInfo });
  const [modalIdx, setModalIDx] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const handleSubmitBtn = () => {
    // dispatch(loadingStart());
    let paramUrl = "";
    const obj = {
      startPeriod: supportInfo.prd_cd.datas.map((v) => v.code).toString(), //창업기간 prd_cd
      locCtg: supportInfo.loc_cd.datas.map((v) => v.code).toString(), // 지역 loc_cd
      companyType: supportInfo.biz_type_cd.datas.map((v) => v.code).toString(), //기업형태 biz_type_cd
      businessType: supportInfo.bizp_type_cd.datas
        .map((v) => v.code)
        .toString(), //사업자형태 bizp_type_cd
      supportType: supportInfo.spt_cd.datas.map((v) => v.code).toString(), //지원분야 spt_cd
      businessCtg: supportInfo.biz_cd.datas.map((v) => v.code).toString(), //사업분야 biz_cd
      techCtg: supportInfo.tech_cd.datas.map((v) => v.code).toString(), //기술분야 tech_cd
    };
    for (let key in obj) {
      if (obj[key] == "" || obj[key] == undefined || obj[key] == null) {
        continue;
      }
      paramUrl += `${key}=${obj[key]}&`;
    }
    axios({
      url: "/user/updateCompanyInfo?" + paramUrl,
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    }).then((res) => {
      // dispatch(loadingEnd());
      navigate("./");
      getSupportCont("전체", "");
      window.scrollTo(0, 0);
    });
  };
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
      if (name == "전체") {
        if (
          require &&
          copy[cate].datas.filter((x) => x.code_nm != "전체").length == 0
        ) {
          alert("한가지 이상 선택해주세요.");
        }
        copy[cate].datas = [item];
      } else {
        copy[cate].datas = copy[cate].datas.filter((x) => x.code_nm != "전체");
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
    if (target.classList.contains("active")) {
      target.classList.remove("active");
    } else {
      const allTarget = document
        .querySelector('[class^="Support_modalCont"]')
        .querySelectorAll(".toolTipBox");
      allTarget.forEach((v) => v.classList.remove("active"));
      target.classList.add("active");
    }
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
      <div
        className={styles.SupportFilter}
        style={{
          padding: isMobile && !mobileFilterOpen ? 0 : null,
          border: isMobile && !mobileFilterOpen ? "none" : null,
        }}
      >
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
        {!isMobile && (
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
                setAllSupport(e.currentTarget.checked);
              }}
            />
            <label htmlFor="chkAll">전체 지원사업 보기</label>
          </div>
        )}
        {!isMobile ? (
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
                                  <li key={idx}>
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
                              <span>
                                {supportInfo[cate].name}
                                <i className="btnToolTip" onClick={tooltipOpen}>
                                  <img
                                    src={require("assets/img/global/btn/btn_tooltip.png")}
                                    alt="tooltip"
                                  />
                                  <div className="toolTipBox">
                                    <p className="txt">
                                      사업공고 출처기관에서 명시한 분야로
                                      분류합니다. 해당되는 분야 키워드를 중복
                                      선택하시고 조회/추천되는 지원사업에 따라
                                      수정해 보세요!
                                    </p>
                                    <p className="exTxt">
                                      AI를 활용한 수산물 밀키트 판매 커머스
                                    </p>
                                    <div className="exBox">
                                      <img
                                        src={require("assets/img/global/ico/ico_ex.png")}
                                        alt="ico_example"
                                        className="ico_ex"
                                      />
                                      <span>딥테크</span>
                                      <span>커머스</span>
                                      <span>푸드/농업</span>
                                      <span>기타(수산물)</span>
                                      선택
                                    </div>
                                  </div>
                                </i>
                              </span>
                            </p>
                            <ul>
                              {supportItem[cate].map((item, idx) => {
                                let hasToolTip = false;
                                let toolTipCont = "";
                                if (cate == "tech_cd") {
                                  if (item.code_nm == "기타") {
                                    hasToolTip = true;
                                    toolTipCont =
                                      "뷰티/화장품, 패션, 예술, 광고/마케팅, 화학, 유아/출산, 부동산/건설, 소셜미디어/커뮤니티, 화학, 인사/비지니스/법률 등을 포함합니다.";
                                  }
                                  if (item.code_nm == "딥테크") {
                                    hasToolTip = true;
                                    toolTipCont =
                                      "AI,자율주행, 블록체인, 나노소재, 5G/6G, 스마트팜, 빅데이터 스마트홈 등을 포함하는 분야입니다.";
                                  }
                                }
                                return (
                                  <li
                                    className={
                                      hasToolTip ? styles.hasToolTip : null
                                    }
                                    key={idx}
                                  >
                                    <button
                                      className={
                                        someItem(objDummy[cate].datas, item)
                                          ? styles.selected
                                          : " "
                                      }
                                      onClick={(e) => {
                                        filterBtnClick(item, e);
                                      }}
                                    >
                                      {item.code_nm}
                                    </button>
                                    {hasToolTip && (
                                      <i
                                        className="btnToolTip"
                                        onClick={tooltipOpen}
                                      >
                                        <img
                                          src={require("assets/img/global/btn/btn_tooltip.png")}
                                          alt="tooltip"
                                        />
                                        <Tooltip cont={toolTipCont} />
                                      </i>
                                    )}
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
                                <li key={idx}>
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
                    handleSubmitBtn();
                  }
                }}
              >
                <span>조회</span>
              </button>
            </div>
          </div>
        ) : (
          mobileFilterOpen && (
            <div className={styles.filterBox}>
              <SupportFilterMobile />
              <div className={styles.submitArea}>
                {isMobile && (
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
                        setAllSupport(e.currentTarget.checked);
                      }}
                    />
                    <label htmlFor="chkAll">전체 지원사업 보기</label>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (!isLoggedIn) {
                      dispatch(setLoginCheck(true));
                    } else {
                      handleSubmitBtn();
                    }
                  }}
                >
                  <span>조회</span>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
export default SupportFilter;
