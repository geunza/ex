import React, { useEffect, useState } from "react";
import CountArea from "components/home/CountArea";
import SnsLogin from "components/home/LoginArea";
import Banner from "components/ImageBanner";
import Event from "components/home/Event";
import Filter from "components/home/Filter";
import HomeCommunity from "components/home/HomeCommunity";
import HomeSupport from "components/home/HomeSupport";
import EventModal from "components/home/EventModal";
import SignInPolicyModal from "components/home/SignInPolicyModal";
import Loading from "components/Loading";
import styles from "scss/pages/Home.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setKakaoInform,
  loadingEnd,
  loadingStart,
  modalOverflow,
  setLoginCheck,
} from "redux/store";

const Home = () => {
  const dispatch = useDispatch();
  const kakaoInform = useSelector((state) => state.kakaoInform);
  const appleInform = useSelector((state) => state.appleInform);
  const isMobile = useSelector((state) => state.isMobile);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [modalOn, setModalOn] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const [count, setCount] = useState({
    total_cnt: 0,
    week_cnt: 0,
    user_cnt: 0,
    target_cnt: 0,
  });
  const modalOpener = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    const isTrue = value == "true";
    // name, value, target
    setModalOn(isTrue);
    if (name === "Modal1") {
      setModal1(isTrue);
    } else if (name === "Modal2") {
      setModal2(isTrue);
    }
  };
  const [lastCheck, setLastCheck] = useState(false);
  useEffect(() => {
    if (kakaoInform.state || appleInform.state) {
      setLastCheck(true);
    }
  }, [kakaoInform, appleInform]);
  const [noticeList, setNoticeList] = useState({});
  useEffect(() => {
    if (isMobile) {
      axios({
        url: process.env.REACT_APP_API_RESOURCE + "/cms/notice/api",
        method: "GET",
      }).then((res) => {
        setNoticeList(res.data[0]);
      });
    }
  }, [isMobile]);
  return (
    <>
      <div className={styles.Home}>
        <section className={styles.sec01}>
          <div className={`inner ${styles.inner}`}>
            <SnsLogin />
            <Banner />
            {!isMobile && (
              <Event
                setModalOn={setModalOn}
                modalOn={modalOn}
                modalOpener={modalOpener}
                Modal2={Modal2}
              />
            )}
          </div>
        </section>
        <div className={`inner ${styles.inner}`}>
          <Filter
            modalOpener={modalOpener}
            setModalOn={setModalOn}
            modalOn={modalOn}
            Modal1={Modal1}
          />
          <div className={styles.sec02}>
            {!isMobile && <HomeCommunity />}
            {isMobile && (
              <>
                <div className={styles.mobileBox}>
                  <h3 className={styles.mobileTit}>
                    <img
                      src={require("assets/img/mobile/mobileSaved.png")}
                      alt=""
                    />
                    <span>찜</span>
                  </h3>
                  <Link
                    className={styles.linkSaved}
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        e.preventDefault();
                        dispatch(setLoginCheck(true));
                      }
                    }}
                    to="/saved?cate=save"
                  >
                    {!isLoggedIn ? (
                      <span>
                        <mark>로그인</mark> 후 이용 가능한 서비스입니다.
                      </span>
                    ) : (
                      <span>
                        지원사업을 찜하면 마감일 임박시 알림해 드릴께요.
                      </span>
                    )}
                  </Link>
                </div>
                <div className={styles.mobileBox}>
                  <h3 className={styles.mobileTit}>
                    <img
                      src={require("assets/img/global/ico/ico_zzim_black.png")}
                      alt="찜"
                    />
                    <span>모든 지원사업</span>
                  </h3>
                  <Link className={styles.linkSaved} to="/support/supportList">
                    누적 지원사업
                    <mark> {count.total_cnt.toLocaleString()}개</mark>
                  </Link>
                </div>
                <div className={styles.mobileBox}>
                  <h3 className={styles.mobileTit}>
                    <img
                      src={require("assets/img/mobile/mobileComm.png")}
                      alt=""
                    />
                    <span>커뮤니티</span>
                  </h3>
                  {/* <Link
                    className={styles.linkComm}
                    to="/community/communityList"
                  >
                    기업 운영에 관한 모든 것들을 커뮤니티에서 공유해봐요!
                  </Link> */}
                  <HomeCommunity />
                </div>
                <div className={styles.mobileBox}>
                  <h3 className={styles.mobileTit}>
                    <img
                      src={require("assets/img/mobile/mobileEvent.png")}
                      alt=""
                    />
                    <span>엑시토 이벤트</span>
                  </h3>
                  <Event
                    setModalOn={setModalOn}
                    modalOn={modalOn}
                    modalOpener={modalOpener}
                    Modal2={Modal2}
                  />
                </div>
              </>
            )}
            <CountArea count={count} setCount={setCount} />
          </div>
          <HomeSupport />
          {isMobile && Object.keys(noticeList).length > 0 && (
            <>
              <div className={styles.mobileBox}>
                <h3 className={styles.mobileTit}>
                  <img src={require("assets/img/mobile/mobileNoti.png")} />
                  <span>공지사항</span>
                </h3>
                <Link
                  className={`white ${styles.linkComm} ${styles.homeNotice}`}
                  to={`/notice/noticeList`}
                >
                  {noticeList.title}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      {isMobile && (
        <style>
          {
            "\
              #wrap > div[class^='Header']{\
                display:flex;\
              }\
            "
          }
        </style>
      )}
      {lastCheck && (
        <SignInPolicyModal
          setLastCheck={setLastCheck}
          kakaoInform={kakaoInform}
          appleInform={appleInform}
        />
      )}
    </>
  );
};
export default Home;
