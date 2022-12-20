import React, { useState, useEffect } from "react";
import styles from "scss/pages/SupportList.module.scss";
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
  const [ord, setOrd] = useState("");
  const [page, setPage] = useState("");
  const [savedBook, setSavedBook] = useState([]);
  const [allSupport, setAllSupport] = useState(false);
  const moveScrollStorage = () => {
    window.scrollTo({
      top: parseInt(sessionStorage.getItem("sOffset")),
    });
    sessionStorage.setItem("sOffset", 0);
  };
  const setScrollStorage = (value) => {
    sessionStorage.setItem("sOffset", value);
  };

  let lastAxiosNum = 0;
  const getSupportCont = () => {
    const currentAxiosNum = lastAxiosNum;
    lastAxiosNum++;
    const searchTxt = location.search;
    let searchKeyword = "";
    if (
      keywordParam == "null" ||
      keywordParam == undefined ||
      keywordParam == null
    ) {
      searchKeyword = "";
    } else {
      searchKeyword = keywordParam.toString();
    }
    dispatch(loadingStart());
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
          keyword: "",
        },
      }).then((res) => {
        dispatch(setSupportData(res.data));
        moveScrollStorage();
        dispatch(loadingEnd());
      });
    } else {
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
          keyword: searchTxt,
        },
      }).then((res) => {
        console.log(
          "currentAxiosNum" + currentAxiosNum,
          "lastAxiosNum" + lastAxiosNum
        );
        if (currentAxiosNum == lastAxiosNum - 1) {
          dispatch(setSupportData(res.data));
        }
        moveScrollStorage();
        dispatch(loadingEnd());
      });
    }
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
    getSupportCont();
    getRecent();
  }, [userInfo]);
  const [compoMount, setCompoMount] = useState(false);
  useEffect(() => {
    if (location.search == "" && compoMount) {
      console.log("빈 path");
      getSupportCont();
    }
  }, [location]);
  useEffect(() => {
    setCompoMount(true);
  }, []);
  return (
    <>
      <div className={styles.SupportList}>
        <div className={`inner`}>
          <div className={styles.tit}>
            <h4>신청 가능한 지원사업 찾기</h4>
            {keywordParam != null && keywordParam != undefined ? (
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
                getSupportCont={getSupportCont}
                getRecent={getRecent}
                setScrollStorage={setScrollStorage}
                moveScrollStorage={moveScrollStorage}
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
