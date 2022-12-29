import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "scss/pages/MyPage.module.scss";
import { loadingStart, loadingEnd, setUserInfo } from "redux/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOut, removeUserInfo } from "redux/store";
import {
  REST_API_KEY,
  REDIRECT_URI,
  LOGOUT_REDIRECT_URI,
} from "pages/login/KakaoLoginData";
const MyLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState("");
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
    if (nickname == "탈퇴회원") {
      alert("해당 닉네임은 사용하실 수 없습니다.");
      return false;
    }
    // dispatch(loadingStart());
    axios({
      url: "/user/checkNickname",
      method: "POST",
      headers: {
        usernickname: encoding(nickname),
      },
    }).then((res) => {
      // dispatch(loadingEnd());
      setNicknameCheck(res.data);
    });
  };
  const nicknameSubmit = () => {
    if (nicknameCheck) {
      // dispatch(loadingStart());
      axios({
        url: `/user/updateUserInfo?usernickname=${encoding(nickname)}`,
        method: "POST",
        headers: {
          userid: userInfo.id,
        },
      }).then((res) => {
        userInfoUpdate(userInfo.id);
        setNicknameCheck("");
        alert("수정되었습니다.");
      });
    } else {
      alert("닉네임 중복 확인을 해주세요.");
    }
  };
  const userInfoUpdate = (id) => {
    axios({
      url: "/user/getUserInfo",
      method: "POST",
      headers: { userId: id },
    }).then((res) => {
      const data = res.data;
      dispatch(setUserInfo(data));
      // dispatch(loadingEnd());
    });
  };
  const withdraw = () => {
    if (
      window.confirm(
        "회원 탈퇴 시 작성한 개인정보는 모두 삭제처리되며,\n작성한 게시물은 삭제되지 않습니다."
      )
    ) {
      axios({
        url: "/user/withdraw",
        headers: {
          userId: userInfo.id,
        },
        method: "POST",
      }).then((res) => {
        dispatch(signOut());
        dispatch(removeUserInfo());
        navigate("/");
      });
    } else {
      alert("취소하였습니다.");
    }
  };
  function encoding(string) {
    return encodeURI(string);
  }
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      if (userInfo.id.length == 10) {
        //카카오
        const token = localStorage.getItem("kakaoToken");
        console.log(token);
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
      }
    }
  };
  useEffect(() => {
    if (userInfo.usernickname != null) setNickname(userInfo.usernickname);
  }, [userInfo]);
  return (
    <div className={styles.MyLogin}>
      <div className={styles.loginSns}>
        <p className={styles.tit}>카카오 / 애플 로그인</p>
        <div className={styles.iptArea}>
          <input type="text" value={userInfo.useremail || ""} disabled />
          <button className={styles.btnBlue} onClick={handleLogout}>
            로그아웃
          </button>
          <button className={styles.btnGray} onClick={withdraw}>
            회원탈퇴
          </button>
        </div>
      </div>
      <form className={styles.nicknameArea} onSubmit={nicknameCheckSubmit}>
        <p className={styles.tit}>닉네임</p>
        <div className={styles.iptArea}>
          <input
            type="text"
            placeholder="최대 8글자"
            maxLength={8}
            value={nickname || ""}
            onChange={nicknameChange}
          />
          <button type="submit" className={styles.btnSquareGray}>
            중복확인
          </button>
          <button
            type="button"
            className={styles.btnBlue}
            onClick={() => {
              nicknameSubmit();
            }}
          >
            수정하기
          </button>
        </div>
      </form>
      {/* {nicknameCheck.toString()} */}
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
    </div>
  );
};
export default MyLogin;
