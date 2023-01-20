import React, { useEffect } from "react";
import { useState } from "react";
import styles from "scss/components/Modal.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingStart,
  loadingEnd,
  modalOverflow,
  setUserInfo,
  signIn,
  setKakaoInform,
  setAppleInform,
} from "redux/store";
import { useNavigate } from "react-router-dom";
const SignInPolicyModal = ({ setLastCheck, kakaoInform, appleInform }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const isMobile = useSelector((state) => state.isMobile);
  const userInfo = useSelector((state) => state.userInfo);
  const [allChecked, setAllChecked] = useState(false);
  const [policyObj, setPolicyObj] = useState({
    policy_0: false,
    policy_1: false,
    policy_2: false,
    policy_3: false,
  });
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState("");
  const [email, setEmail] = useState("");
  const nicknameChange = (e) => {
    const {
      currentTarget: { value, maxLength },
    } = e;
    const name = e.currentTarget.value;
    if (!(name.length > maxLength)) {
      setNickname(name);
    }
    setNicknameCheck("");
  };
  const nicknameCheckSubmit = (e) => {
    e.preventDefault();
    if (nickname.replaceAll(" ", "") == "") {
      alert("닉네임을 입력해주세요.");
      return false;
    }
    if (nickname.slice(0, 1) == " ") {
      alert("첫 글자에는 공백이 들어갈 수 없습니다..");
      return false;
    }
    // dispatch(loadingStart());
    axios({
      url: process.env.REACT_APP_API_RESOURCE + "/user/checkNickname",
      method: "POST",
      headers: {
        usernickname: encoding(nickname),
      },
    }).then((res) => {
      // dispatch(loadingEnd());
      setNicknameCheck(res.data);
    });
  };
  const chkChange = (e) => {
    const {
      target: { id, checked },
    } = e;
    let copy = { ...policyObj };
    copy[id] = checked;
    setPolicyObj(copy);
  };
  const checkAllChange = (e) => {
    const {
      target: { checked },
    } = e;
    let copy = { ...policyObj };
    if (checked) {
      for (let key in copy) {
        copy[key] = true;
      }
      setPolicyObj(copy);
    } else {
      for (let key in copy) {
        copy[key] = false;
      }
      setPolicyObj(copy);
    }
  };
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const lastStepSubmit = () => {
    const emailCheck_blank = email.replaceAll(" ", "") == "";
    const nicknameCheck_blank = nickname.replaceAll(" ", "") == "";
    const policyCheck_blank =
      policyObj.policy_0 + policyObj.policy_1 + policyObj.policy_2 < 3;
    // 빈칸 검출
    if (emailCheck_blank + nicknameCheck_blank + policyCheck_blank >= 2) {
      alert("필수 항목을 입력해 주세요.");
      return false;
    } else {
      if (emailCheck_blank) {
        alert("이메일을 입력해 주세요.");
        return false;
      }
      if (nicknameCheck_blank) {
        alert("닉네임을 입력해 주세요.");
        return false;
      }
      if (policyCheck_blank) {
        alert("약관을 체크해 주세요.");
        return false;
      }
      if (!validationEmail(email)) {
        alert("이메일을 확인해 주세요.");
        return false;
      }
      if (nicknameCheck !== true) {
        alert("닉네임 중복 확인을 해주세요.");
        return false;
      }
    }
    let headers = {};
    if (kakaoInform.state) {
      headers = { ...kakaoInform.datas };
      sessionStorage.setItem("oAuthType", "kakao");
    }
    if (appleInform.state) {
      headers = { userid: appleInform.datas.userid };
      sessionStorage.setItem("oAuthType", "apple");
    }
    headers.username = encodeURI(nickname);
    headers.useremail = email;
    axios({
      url: process.env.REACT_APP_API_RESOURCE + "/kakao/login",
      method: "POST",
      headers: headers,
    })
      .then(() => {
        axios({
          url:
            process.env.REACT_APP_API_RESOURCE +
            `/user/updateUserInfo?usernickname=${encodeURI(nickname)}`,
          method: "POST",
          headers: {
            userid: headers.userid,
          },
        }).then((res) => {
          axios({
            url: process.env.REACT_APP_API_RESOURCE + "/user/getUserInfo",
            method: "POST",
            headers: { userId: headers.userid },
          })
            .then((res4) => {
              const data = res4.data;
              const userId = data.id;
              sessionStorage.setItem("userId", userId);
              dispatch(signIn(data));
              dispatch(setUserInfo(data));
            })
            .then((res) => {
              let marketingValue = "N";
              if (policyObj.policy_3 == true) {
                marketingValue = "Y";
              }
              axios({
                url:
                  process.env.REACT_APP_API_RESOURCE +
                  "/user/updatePushSetting",
                method: "POST",
                headers: {
                  userId: headers.userid,
                },
                data: {
                  spReceivePush: "N",
                  spKeywordPush: "N",
                  spBookmarkPush: "N",
                  spRecommentPush: "N",
                  spCommentlikePush: "N",
                  spContentCommentPush: "N",
                  spCommunityCommentlikePush: "N",
                  spCommunityRecommentPush: "N",
                  marketingPush: marketingValue,
                },
              }).then(() => {
                if (kakaoInform.state) {
                  dispatch(setKakaoInform({ state: false, datas: {} }));
                }
                if (appleInform.state) {
                  dispatch(setAppleInform({ state: false, datas: {} }));
                }
                setLastCheck(false);
              });
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setAllChecked(!Object.values(policyObj).some((item) => item == false));
  }, [policyObj]);
  useEffect(() => {
    dispatch(modalOverflow(true));

    if (kakaoInform.state) {
      if (kakaoInform.datas.useremail != undefined) {
        setEmail(kakaoInform.datas.useremail);
      }
      if (kakaoInform.datas.username != undefined) {
        setNickname(decodeURI(kakaoInform.datas.username).slice(0, 8));
      }
    }
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  function encoding(string) {
    return encodeURI(string);
  }
  function validationEmail(email) {
    let regex =
      // eslint-disable-next-line
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regex.test(email);
  }

  return (
    <div className={`${styles.modalWrap} ${styles.SignInPolicyModal}`}>
      <div className={styles.modalInner}>
        <button
          onClick={() => {
            setEmail("test@test.com");
          }}
        >
          Apple로그인시 이메일 밀어넣기
        </button>
        <div>
          {isMobile ? (
            <div className={styles.MobileTitle}>
              <button
                className={styles.btnBack}
                onClick={() => {
                  // navigate(-1);
                  if (window.confirm("약관동의를 취소하시겠습니까?")) {
                    setLastCheck(false);
                  }
                }}
              >
                <img
                  src={require("assets/img/global/btn/btn_back_mobile.png")}
                  alt="Back"
                />
              </button>
              <h3>약관동의</h3>
            </div>
          ) : (
            <div className={styles.modalTop}>
              <div className={styles.tit}>
                <img
                  src={require("assets/img/global/ico/ico_policy.png")}
                  alt="엑시토 서비스 이용을 위한 마지막 단계입니다."
                />
                <p>엑시토 서비스 이용을 위한 마지막 단계입니다.</p>
              </div>
            </div>
          )}

          <div className={styles.modalCont}>
            {isMobile ? (
              <h4>
                엑시토 서비스 이용을 위한
                <br />
                마지막 단계입니다.
              </h4>
            ) : (
              <h4>엑시토 서비스 이용 필수 항목</h4>
            )}

            <div className={styles.email}>
              <p>이메일</p>
              <input
                type="email"
                placeholder="Ex_exito@exito.com"
                readOnly={appleInform.state ? false : true}
                value={email}
                onChange={
                  appleInform.state
                    ? (e) => {
                        setEmail(e.currentTarget.value);
                      }
                    : null
                }
              />
            </div>
            <div className={styles.nickname}>
              <p>닉네임</p>
              <form
                onSubmit={nicknameCheckSubmit}
                className={styles.formWithIpt}
              >
                <input
                  type="text"
                  onChange={nicknameChange}
                  placeholder="8자 이내"
                  value={nickname}
                  maxLength={8}
                />
                <button type="submit">중복확인</button>
                <p
                  className={
                    `${styles.nicknameCheck} ` +
                    (nicknameCheck === true
                      ? styles.checkOK
                      : nicknameCheck === false
                      ? styles.checkX
                      : "")
                  }
                >
                  {nicknameCheck === true
                    ? "* 사용할 수 있는 닉네임입니다."
                    : nicknameCheck === false
                    ? "* 사용할 수 없는 닉네임입니다."
                    : ` `}
                  &nbsp;
                </p>
              </form>
            </div>
            <ul className={styles.commonList}>
              <li className={`${styles.policyItem} ${styles.point}`}>
                <input
                  type="checkbox"
                  id="checkAll"
                  onChange={checkAllChange}
                  checked={allChecked}
                />
                <label htmlFor="checkAll">
                  <img
                    style={{ display: allChecked ? "none" : null }}
                    src={require("assets/img/global/ico/ico_check_false.png")}
                    alt="이용약관(필수)"
                  />
                  <img
                    style={{ display: !allChecked ? "none" : null }}
                    src={require("assets/img/global/ico/ico_check_true.png")}
                    alt="이용약관(필수)"
                  />
                  약관전체동의 <mark>(선택사항 포함)</mark>
                </label>
              </li>
              <li className={styles.policyItem}>
                <input
                  type="checkbox"
                  name="policy"
                  id="policy_0"
                  checked={policyObj.policy_0}
                  onChange={chkChange}
                />
                <label htmlFor="policy_0">
                  <img
                    src={require(policyObj.policy_0
                      ? "assets/img/global/ico/ico_check_true.png"
                      : "assets/img/global/ico/ico_check_false.png")}
                    alt="이용약관(필수)"
                  />
                  <span>이용약관(필수)</span>
                </label>
                <button
                  onClick={() => {
                    openInNewTab("https://exitobiz.co.kr/standard");
                  }}
                >
                  자세히
                </button>
              </li>
              <li className={styles.policyItem}>
                <input
                  type="checkbox"
                  name="policy"
                  id="policy_1"
                  checked={policyObj.policy_1}
                  onChange={chkChange}
                />
                <label htmlFor="policy_1">
                  <img
                    src={require(policyObj.policy_1
                      ? "assets/img/global/ico/ico_check_true.png"
                      : "assets/img/global/ico/ico_check_false.png")}
                    alt="개인정보 처리방침(필수)"
                  />
                  <span>개인정보 처리방침(필수)</span>
                </label>
                <button
                  onClick={(e) => {
                    openInNewTab("https://exitobiz.co.kr/personinfo");
                  }}
                >
                  자세히
                </button>
              </li>
              <li className={styles.policyItem}>
                <input
                  type="checkbox"
                  name="policy"
                  id="policy_2"
                  checked={policyObj.policy_2}
                  onChange={chkChange}
                />
                <label htmlFor="policy_2">
                  <img
                    src={require(policyObj.policy_2
                      ? "assets/img/global/ico/ico_check_true.png"
                      : "assets/img/global/ico/ico_check_false.png")}
                    alt="위치정보 수집/이용 동의(필수)"
                  />

                  <span>위치정보 수집/이용 동의(필수)</span>
                </label>
                <button
                  onClick={(e) => {
                    openInNewTab("https://exitobiz.co.kr/locationinfo");
                  }}
                >
                  자세히
                </button>
              </li>
              <li className={styles.policyItem}>
                <input
                  type="checkbox"
                  name="policy"
                  id="policy_3"
                  checked={policyObj.policy_3}
                  onChange={chkChange}
                />
                <label htmlFor="policy_3">
                  <img
                    src={require(policyObj.policy_3
                      ? "assets/img/global/ico/ico_check_true.png"
                      : "assets/img/global/ico/ico_check_false.png")}
                    alt="마케팅 수신 동의(선택)"
                  />
                  <span>마케팅 수신 동의(선택)</span>
                </label>
                <button
                  onClick={(e) => {
                    openInNewTab("https://exitobiz.co.kr/marketingInfo");
                  }}
                >
                  자세히
                </button>
              </li>
            </ul>
          </div>
          <div className={styles.modalSubmit}>
            <button type="submit" onClick={lastStepSubmit}>
              동의 후 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignInPolicyModal;
