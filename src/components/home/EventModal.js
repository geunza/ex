import React from "react";
import { useState, useEffect } from "react";
import styles from "scss/components/Modal.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
const EventModal = ({ modalOpener, modalTab }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  // tab_01 : 이메일 정기배송
  const [email, setEmail] = useState("");
  const checkEmail = (e) => {
    e.preventDefault();
    function validationEmail(email) {
      let regex =
        // eslint-disable-next-line
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      return regex.test(email);
    }
    if (validationEmail(email)) {
      if (
        window.confirm(`입력하신 ${email}으로 정기배송을 받아보시겠습니까?`)
      ) {
        axios({
          method: "POST",
          url: "/saved/insertDeliverEmail",
          headers: {
            user_id: userInfo.id,
          },
          data: { deliver_email: email },
        }).then((res) => {
          console.log(res);
          setEmail("");
          alert("신청 완료");
        });
      } else {
        alert("취소하셨습니다.");
      }
    } else {
      alert("이메일을 확인해 주세요.");
    }
  };

  // tab_02 : 키워드 알림
  const [keyword, setKeyword] = useState("");
  const [userKeyword, setUserKeyword] = useState([]);
  const [userKeywordDummy, setUserKeywordDummy] = useState([]);

  const getUserKeyword = () => {
    axios({
      url: "/mainpage/getKeyword",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    })
      .then((res) => {
        const data = res.data.keyword;
        if (data == null) {
          setUserKeyword([]);
        } else {
          setUserKeyword(data.split(","));
        }
      })
      .catch((err) => console.log(err));
  };
  const submitDummyKeyword = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
    const length = userKeywordDummy.length;
    if (userKeywordDummy.indexOf(keyword) >= 0) {
      alert("이미 등록된 키워드 입니다.");
      return false;
    }
    if (length >= 10) {
      alert("최대 10개까지 등록 가능합니다.");
    } else {
      setUserKeywordDummy([...userKeywordDummy, keyword]);
    }
  };
  const deleteDummyKeywordAll = () => {
    if (window.confirm("키워드 전체를 삭제하시겠습니까?")) {
      setUserKeywordDummy([]);
      alert("삭제되었습니다.");
    }
  };
  const deleteDummyKeyword = (item) => {
    if (window.confirm("삭제하시겠습니까?")) {
      const idx = userKeywordDummy.indexOf(item);
      let copy = [...userKeywordDummy];
      copy.splice(idx, 1);
      setUserKeywordDummy(copy);
      alert("삭제되었습니다.");
    }
  };

  const deleteTargetKeyword = () => {
    axios({
      url: "/mainpage/delKeyword",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
      data: { keyword: "서울" },
    })
      .then((res) => getUserKeyword())
      .catch((err) => console.log(err));
  };
  const deleteAllKeyword = () => {
    axios({
      url: "/mainpage/delAllKeyword",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    })
      .then((res) => getUserKeyword())
      .catch((err) => console.log(err));
  };
  const submitRealKeyword = () => {
    const defaultKey = [...userKeyword];
    const newKey = [...userKeywordDummy];
    const both = defaultKey.filter((x) => newKey.includes(x)); // 그대로 유지
    const onlyDefault = defaultKey.filter((x) => !newKey.includes(x)); // 삭제
    const onlyNew = newKey.filter((x) => !defaultKey.includes(x)); //새로 추가
    onlyDefault.forEach((item) => {
      axios({
        url: "/mainpage/delKeyword",
        method: "POST",
        headers: { user_id: userInfo.id },
        data: { keyword: item },
      }).then((res) => console.log(res));
    });
    onlyNew.forEach((item) => {
      axios({
        url: "/mainpage/insertKeyword",
        method: "POST",
        headers: { user_id: userInfo.id },
        data: { keyword: item },
      }).then((res) => console.log(res));
    });
    // 기존 : 스타트업2, 스타트업3
    // 최종 : bbccdd, bbcc, bb, aa, 스타트업3
    //   axios({
    //     url: "/mainpage/insertKeyword",
    //     method: "POST",
    //     headers: {
    //       user_id: userInfo.id,
    //     },
    //     data: { keyword: "스타트업" },
    //   })
    //     .then((res) => getUserKeyword())
    //     .catch((err) => console.log(err));
  };
  useEffect(() => {
    let copy = [...userKeyword];
    copy.sort((a, b) => {
      if (a > b) return 1;
      else if (b > a) return -1;
      else return 0;
    });
    setUserKeywordDummy(copy);
  }, [userKeyword]);

  useEffect(() => {
    if (modalTab == 1) {
      getUserKeyword();
    }
  }, [userInfo]);
  return (
    // CHECK : TITLE IMG 체크
    <div className={`${styles.modalWrap} ${styles.EventModal}`}>
      <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
        <div className="eventModal">
          {modalTab === 0 && (
            <div className={styles.eventModal_01}>
              <div className={styles.modalTop}>
                <div className={styles.tit}>
                  <img
                    priority
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/event_modal_01.png"
                    }
                    alt="지원사업 정기배송"
                  />
                  <p>지원사업 정기배송</p>
                </div>
                <button
                  type="button"
                  value={false}
                  onClick={modalOpener}
                  className={styles.btn_close}
                >
                  <img
                    priority
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_close_black.png"
                    }
                    alt="닫기"
                  />
                </button>
              </div>
              <div className={styles.contArea}>
                <p className={styles.para}>
                  <mark>매주 월요일</mark> 테마별 지원사업을 무료로 받아보세요!
                </p>
                <form className={styles.eventForm} onSubmit={checkEmail}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                  <button type="submit" onClick={checkEmail}>
                    신청하기
                  </button>
                </form>
              </div>
            </div>
          )}
          {modalTab === 1 && (
            <div className={styles.eventModal_02}>
              <div className={styles.modalTop}>
                <div className={styles.tit}>
                  <img
                    priority
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/event_modal_02.png"
                    }
                    alt="키워드 알림"
                  />
                  <p>키워드 알림</p>
                </div>
                <button
                  type="button"
                  value={false}
                  onClick={modalOpener}
                  className={styles.btn_close}
                >
                  <img
                    priority
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_close_black.png"
                    }
                    alt="닫기"
                  />
                </button>
              </div>
              <div className={styles.contArea}>
                <p className={styles.para}>
                  키워드를 등록하시면 APP PUSH로 배송해 드릴게요!
                </p>
                <form
                  onSubmit={submitDummyKeyword}
                  className={styles.eventForm}
                >
                  <input
                    type="text"
                    value={keyword}
                    maxLength="7"
                    onChange={(e) => {
                      setKeyword(e.currentTarget.value);
                    }}
                  />
                  <button type="submit">등록</button>
                </form>
                {userKeywordDummy.length > 0 ? (
                  <>
                    <ul className={styles.commonList}>
                      {userKeywordDummy.map((item, idx) => {
                        return (
                          <li className={styles.listWithDelete} key={idx}>
                            <p>{item}</p>
                            <button
                              type="button"
                              onClick={() => {
                                deleteDummyKeyword(item);
                              }}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/public_assets/img/global/btn/btn_close_white_small.png"
                                }
                                alt="닫기"
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                    <div className={styles.deleteAll}>
                      <button
                        className={styles.removeAll}
                        type="button"
                        onClick={deleteDummyKeywordAll}
                      >
                        전체삭제
                      </button>
                    </div>
                  </>
                ) : (
                  <p className={styles.subTit}>
                    <span>설정한 키워드가 없습니다.</span>
                  </p>
                )}
              </div>
              <div className={styles.modalSubmit}>
                <button
                  type="button"
                  onClick={(e) => {
                    submitRealKeyword();
                    modalOpener(e);
                  }}
                  value={false}
                >
                  설정 완료
                </button>
              </div>
            </div>
          )}
          {modalTab === 2 && (
            <div className={styles.eventModal_03}>
              <div className={styles.modalTop}>
                <div className={styles.tit}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/event_modal_03.png"
                    }
                    alt="창업자 네트워킹"
                  />
                  <p>창업자 네트워킹</p>
                </div>
                <button
                  type="button"
                  value={false}
                  onClick={modalOpener}
                  className={styles.btn_close}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_close_black.png"
                    }
                    alt="닫기"
                  />
                </button>
              </div>
              <div className={styles.contArea}>
                <p className={styles.para}>
                  실시간 소통이 가능한 엑시토 오픈 채팅방에 초대합니다!
                </p>
                <button
                  onClick={() => {
                    openInNewTab("https://example.com");
                  }}
                  type="button"
                >
                  입장하기
                </button>
              </div>
            </div>
          )}
          {modalTab === 3 && (
            <div className={styles.eventModal_04}>
              <div className={styles.modalTop}>
                <div className={styles.tit}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/home/event_modal_04.png"
                    }
                    alt="사업계획서 교육"
                  />
                  <p>사업계획서 교육</p>
                </div>
                <button
                  type="button"
                  value={false}
                  onClick={modalOpener}
                  className={styles.btn_close}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_close_black.png"
                    }
                    alt="닫기"
                  />
                </button>
              </div>
              <div className={styles.contArea}>
                <p className={styles.para}>
                  <span>10년 이상 경력의 전문 컨설턴트와 함께라면</span>
                  <span> 자금조달에 성공할 수 있습니다!</span>
                </p>
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        alert("CHECK : 링크 적용");
                      }}
                    >
                      예비창업반
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        alert("CHECK : 링크 적용");
                      }}
                    >
                      초기창업반
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        alert("CHECK : 링크 적용");
                      }}
                    >
                      일반기업반
                    </button>
                  </li>
                </ul>
                <p className={styles.subTit}>
                  * 클래스 클릭 시, 해당 교육 신청서로 이동합니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventModal;
