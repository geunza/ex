import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/pages/Support.module.scss";
import SupportItem from "components/support/SupportItem";
import PaginationSupport from "components/PaginationSupport";
import axios from "axios";
import { setSupportData } from "redux/store";
import EventModal from "components/home/EventModal";
const SupportContent = ({
  getSupportCont,
  getRecent,
  setScrollStorage,
  allSupport,
  count,
  setCount,
  keyword,
  setKeyword,
  page,
  setPage,
  ord,
  mobilePage,
  setMobilePage,
  total,
  setTotal,
  supportFilterCont,
  setSupportFilterCont,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const [supportCont, setSupportCont] = useState([]);

  const [mobileMore, setMobileMore] = useState(true);
  const [lastCheckTarget, setLastCheckTarget] = useState(null);
  const navigate = useNavigate();

  const [sltView, setSltView] = useState(false);
  const countClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    setSltView(false);
    navigateSearchTxt(name, value);
  };
  const ordClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    setScrollStorage(window.scrollY);
    navigateSearchTxt(name, value);
  };

  useEffect(() => {
    setSupportCont([...supportData]);
  }, [supportData]);
  useEffect(() => {
    setSupportFilterCont(
      [...supportCont].filter((x) => {
        let endDate = x.si_end_dt;
        let today = new Date().getTime();
        return endDate - today > 0;
      })
    );
  }, [supportData, supportCont, keyword]);
  function decode(txt) {
    return decodeURI(txt);
  }
  function navigateSearchTxt(name, value) {
    const searchTxt = location.search;
    const searchArr = searchTxt.replace("?", "").split("&");
    let searchObj = {};
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
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
  const [modalOn, setModalOn] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const modalOpener = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    const isTrue = value == "true";
    setModalOn(isTrue);
  };

  function handleMobilePage() {
    setMobilePage(parseInt(sessionStorage.getItem("s_mo_page")));
  }
  let infiniteState = true;
  const listener = () => {
    if (lastCheckTarget) {
      if (infiniteState) {
        const yPos = window.scrollY;
        const yHeight = window.innerHeight;
        const targetPos = lastCheckTarget.getBoundingClientRect().top;
        const trigger = targetPos - yHeight + 100;
        if (trigger < 0) {
          infiniteState = false;
          let mobilePage = sessionStorage.getItem("s_mo_page");
          if (mobilePage == null) {
            sessionStorage.setItem("s_mo_page", 2);
          } else {
            sessionStorage.setItem("s_mo_page", parseInt(mobilePage) + 1);
          }
          handleMobilePage();
          setTimeout(() => {
            infiniteState = true;
          }, 500);
        }
      }
    }
  };
  useEffect(() => {
    if (isMobile) {
      if (count * mobilePage > total) {
        setMobileMore(false);
      } else {
        setMobileMore(true);
      }
    }
  }, [mobilePage, supportFilterCont, supportData, total]);
  useEffect(() => {
    if (lastCheckTarget) {
      window.addEventListener("scroll", listener);
    }
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [lastCheckTarget]);
  useEffect(() => {}, [isMobile, mobileMore]);
  return (
    <div className={styles.SupportContent}>
      <div className={styles.ordWrap}>
        <div className="ordBtns">
          <button
            type="button"
            name="ord"
            value="전체"
            onClick={ordClick}
            data-selected={ord == "전체" && "selected"}
          >
            <span>전체</span>
          </button>
          <button
            type="button"
            name="ord"
            value="인기순"
            onClick={ordClick}
            data-selected={ord == "인기순" && "selected"}
          >
            <span>인기순</span>
          </button>
          <button
            type="button"
            name="ord"
            value="금액높은순"
            onClick={ordClick}
            data-selected={ord == "금액높은순" && "selected"}
          >
            <span>금액높은순</span>
          </button>
          <button
            type="button"
            name="ord"
            value="마감임박순"
            onClick={ordClick}
            data-selected={ord == "마감임박순" && "selected"}
          >
            <span>마감임박순</span>
          </button>
        </div>
      </div>
      <div className={styles.contArea}>
        <div className={styles.contTop}>
          <p className={styles.total}>전체 {total}개</p>
          <div className={styles.countWrap}>
            {!isMobile && (
              <p
                onClick={() => {
                  setSltView((prev) => !prev);
                }}
                className={styles.count}
              >
                <span>{count}개씩 보기</span>
                <img
                  src={require("assets/img/global/btn/btn_arr_bottom.png")}
                  alt="열기"
                />
              </p>
            )}
            {sltView && (
              <ul className={styles.selectArea}>
                <li>
                  <button
                    type="button"
                    value={30}
                    name="view"
                    onClick={countClick}
                  >
                    30개씩 보기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    value={50}
                    name="view"
                    onClick={countClick}
                  >
                    50개씩 보기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    value={100}
                    name="view"
                    onClick={countClick}
                  >
                    100개씩 보기
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className={styles.itemWrap}>
          {keyword == "" ? (
            supportFilterCont.length == 0 ? (
              // 필터 갯수 <div>키워드X / 갯수 == 0 / PC</div>
              <>
                <div className="empty">
                  <p className="empty_tit">일치하는 지원사업이 없습니다.</p>
                  <p className="empty_para">
                    <span>
                      (키워드 알림을 설정하시면 지원사업 업로드시 앱 알림을
                      보내드려요.)
                    </span>
                  </p>
                  <div className="btns">
                    <button
                      type="button"
                      value="true"
                      className="emptyBtn"
                      onClick={(e) => {
                        setModalTab(0);
                        modalOpener(e);
                      }}
                    >
                      <img
                        src={require("assets/img/global/ico/ico_mail_white.png")}
                        alt="이메일 정기배송 신청"
                      />
                      <span>이메일 정기배송 신청</span>
                    </button>
                    <button
                      type="button"
                      value="true"
                      className="emptyBtn"
                      onClick={(e) => {
                        setModalTab(1);
                        modalOpener(e);
                      }}
                    >
                      <img
                        src={require("assets/img/global/ico/ico_alarm_white.png")}
                        alt="키워드 알림 설정"
                      />
                      <span>키워드 알림 설정</span>
                    </button>
                  </div>
                </div>
                {modalOn && (
                  <EventModal
                    modalOpener={modalOpener}
                    modalTab={parseInt(modalTab)}
                  />
                )}
              </>
            ) : !isMobile ? (
              // 필터 PC <div>키워드X / 갯수 > 0 / PC</div>
              <>
                "supportFilterCont"
                <ul>
                  {supportFilterCont
                    .slice((page - 1) * count, page * count)
                    .map((item, idx) => {
                      return (
                        <SupportItem
                          getRecent={getRecent}
                          key={item.si_idx}
                          item={item}
                          setScrollStorage={setScrollStorage}
                          getSupportCont={getSupportCont}
                          keyword={keyword}
                          ord={ord}
                        />
                      );
                    })}
                </ul>
                <PaginationSupport
                  total={supportFilterCont.length}
                  postLimit={count}
                  numLimit={5}
                  page={parseInt(page)}
                  searchParams={searchParams}
                  ord={ord}
                />
              </>
            ) : (
              // 필터 Mob <div>키워드X / 갯수 > 0 / MOB</div>
              <>
                "supportFilterCont"
                <ul>
                  {supportFilterCont
                    .slice(0, count * mobilePage)
                    .map((item, idx) => {
                      return (
                        <SupportItem
                          getRecent={getRecent}
                          key={item.si_idx}
                          item={item}
                          setScrollStorage={setScrollStorage}
                          getSupportCont={getSupportCont}
                          keyword={keyword}
                          ord={ord}
                        />
                      );
                    })}
                </ul>
                {isMobile && mobileMore ? (
                  <div
                    ref={setLastCheckTarget}
                    className="lastCheckDiv"
                    style={{
                      display: isMobile ? "block" : "none",
                      width: "50px",
                      height: "50px",
                      padding: "50px",
                      background: "blue",
                      color: "#fff",
                      fontSize: 0,
                      opacity: 0,
                    }}
                  >
                    LOADMORE TRIGGER
                  </div>
                ) : null}
              </>
            )
          ) : supportData.length == 0 ? (
            // 검색 갯수 0 <div>키워드O / 갯수 == 0 / PC</div>
            <>
              <div className="empty">
                <p className="empty_tit">일치하는 지원사업이 없습니다.</p>
                <p className="empty_para">
                  <span>
                    (키워드 알림을 설정하시면 지원사업 업로드시 앱 알림을
                    보내드려요.)
                  </span>
                </p>
                <div className="btns">
                  <button
                    type="button"
                    value="true"
                    className="emptyBtn"
                    onClick={(e) => {
                      setModalTab(0);
                      modalOpener(e);
                    }}
                  >
                    <img
                      src={require("assets/img/global/ico/ico_mail_white.png")}
                      alt="이메일 정기배송 신청"
                    />
                    <span>이메일 정기배송 신청</span>
                  </button>
                  <button
                    type="button"
                    value="true"
                    className="emptyBtn"
                    onClick={(e) => {
                      setModalTab(1);
                      modalOpener(e);
                    }}
                  >
                    <img
                      src={require("assets/img/global/ico/ico_alarm_white.png")}
                      alt="키워드 알림 설정"
                    />
                    <span>키워드 알림 설정</span>
                  </button>
                </div>
              </div>
              {modalOn && (
                <EventModal
                  modalOpener={modalOpener}
                  modalTab={parseInt(modalTab)}
                />
              )}
            </>
          ) : !isMobile ? (
            // 검색 PC <div>키워드O / 갯수 > 0 / PC</div>
            <>
              "supportData"
              <ul>
                {supportData
                  .slice((page - 1) * count, page * count)
                  .map((item, idx) => {
                    return (
                      <SupportItem
                        getRecent={getRecent}
                        key={item.si_idx}
                        item={item}
                        setScrollStorage={setScrollStorage}
                        getSupportCont={getSupportCont}
                        keyword={keyword}
                        ord={ord}
                      />
                    );
                  })}
              </ul>
              <PaginationSupport
                total={supportData.length}
                postLimit={count}
                numLimit={5}
                page={parseInt(page)}
                searchParams={searchParams}
                ord={ord}
              />
            </>
          ) : (
            // 검색 Mob <div>키워드O / 갯수 > 0 / Mob</div>
            <>
              "supportData MOB"
              <ul>
                {supportData.slice(0, count * mobilePage).map((item, idx) => {
                  return (
                    <SupportItem
                      getRecent={getRecent}
                      key={item.si_idx}
                      item={item}
                      setScrollStorage={setScrollStorage}
                      getSupportCont={getSupportCont}
                      keyword={keyword}
                      ord={ord}
                    />
                  );
                })}
              </ul>
              {isMobile && mobileMore ? (
                <div
                  ref={setLastCheckTarget}
                  className="lastCheckDiv"
                  style={{
                    display: isMobile ? "block" : "none",
                    width: "50px",
                    height: "50px",
                    padding: "50px",
                    background: "blue",
                    color: "#fff",
                    fontSize: 0,
                    opacity: 0,
                  }}
                >
                  LOADMORE TRIGGER
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SupportContent;
