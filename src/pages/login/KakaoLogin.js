import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "./KakaoLoginData";
import { signIn, setUserInfo } from "redux/store";
const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = new URL(window.location.href).searchParams.get("code");
  const dispatch = useDispatch();
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
          .then((res) => {
            console.log(res);
            console.log(res.data);
            const data = res.data;
            const id = data.id;
            const account = data.kakao_account;
            const properties = data.properties;
            const obj = {
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
              if (obj[key] == undefined) {
                obj[key] = "";
              }
            }
            return id;
          })
          .then((res) => {
            axios({
              url: "/user/getUserInfo",
              method: "POST",
              headers: { userId: res },
            })
              .then((res) => {
                const data = res.data;
                const id = data.id;
                sessionStorage.setItem("userId", id);
                dispatch(signIn(data));
                dispatch(setUserInfo(data));
              })
              .then((res) => {
                navigate("/");
              });
          })

          .catch((err) => {
            console.log(err);
          });
      });
  };
  // const getKakaoToken = async () => {
  //   const makeFormData = (params) => {
  //     const searchParams = new URLSearchParams();
  //     Object.keys(params).forEach((key) => {
  //       searchParams.append(key, params[key]);
  //     });
  //     return searchParams;
  //   };
  //   return await axios({
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //     },
  //     url: "https://kauth.kakao.com/oauth/token",
  //     data: makeFormData({
  //       grant_type: "authorization_code",
  //       client_id: REST_API_KEY,
  //       redirect_uri: REDIRECT_URI,
  //       code: KAKAO_CODE,
  //     }),
  //   }).then((res) => {
  //     alert(res.data);
  //     console.log(res.data);
  //     return res.data;
  //   });
  // };
  useEffect(() => {
    if (!location.search) return;
    getKakaoTokenByFetch();
  }, []);

  return (
    <>
      <div>KakaoLogin</div>
    </>
  );
};
export default KakaoLogin;
