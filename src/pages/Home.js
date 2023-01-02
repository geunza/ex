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

const Home = ({}) => {
  const dispatch = useDispatch();
  const kakaoInform = useSelector((state) => state.kakaoInform);
  const isMobile = useSelector((state) => state.isMobile);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [axiosCount, setAxiosCount] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
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
    if (axiosCount == 3) {
      // dispatch(loadingEnd());
    }
  }, [axiosCount]);
  useEffect(() => {
    dispatch(modalOverflow(modalOn));
  }, [modalOn]);
  useEffect(() => {
    console.log(kakaoInform);
    if (kakaoInform.state) {
      setLastCheck(true);
    }
  }, [kakaoInform]);
  const [noticeList, setNoticeList] = useState({});
  useEffect(() => {
    if (isMobile) {
      axios({
        url: "/cms/notice/api",
        method: "GET",
      }).then((res) => {
        setNoticeList(res.data[0]);
        console.log(res.data);
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
            {!isMobile && <HomeCommunity setAxiosCount={setAxiosCount} />}
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
                      src={require("assets/img/mobile/mobileComm.png")}
                      alt=""
                    />
                    <span>커뮤니티</span>
                  </h3>
                  <Link
                    className={styles.linkComm}
                    to="/community/communityList"
                  >
                    기업 운영에 관한 모든 것들을 커뮤니티에서 공유해봐요!
                  </Link>
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
            <CountArea setAxiosCount={setAxiosCount} />
          </div>
          <HomeSupport setAxiosCount={setAxiosCount} />
          {isMobile && Object.keys(noticeList).length > 0 && (
            <>
              <div className={styles.mobileBox}>
                <h3 className={styles.mobileTit}>
                  <img src={require("assets/img/mobile/mobileNoti.png")} />
                  <span>공지사항</span>
                </h3>
                <Link
                  className={`${styles.linkComm} ${styles.homeNotice}`}
                  to={`/notice/noticeView/${noticeList.id}`}
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
        />
      )}
    </>
  );
};
export default Home;
