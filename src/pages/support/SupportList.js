import React, { useState, useEffect } from "react";
import styles from "scss/pages/Support.module.scss";
import SupportFilter from "components/support/SupportFilter";
import SupportContent from "components/support/SupportContent";
import SupportRecent from "components/support/SupportRecent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadingStart, loadingEnd } from "redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setSupportData } from "redux/store";
import MobileTitle from "components/MobileTitle";
let axiosCount = 0;
const SupportList = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let keywordParam = searchParams.get("keyword");
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const isMobile = useSelector((state) => state.isMobile);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportItemReady = useSelector((state) => state.supportItemReady);
  const [total, setTotal] = useState(0);
  const [ord, setOrd] = useState("전체");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(30);
  const [savedBook, setSavedBook] = useState([]);
  const allSupportCache = isTrue(
    sessionStorage.getItem("allSupportCache") ?? true
  );
  const [allSupport, setAllSupport] = useState(allSupportCache);
  const [keyword, setKeyword] = useState("");
  const [mobilePage, setMobilePage] = useState(1);
  const [supportFilterCont, setSupportFilterCont] = useState([]);
  function isTrue(target) {
    return target == "true";
  }
  const setScrollStorage = (value) => {
    sessionStorage.setItem("sOffset", value);
  };
  const getSupportCont = (ord, keyword) => {
    // dispatch(loadingStart());
    const thisCount = axiosCount;
    axiosCount = axiosCount + 1;

    // 첫랜더
    if (!(sessionStorage.getItem("isLoggedIn") ?? false)) {
      // 로그인X => 전체
      axios({
        url: "/support/getSupportInfoList",
        method: "POST",
        headers: { user_id: "" },
        data: {
          ord: ord,
          keyword: keyword,
        },
      }).then((res) => {
        if (thisCount + 1 == axiosCount) {
          dispatch(setSupportData(res.data));
        }
        // dispatch(loadingEnd());
      });
    } else {
      if (allSupport) {
        console.log("LIST SEARCH : 전체 지원사업 보기 O");
        axios({
          url: "/support/getSupportInfoList",
          method: "POST",
          headers: {
            user_id: userInfo.id,
          },
          data: {
            ord: ord,
            keyword: keyword,
          },
        }).then((res) => {
          if (thisCount + 1 == axiosCount) {
            dispatch(setSupportData(res.data));
          }
          // dispatch(loadingEnd());
        });
      } else {
        console.log("LIST SEARCH : 전체 지원사업 보기 X");
        const thisData = {
          ord: ord,
          keyword: keyword,
          business_type: dataToString("bizp_type_cd"),
          target_cat_name: dataToString("spt_cd"),
          business_ctg: dataToString("biz_cd"),
          tech_ctg: dataToString("tech_cd"),
          loc_code: dataToString("loc_cd"),
        };
        if (dataToString("bizp_type_cd") != "02") {
          Object.assign(thisData, {
            start_period: dataToString("prd_cd"),
            company_type: dataToString("biz_type_cd"),
          });
        }
        console.log(thisData);
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
            keyword: keyword,
            // keyword: searchTxt,
          },
        }).then((res) => {
          if (thisCount + 1 == axiosCount) {
            dispatch(setSupportData(res.data));
          }
          // dispatch(loadingEnd());
        });
      }
    }
    setMobilePage(1);
    sessionStorage.removeItem("s_mo_page");
    // moveScrollStorage();
    function dataToString(target) {
      return supportInfo[target].datas.map((v) => v.code).toString();
    }
  };
  const getRecent = () => {
    axios({
      headers: { user_id: userInfo.id },
      data: {
        ord: "전체",
      },
      method: "POST",
      url: "/saved/getRecentlyMySavedBook",
    })
      .then((res) => {
        setSavedBook(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getRecent();
  }, [userInfo]);

  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    const searchTxt = decodeURI(location.search);
    sessionStorage.setItem("s_currentSearch", searchTxt);
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    let ordDummy = "";
    let pageDummy = "";
    let countDummy = "";
    let keywordDummy = "";
    let allDummy = "";
    let viewDummy = "";
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = arrObj[1];
    });
    if (searchObj.all == "true") {
      allDummy = true;
    } else if (searchObj.all == "false") {
      allDummy = false;
    }
    if (searchObj.ord == undefined) {
      ordDummy = "전체";
    } else {
      ordDummy = searchObj.ord;
    }
    if (searchObj.page == undefined) {
      pageDummy = 1;
    } else {
      pageDummy = parseInt(searchObj.page);
    }
    if (searchObj.view != undefined) {
      viewDummy = searchObj.view;
      setCount(viewDummy);
    }
    if (searchObj.keyword == undefined) {
      keywordDummy = "";
    } else {
      keywordDummy = searchObj.keyword;
    }
    if (searchObj.count == undefined) {
      countDummy = 30;
    } else {
      countDummy = searchObj.count;
    }
    if (ord != ordDummy || keyword != keywordDummy) {
      getSupportCont(ordDummy, keywordDummy);
    }
    if (page != pageDummy) {
      // console.log("page바뀜");
    }
    if (count != countDummy) {
      // console.log("count바뀜");
    }
    setOrd(ordDummy);
    setPage(pageDummy);
    setKeyword(keywordDummy);

    getSupportCont(ordDummy, keywordDummy);
  }, [location]);
  useEffect(() => {
    if (isLoggedIn) {
      setAllSupport(false);
    } else {
      setAllSupport(true);
    }
  }, [isLoggedIn]);
  useEffect(() => {
    sessionStorage.setItem("allSupportCache", allSupport);
  }, [allSupport]);
  useEffect(() => {
    setFirstMount(false);
    return () => {
      sessionStorage.removeItem("allSupportCache", allSupport);
    };
  }, []);
  useEffect(() => {
    if (keyword == "") {
      setTotal(supportFilterCont.length);
    } else {
      setTotal(supportData.length);
    }
  }, [keyword, supportData, supportFilterCont]);
  useEffect(() => {
    console.log("supportFilterCont.length", supportFilterCont.length);
  }, [supportFilterCont]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(!isLoggedIn);
  useEffect(() => {
    isLoggedIn ? setMobileFilterOpen(!true) : setMobileFilterOpen(!false);
  }, [isLoggedIn]);
  return (
    <>
      <div className={styles.SupportList}>
        <MobileTitle title={"지원사업"} />
        <div className={`inner`}>
          {!isMobile && (
            <div className={styles.tit}>
              <h4>신청 가능한 지원사업 찾기</h4>
              {keyword ? (
                <p>
                  <mark>'{keywordParam}'</mark> 검색 결과 입니다.
                </p>
              ) : (
                <p>
                  좌측 <mark>필터 설정</mark> 후 내 기업에 맞는 지원사업만
                  확인하세요.
                </p>
              )}
            </div>
          )}

          <div className={styles.contArea}>
            <div className={styles.filterArea}>
              {isMobile && (
                <div
                  className={styles.tit}
                  style={{ marginBottom: mobileFilterOpen ? "20px" : "0" }}
                >
                  <div className={styles.titInner}>
                    <h4>신청 가능한 지원사업 찾기</h4>
                    {keyword ? (
                      <p>
                        <mark>'{keywordParam}'</mark> 검색 결과 입니다.
                      </p>
                    ) : (
                      <p>
                        <mark>필터 설정</mark> 후 내 기업에 맞는 지원사업만
                        확인하세요.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setMobileFilterOpen((prev) => !prev);
                    }}
                    className={
                      styles.mobileOpen +
                      " " +
                      (mobileFilterOpen ? styles.opened : "")
                    }
                  >
                    열기
                  </button>
                </div>
              )}
              <SupportFilter
                supportInfo={supportInfo}
                getSupportCont={getSupportCont}
                setScrollStorage={setScrollStorage}
                allSupport={allSupport}
                setAllSupport={setAllSupport}
                mobileFilterOpen={mobileFilterOpen}
              />
            </div>
            <div className={styles.listArea}>
              {isMobile && <p className={styles.total}>전체 {total}개</p>}
              <SupportContent
                count={count}
                setCount={setCount}
                getSupportCont={getSupportCont}
                getRecent={getRecent}
                allSupport={allSupport}
                setScrollStorage={setScrollStorage}
                keyword={keyword}
                ord={ord}
                setKeyword={setKeyword}
                page={page}
                setPage={setPage}
                mobilePage={mobilePage}
                setMobilePage={setMobilePage}
                total={total}
                setTotal={setTotal}
                supportFilterCont={supportFilterCont}
                setSupportFilterCont={setSupportFilterCont}
              />
            </div>
            <div className={styles.recentArea}>
              <SupportRecent
                userInfo={userInfo}
                savedBook={savedBook}
                setSavedBook={setSavedBook}
                getRecent={getRecent}
              />
            </div>
          </div>
        </div>
      </div>
      <style>
        {
          "\
        body{\
          background-color:#fff;\
        }\
      "
        }
      </style>
    </>
  );
};

export default SupportList;
