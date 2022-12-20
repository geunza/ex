import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/components/support/SupportContent.module.scss";
import SupportItem from "components/support/SupportItem";
import Pagination from "components/Pagination";
import axios from "axios";
import { setSupportData } from "redux/store";
import EventModal from "components/home/EventModal";
const SupportContent = ({
  getSupportCont,
  getRecent,
  setScrollStorage,
  moveScrollStorage,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywordParam = searchParams.get("keyword");
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const [supportCont, setSupportCont] = useState([]);
  const [supportFilterCont, setSupportFilterCont] = useState([]);
  const navigate = useNavigate();
  const [ord, setOrd] = useState("전체");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(30);
  const [keyword, setKeyword] = useState("");
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

  let compoMount = false;
  const getSupportContByKeyword = () => {
    if (
      keywordParam == "null" ||
      keywordParam == undefined ||
      keywordParam == null
    ) {
      console.log("CONT SEARCH : 키워드 없을때");
      axios({
        url: "/support/getSupportInfoList",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: {
          ord: ord,
          business_type: dataToString("bizp_type_cd"),
          start_period: dataToString("prd_cd"),
          company_type: dataToString("biz_type_cd"),
          target_cat_name: dataToString("spt_cd"),
          business_ctg: dataToString("biz_cd"),
          tech_ctg: dataToString("tech_cd"),
          loc_code: dataToString("loc_cd"),
          keyword: "",
        },
      }).then((res) => {
        dispatch(setSupportData(res.data));
        moveScrollStorage();
        dispatch(loadingEnd());
      });
    } else {
      console.log("CONT SEARCH : 키워드 있을때");
      axios({
        url: "/support/getSupportInfoList",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: {
          ord: ord,
          business_type: "01",
          start_period: "999",
          company_type: "01",
          target_cat_name: "01",
          business_ctg: "01",
          tech_ctg: "01",
          loc_code: "C82",
          keyword: keywordParam,
        },
      }).then((res) => {
        dispatch(setSupportData(res.data));
        moveScrollStorage();
        dispatch(loadingEnd());
      });
    }
    dispatch(loadingStart());
    function dataToString(target) {
      return supportInfo[target].datas.map((v) => v.code).toString();
    }
  };

  useEffect(() => {
    getSupportContByKeyword();
    // let copy = [...supportCont];
    // if (ord == "전체") {
    //   setSupportCont([...supportData]);
    // } else if (ord == "인기순") {
    //   copy.sort((a, b) => {
    //     return b.view_cnt - a.view_cnt;
    //   });
    //   setSupportCont(copy);
    // } else if (ord == "금액높은순") {
    //   copy.sort((a, b) => {
    //     return b.target_cost_value - a.target_cost_value;
    //   });
    //   setSupportCont(copy);
    // } else if (ord == "마감임박순") {
    //   copy.sort((a, b) => {
    //     return a.si_end_dt - b.si_end_dt;
    //   });
    //   setSupportCont(copy);
    // }
  }, [ord]);
  useEffect(() => {
    setSupportCont([...supportData]);
  }, [supportData]);
  useEffect(() => {
    if (keyword == "") {
      setSupportFilterCont(
        [...supportCont].filter((x) => {
          let endDate = x.si_end_dt;
          let today = new Date().getTime();
          return endDate - today > 0;
        })
      );
    } else {
      setSupportFilterCont([...supportCont]);
    }
  }, [supportCont, keyword]);
  useEffect(() => {
    if (keywordParam != null) {
      getSupportContByKeyword();
    }
  }, [keyword]);
  useEffect(() => {
    const searchTxt = location.search;
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.ord == undefined) {
      setOrd("전체");
    } else {
      setOrd(searchObj.ord);
    }
    if (searchObj.page == undefined) {
      setPage(1);
    } else {
      setPage(parseInt(searchObj.page));
    }
    if (searchObj.view == undefined) {
      setCount(30);
    } else {
      setCount(searchObj.view);
    }
    if (searchObj.keyword == undefined) {
      setKeyword("");
    } else {
      setKeyword(searchObj.keyword);
    }
  }, [location]);
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
          <p className={styles.total}>전체 {supportFilterCont.length}개</p>
          <div className={styles.countWrap}>
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
          {supportFilterCont.length == 0 ? (
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
          ) : (
            <>
              <ul>
                {supportFilterCont
                  .slice((page - 1) * count, page * count)
                  .map((item, idx) => {
                    return (
                      <SupportItem
                        getRecent={getRecent}
                        key={idx}
                        item={item}
                        getSupportCont={getSupportContByKeyword}
                        setScrollStorage={setScrollStorage}
                      />
                    );
                  })}
              </ul>
              <Pagination
                total={supportFilterCont.length}
                postLimit={count}
                numLimit={5}
                page={parseInt(page)}
                searchParams={searchParams}
                ord={ord}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SupportContent;
