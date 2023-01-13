import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from "pages/login/LoginData";
import {
  signIn,
  setUserInfo,
  loadingEnd,
  loadingStart,
  setKakaoInform,
} from "redux/store";
import Loading from "components/Loading";
const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");

  const getKakaoTokenByFetch = () => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: `grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("kakaoToken", data.access_token);
        }
        console.log("data", data);
        axios({
          method: "POST",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            Authorization: `Bearer ${data.access_token}`,
          },
        })
          .then((res2) => {
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
                userId: id,
              },
            }).then((result) => {
              const data = result.data;
              if (data === null) {
                // 최초 가입
                dispatch(setKakaoInform({ state: true, datas: obj }));
                navigate("/");
              } else if (Object.keys(data).length > 0) {
                if (data.usernickname == "탈퇴회원") {
                  // 탈퇴 회원
                  dispatch(setKakaoInform({ state: true, datas: obj }));
                  navigate("/");
                } else {
                  // 기존 회원
                  const headers = obj;
                  console.log("headers", headers);
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
                          sessionStorage.setItem("userId", userId);
                          sessionStorage.setItem("oAuthType", "kakao");
                          dispatch(signIn(data));
                          dispatch(setUserInfo(data));
                        })
                        .then((res) => {
                          const rePath =
                            sessionStorage.getItem("kakaoRedirectPath") ?? "/";

                          navigate(rePath);
                          sessionStorage.removeItem("kakaoRedirectPath");
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
            alert("비정상적인 접근입니다.");
            navigate("/");
            // dispatch(loadingEnd());
          });
      })
      .catch((err) => {
        alert("비정상적인 접근입니다.");
        navigate("/");
      });
  };
  useEffect(() => {
    dispatch(loadingStart());
    if (!location.search) return;
    getKakaoTokenByFetch();
    return () => {
      dispatch(loadingEnd());
    };
  }, []);

  return null;
};
export default KakaoLogin;
