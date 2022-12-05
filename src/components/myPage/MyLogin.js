import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "scss/pages/MyPage.module.scss";
import { loadingStart, loadingEnd, setUserInfo } from "redux/store";
import axios from "axios";
const MyLogin = () => {
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
    dispatch(loadingStart());
    axios({
      url: "/user/checkNickname",
      method: "POST",
      headers: {
        usernickname: encoding(nickname),
      },
    }).then((res) => {
      dispatch(loadingEnd());
      setNicknameCheck(res.data);
    });
  };
  const nicknameSubmit = () => {
    if (nicknameCheck) {
      dispatch(loadingStart());
      axios({
        url: `/user/updateUserInfo?usernickname=${userInfo.usernickname}`,
        method: "POST",
        headers: {
          usernickname: encoding(nickname),
          userid: userInfo.id,
        },
      }).then((res) => {
        userInfoUpdate(userInfo.id);
      });
    } else {
      alert("닉네임 중복확인을 해주세요.");
    }
  };
  const userInfoUpdate = (id) => {
    axios({
      url: "/user/getUserInfo",
      method: "POST",
      headers: { userId: parseInt(id) },
    }).then((res) => {
      const data = res.data;
      dispatch(setUserInfo(data));
      dispatch(loadingEnd());
    });
  };
  function encoding(string) {
    return encodeURI(string);
  }
  return (
    <div className={styles.MyLogin}>
      <div className={styles.loginSns}>
        <p className={styles.tit}>카카오 / 애플 로그인</p>
        <div className={styles.iptArea}>
          <input type="text" value={userInfo.useremail} disabled />
          <button className={styles.btnBlue}>로그아웃</button>
          <button className={styles.btnGray}>회원탈퇴</button>
        </div>
      </div>
      <form className={styles.nicknameArea} onSubmit={nicknameCheckSubmit}>
        <p className={styles.tit}>닉네임</p>
        <div className={styles.iptArea}>
          <input
            type="text"
            placeholder="최대 8글자"
            maxLength={8}
            value={nickname}
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
          nicknameCheck === true
            ? styles.checkOK
            : nicknameCheck === false
            ? styles.checkX
            : ""
        }
      >
        {nicknameCheck === true
          ? "통과"
          : nicknameCheck === false
          ? "통과X"
          : ` `}
        &nbsp;
      </p>
    </div>
  );
};
export default MyLogin;
