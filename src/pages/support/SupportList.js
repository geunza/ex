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
const SupportList = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let keywordParam = searchParams.get("keyword");
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportItemReady = useSelector((state) => state.supportItemReady);
  const [ord, setOrd] = useState("전체");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(30);
  const [savedBook, setSavedBook] = useState([]);
  const [allSupport, setAllSupport] = useState(true);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      setAllSupport(false);
    } else {
      setAllSupport(true);
    }
  }, [isLoggedIn]);
  const moveScrollStorage = () => {
    window.scrollTo({
      top: parseInt(sessionStorage.getItem("sOffset")),
    });
    sessionStorage.setItem("sOffset", 0);
  };
  const setScrollStorage = (value) => {
    sessionStorage.setItem("sOffset", value);
  };
  const [compoMount, setCompoMount] = useState(false);
  const getSupportCont = (ord, keyword) => {
    console.log("검색중");
    dispatch(loadingStart());
    console.log("isLoggedIn", isLoggedIn);
    console.log("compoMount", compoMount);
    if (!compoMount) {
      if (!isLoggedIn) {
        console.log("첫랜더 : 로그인 X  /  ");
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
            keyword: keyword,
          },
        }).then((res) => {
          dispatch(setSupportData(res.data));
          moveScrollStorage();
          dispatch(loadingEnd());
        });
      } else {
        console.log("첫랜더 : 로그인 O  /  LIST SEARCH : 전체 지원사업 보기 X");
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
          dispatch(setSupportData(res.data));
          moveScrollStorage();
          dispatch(loadingEnd());
        });
      }
    } else {
      if (allSupport) {
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
            keyword: keyword,
          },
        }).then((res) => {
          dispatch(setSupportData(res.data));
          moveScrollStorage();
          dispatch(loadingEnd());
        });
      } else {
        console.log("LIST SEARCH : 전체 지원사업 보기 X");
        console.log("ord", ord);
        console.log("bizp_type_cd", dataToString("bizp_type_cd"));
        console.log("prd_cd", dataToString("prd_cd"));
        console.log("biz_type_cd", dataToString("biz_type_cd"));
        console.log("spt_cd", dataToString("spt_cd"));
        console.log("biz_cd", dataToString("biz_cd"));
        console.log("tech_cd", dataToString("tech_cd"));
        console.log("loc_cd", dataToString("loc_cd"));
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
          dispatch(setSupportData(res.data));
          moveScrollStorage();
          dispatch(loadingEnd());
        });
      }
    }
    setCompoMount(true);
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
    console.log([ordDummy, pageDummy, viewDummy, keywordDummy]);
    setOrd(ordDummy);
    setPage(pageDummy);
    setKeyword(keywordDummy);
    if (firstMount) {
      if (decodeURI(location.search) == "") {
        console.log("첫 랜더링");
        getSupportCont(ordDummy, keywordDummy);
      }
    }
  }, [location]);

  useEffect(() => {
    setFirstMount(false);
  }, []);
  return (
    <>
      <div className={styles.SupportList}>
        <div className={`inner`}>
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
          <div className={styles.contArea}>
            <div className={styles.filterArea}>
              <SupportFilter
                supportInfo={supportInfo}
                getSupportCont={getSupportCont}
                setScrollStorage={setScrollStorage}
                allSupport={allSupport}
                setAllSupport={setAllSupport}
              />
            </div>
            <div className={styles.listArea}>
              <SupportContent
                count={count}
                setCount={setCount}
                getSupportCont={getSupportCont}
                getRecent={getRecent}
                allSupport={allSupport}
                setScrollStorage={setScrollStorage}
                moveScrollStorage={moveScrollStorage}
                keyword={keyword}
                setKeyword={setKeyword}
                page={page}
                setPage={setPage}
                ord={ord}
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
