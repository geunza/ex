import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "./KakaoLoginData";
import {
  signIn,
  setUserInfo,
  loadingEnd,
  loadingStart,
  setKakaoInform,
} from "redux/store";
const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
  // console.log(REST_API_KEY);
  // console.log(REDIRECT_URI);
  // console.log(KAKAO_CODE);

  const getKakaoTokenByFetch = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.access_token) {
          localStorage.setItem("kakaoToken", data.access_token);
        }

        axios({
          method: "POST",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Authorization: `Bearer ${data.access_token}`,
          },
        })
          .then((res2) => {
            console.log(res2);
            console.log(res2.data);
            let data = res2.data;
            let id = data.id;
            let account = data.kakao_account;
            let properties = data.properties;
            let obj = {
              userid: id,
              idprofile: properties.profile_image,
              userbirthday: account.birthday,
              useragerange: account.age_range,
              usergender: account.gender,
              useremail: account.email,
              username: account.profile.nickname,
              userhp: account.user_number,
            };
            for (let key in obj) {
              if (obj[key] == undefined || obj[key] == null) {
                delete obj[key];
              } else {
                obj[key] = encodeURI(obj[key]);
              }
            }
            axios({
              url: "/user/getUserInfo",
              method: "POST",
              headers: {
                userId: 1115,
              },
            }).then((result) => {
              // console.log("result.data", result.data);
              const data = result.data;
              if (data === null) {
                // 데이터값 null
                dispatch(setKakaoInform({ state: true, datas: obj }));
                navigate("/");
              } else if (Object.keys(data).length > 0) {
                // 데이터가 존재하긴 함
                if (data.usernickname == "탈퇴회원") {
                  // 데이터가 존재하긴 하지만 탈퇴
                  dispatch(setKakaoInform({ state: true, datas: obj }));
                  navigate("/");
                } else {
                  // console.log("로그인 시작");
                  // console.log("id", id);
                  // console.log("obj2", obj);
                  const headers = obj;
                  axios({
                    url: "/kakao/login",
                    method: "POST",
                    headers: headers,
                  })
                    .then(() => {
                      // console.log("로그인 완료");
                      axios({
                        url: "/user/getUserInfo",
                        method: "POST",
                        headers: { userId: id },
                      })
                        .then((res4) => {
                          const data = res4.data;
                          const userId = data.id;
                          // console.log("data", data);
                          // console.log("userId", userId);
                          sessionStorage.setItem("userId", userId);
                          dispatch(signIn(data));
                          dispatch(setUserInfo(data));
                        })
                        .then((res) => {
                          navigate("/");
                        });
                    })
                    .catch((err) => {
                      // console.log(err);
                    });
                }
              }
            });

            return { id: id, obj: obj };
          })
          .then((res3) => {})

          .catch((err) => {
            alert(err);
            dispatch(loadingEnd());
          });
      });
  };
  useEffect(() => {
    dispatch(dispatch(loadingStart()));
    if (!location.search) return;
    getKakaoTokenByFetch();
  }, []);

  return null;
};
export default KakaoLogin;
