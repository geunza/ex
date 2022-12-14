import React, { useState, useEffect } from "react";
import styles from "scss/pages/MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";

import MyCompany from "components/myPage/MyCompany";
import MyLogin from "components/myPage/MyLogin";
import FilterButton from "components/home/FilterButton";
import Tooltip from "components/Tooltip";
import MyPageModal from "components/myPage/MyPageModal";
import { useNavigate } from "react-router-dom";
import MobileTitle from "components/MobileTitle";
import MyPageAlarmTab from "components/myPage/MyPageAlarmTab";
const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const [alarmOpen, setAlaramOpen] = useState(false);
  const tooltipOpen = (e) => {
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  useEffect(() => {
    if (!isLoggedIn) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [userInfo]);
  const [mobileStep, setMobileStep] = useState(0);
  return (
    <div className={styles.MyPage}>
      <MobileTitle title={"마이페이지"} />
      {!isMobile && (
        <div className={`commonTitleWrap ${styles.titleArea}`}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.leftArea}>
              <h3 className={`title ${styles.title}`}>마이페이지</h3>
              <p>지원사업 조건과 로그인 정보를 수정할 수 있어요.</p>
            </div>
            <div className="rightArea">
              <button
                type="button"
                onClick={() => {
                  setAlaramOpen(true);
                }}
              >
                <img
                  src={require("assets/img/global/ico/ico_alarm.png")}
                  alt="알림설정"
                />
                <span>알림설정</span>
              </button>
            </div>
          </div>
          {alarmOpen && <MyPageModal setAlaramOpen={setAlaramOpen} />}
        </div>
      )}
      {!isMobile ? (
        <div className={styles.MyPageContent}>
          <div className="inner">
            <div className={styles.myRecord}>
              <h4 className={styles.mainTit}>활동이력</h4>
              <p className={`isMobile ${styles.notice}`}>
                회원님의 활동을 바로 확인할 수 있어요.
              </p>
              <div className={styles.box}>
                <button
                  type="button"
                  onClick={() => {
                    alert("준비 중입니다.");
                  }}
                >
                  <div className={styles.imgArea}>
                    <img
                      src={require("assets/img/myPage/myPage_01.png")}
                      alt="멤버십 결제"
                    />
                  </div>
                  <span>멤버십 결제</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("준비 중입니다.");
                  }}
                >
                  <div className={styles.imgArea}>
                    <img
                      src={require("assets/img/myPage/myPage_02.png")}
                      alt="엑시토 프렌즈 결제"
                    />
                  </div>
                  <span>엑시토 프렌즈 결제</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert("준비 중입니다.");
                  }}
                >
                  <div className={styles.imgArea}>
                    <img
                      src={require("assets/img/myPage/myPage_03.png")}
                      alt="이메일 정기배송 이력"
                    />
                  </div>
                  <span>이메일 정기배송 이력</span>
                </button>
              </div>
            </div>
            <div className={styles.myCompany}>
              <h4 className={styles.mainTit}>
                <span>
                  기업정보
                  <i
                    onClick={tooltipOpen}
                    className="btnToolTip"
                    data-text="Hi"
                  >
                    <img
                      src={require("assets/img/global/btn/btn_tooltip.png")}
                      alt="tooltip"
                    />
                    <Tooltip
                      cont={
                        "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                      }
                    />
                  </i>
                </span>
              </h4>
              <p className={`isMobile ${styles.notice}`}>
                지원사업 조건을 수정하면
                <br />
                맞춤정보를 받을 수 있어요.
              </p>
              <div className={styles.box}>
                <MyCompany />
              </div>
            </div>
            <div className={styles.myLogin}>
              <h4 className={styles.mainTit}>
                <span>
                  로그인정보
                  <i
                    onClick={tooltipOpen}
                    className="btnToolTip"
                    data-text="Hi"
                  >
                    <img
                      src={require("assets/img/global/btn/btn_tooltip.png")}
                      alt="tooltip"
                    />
                    <Tooltip
                      cont={
                        "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                      }
                    />
                  </i>
                </span>
              </h4>
              <p className={`isMobile ${styles.notice}`}>
                로그인 정보를 수정할 수 있어요.
              </p>
              <div className={styles.box}>
                <MyLogin />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.mobileTabBtns}>
            <ul>
              <li>
                <button
                  type="button"
                  className={mobileStep == 0 ? styles.current : null}
                  onClick={() => {
                    setMobileStep(0);
                  }}
                >
                  조회 조건
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={mobileStep == 1 ? styles.current : null}
                  onClick={() => {
                    setMobileStep(1);
                  }}
                >
                  알림 설정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={mobileStep == 2 ? styles.current : null}
                  onClick={() => {
                    setMobileStep(2);
                  }}
                >
                  활동 이력
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={mobileStep == 3 ? styles.current : null}
                  onClick={() => {
                    setMobileStep(3);
                  }}
                >
                  로그인 정보
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.MyPageContent}>
            <div className="inner">
              {mobileStep == 0 && (
                // 조회 조건
                <div className={styles.myCompany}>
                  {/* 조회 조건 - 기업 영역 */}
                  <h4 className={styles.mainTit}>
                    <span>
                      기업정보
                      <i
                        onClick={tooltipOpen}
                        className="btnToolTip"
                        data-text="Hi"
                      >
                        <img
                          src={require("assets/img/global/btn/btn_tooltip.png")}
                          alt="tooltip"
                        />
                        <Tooltip
                          cont={
                            "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                          }
                        />
                      </i>
                    </span>
                  </h4>
                  <p className={`isMobile ${styles.notice}`}>
                    지원사업 조건을 수정하면
                    <br />
                    맞춤정보를 받을 수 있어요.
                  </p>
                  <div className={styles.box}>
                    <MyCompany />
                  </div>
                </div>
              )}
              {mobileStep == 1 && <MyPageAlarmTab styles={styles} />}
              {/* 알림설정 */}

              {mobileStep == 2 && (
                <div className={styles.myRecord}>
                  <h4 className={styles.mainTit}>활동 이력</h4>
                  <p className={`isMobile ${styles.notice}`}>
                    회원님의 활동을 바로 확인할 수 있어요.
                  </p>
                  <div className={styles.box}>
                    <button
                      type="button"
                      onClick={() => {
                        alert("준비 중입니다.");
                      }}
                    >
                      <div className={styles.imgArea}>
                        <img
                          src={require("assets/img/myPage/myPage_01.png")}
                          alt="멤버십 결제"
                        />
                      </div>
                      <span>멤버십 결제</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert("준비 중입니다.");
                      }}
                    >
                      <div className={styles.imgArea}>
                        <img
                          src={require("assets/img/myPage/myPage_02.png")}
                          alt="엑시토 프렌즈 결제"
                        />
                      </div>
                      <span>엑시토 프렌즈 결제</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        alert("준비 중입니다.");
                      }}
                    >
                      <div className={styles.imgArea}>
                        <img
                          src={require("assets/img/myPage/myPage_03.png")}
                          alt="이메일 정기배송 이력"
                        />
                      </div>
                      <span>이메일 정기배송 이력</span>
                    </button>
                  </div>
                </div>
              )}
              {/* 활동 이력 */}

              {mobileStep == 3 && (
                <div className={styles.myLogin}>
                  <h4 className={styles.mainTit}>
                    <span>
                      로그인정보
                      <i
                        onClick={tooltipOpen}
                        className="btnToolTip"
                        data-text="Hi"
                      >
                        <img
                          src={require("assets/img/global/btn/btn_tooltip.png")}
                          alt="tooltip"
                        />
                        <Tooltip
                          cont={
                            "입력한 정보는 저장되며 해당정보를 기반으로 맞춤 추천및 지원사업 조회가 가능합니다."
                          }
                        />
                      </i>
                    </span>
                  </h4>
                  <p className={`isMobile ${styles.notice}`}>
                    로그인 정보를 수정할 수 있어요.
                  </p>
                  <div className={styles.box}>
                    <MyLogin />
                  </div>
                </div>
              )}
              {/* 로그인 정보 */}

              {/* 활동이력 */}

              {/* 로그인 정보 */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MyPage;
