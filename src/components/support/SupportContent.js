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
const SupportContent = ({ getSupportCont }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywordParam = searchParams.get("keyword");
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const [supportCont, setSupportCont] = useState([...supportData]);
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
    navigateSearchTxt(name, value);
  };
  useEffect(() => {
    setSupportCont(supportData);
  }, [supportData]);

  useEffect(() => {
    if (ord == "전체") {
      setSupportCont([...supportData]);
    } else if (ord == "인기순") {
      let copy = [...supportData];
      copy.sort((a, b) => {
        return b.view_cnt - a.view_cnt;
      });
      setSupportCont(copy);
    } else if (ord == "금액높은순") {
      let copy = [...supportData];
      copy.sort((a, b) => {
        return b.target_cost_value - a.target_cost_value;
      });
      setSupportCont(copy);
    } else if (ord == "마감임박순") {
      let copy = [...supportData];
      copy.sort((a, b) => {
        return a.si_end_dt - b.si_end_dt;
      });
      setSupportCont(copy);
    }
  }, [ord]);
  const getSupportContByKeyword = () => {
    if (keywordParam == "null") {
      keywordParam = "";
    }
    dispatch(loadingStart());
    axios({
      url: "/support/getSupportInfoList",
      method: "POST",
      headers: {
        user_id: parseInt(userInfo.id),
      },
      data: {
        ord: ord,
        business_type: supportInfo.bizp_type_cd.datas
          .map((v) => v.code)
          .toString(),
        start_period: supportInfo.prd_cd.datas.map((v) => v.code).toString(),
        company_type: supportInfo.biz_type_cd.datas
          .map((v) => v.code)
          .toString(),
        target_cat_name: supportInfo.spt_cd.datas.map((v) => v.code).toString(),
        business_ctg: supportInfo.biz_cd.datas.map((v) => v.code).toString(),
        tech_ctg: supportInfo.tech_cd.datas.map((v) => v.code).toString(),
        loc_code: supportInfo.loc_cd.datas.map((v) => v.code).toString(),
        keyword: keywordParam,
      },
    }).then((res) => {
      dispatch(setSupportData(res.data));
      dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getSupportContByKeyword();
  }, [keywordParam]);
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
    window.scrollTo(0, 0);
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
          <p className={styles.total}>전체 {supportCont.length}개</p>
          <div className={styles.countWrap}>
            <p
              onClick={() => {
                setSltView((prev) => !prev);
              }}
              className={styles.count}
            >
              <span>{count}개씩 보기</span>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_arr_bottom.png"
                }
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
          {supportCont.length == 0 ? (
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
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_mail_white.png"
                      }
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
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_alarm_white.png"
                      }
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
                {supportCont
                  .slice((page - 1) * count, page * count)
                  .map((item, idx) => {
                    return (
                      <SupportItem
                        key={idx}
                        item={item}
                        getSupportCont={getSupportCont}
                      />
                    );
                  })}
              </ul>
              <Pagination
                total={supportCont.length}
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
