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
  // console.log(REST_API_KEY);
  // console.log(REDIRECT_URI);
  // console.log(KAKAO_CODE);

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
                // ?????? ??????
                dispatch(setKakaoInform({ state: true, datas: obj }));
                navigate("/");
              } else if (Object.keys(data).length > 0) {
                if (data.usernickname == "????????????") {
                  // ?????? ??????
                  dispatch(setKakaoInform({ state: true, datas: obj }));
                  navigate("/");
                } else {
                  // ?????? ??????
                  const headers = obj;
                  axios({
                    url: "/kakao/login",
                    method: "POST",
                    headers: headers,
                  })
                    .then(() => {
                      // console.log("????????? ??????");
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
            alert("??????????????? ???????????????.");
            navigate("/");
            // dispatch(loadingEnd());
          });
      })
      .catch((err) => {
        alert("??????????????? ???????????????.");
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
