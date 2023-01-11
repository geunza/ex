import React from "react";
import AppleLoginBtn from "pages/login/AppleLoginBtn";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  setUserInfo,
  loadingEnd,
  loadingStart,
  setAppleInform,
} from "redux/store";
import { useDispatch, useSelector } from "react-redux";
const AppleLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const APPLE_HASH = window.location.hash;
  const appleInform = useSelector((state) => state.appleInform);
  const getAppleData = () => {
    if (APPLE_HASH.length > 0) {
      const APPLE_CODE = APPLE_HASH.split("#")[1];
      const paramObj = { id_token: "", code: "", userid: "" };
      const paramArr = APPLE_CODE.split("&");
      paramArr.forEach((v) => {
        const newArr = v.split("=");
        paramObj[newArr[0]] = newArr[1];
      });
      paramObj.userid = JSON.parse(atob(paramObj.id_token.split(".")[1])).sub;
      if (paramObj.id_token == "" || paramObj.code == "") {
        alert("로그인에 실패하였습니다.");
        navigate("/");
        return false;
      }
      const headersData = {
        code: paramObj.code,
        id_token: paramObj.userid,
      };
      console.log("headersData", headersData);
      axios({
        url: "/user/getUserInfo",
        method: "POST",
        headers: {
          userId: paramObj.userid,
        },
      }).then((result) => {
        const data = result.data;
        if (data == null) {
          // 최초 가입
          console.log("최초 가입 입니다.");

          dispatch(setAppleInform({ state: true, datas: paramObj }));
          navigate("/");
        } else if (Object.keys(data).length > 0) {
          // 정보가 있음
          if (data.usernickname == "탈퇴회원") {
            // 탈퇴 회원
            console.log("탈퇴 회원 입니다.");
            dispatch(setAppleInform({ state: true, datas: paramObj }));
            navigate("/");
          } else {
            // 기존 회원
            console.log("기존 회원 입니다.");
            const userId = data.id;
            // console.log("data", data);
            // console.log("userId", userId);
            sessionStorage.setItem("userId", userId);
            const rePath = sessionStorage.getItem("appleRedirectPath") ?? "/";
            sessionStorage.setItem("oAuthType", "apple");
            dispatch(signIn(data));
            dispatch(setUserInfo(data));
            navigate(rePath);
          }
        }
      });
    } else {
      // navigate("/");
      alert("잘못된 접근입니다.");
    }
  };

  useEffect(() => {
    getAppleData();
  }, []);
  useEffect(() => {
    console.log("appleInform", appleInform);
  }, [appleInform]);
  // console.log("id_token", id_token);
  // console.log("code", code);
  // console.log("user_id", user_id);

  return (
    <>
      {/* <AppleLoginBtn /> */}
      {/* https://tomz.co.kr/ 
      AppleLogin#
      code=cb7825c96b71a46ed9faba74c0d5122d3.0.rsww.0aXl14MB_6htR-9a8AQfhA
      &id_token=eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiZXhpdG8iLCJleHAiOjE2NzI5MDQ0NDcsImlhdCI6MTY3MjgxODA0Nywic3ViIjoiMDAwMjY2Ljk0Y2U1ZTM1NjQyNjRlMTg4NTc5OTZlNDljYWNhNmNkLjA1MDkiLCJjX2hhc2giOiJYWExkZGV4d0NULVNBenhmWmhJUnNRIiwiYXV0aF90aW1lIjoxNjcyODE4MDQ3LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.tomvqpXGfCjzMYLJLENamC9fihtv3VH5ByBXmtsySJ16ReGk1e-vTDFoyaSz2AhNmpP4cmUlYD7F39rVW8JHxetRgshO7YSTSbm5ZM8FsnOxsnPj7c_tApMfXVCX_K1nirKirjjUIYTrul-CJo96MsF__VxM9jKn_zClHAfZEWj4FDtG7nmsT_FZz_2IxWMGz8UeFIw7wUG3QUs4gec_fWNPQya3X-JUN7jUsbVm8TH_HD7i1R4IqGQTaWBS_GpzEDCMeO_MLOQDEu27f8baQ9NCyZSVNZVJyHLzuhVWV3T1XeKoB2mt2H4xhqZyePj28q3Y7yRBcpKNHT_8pqitKQ
       */}
      {/* 
      AppleLogin#
      code=cb7825c96b71a46ed9faba74c0d5122d3.0.rsww.0aXl14MB_6htR-9a8AQfhA
      &id_token=eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiZXhpdG8iLCJleHAiOjE2NzI5MDQ0NDcsImlhdCI6MTY3MjgxODA0Nywic3ViIjoiMDAwMjY2Ljk0Y2U1ZTM1NjQyNjRlMTg4NTc5OTZlNDljYWNhNmNkLjA1MDkiLCJjX2hhc2giOiJYWExkZGV4d0NULVNBenhmWmhJUnNRIiwiYXV0aF90aW1lIjoxNjcyODE4MDQ3LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.tomvqpXGfCjzMYLJLENamC9fihtv3VH5ByBXmtsySJ16ReGk1e-vTDFoyaSz2AhNmpP4cmUlYD7F39rVW8JHxetRgshO7YSTSbm5ZM8FsnOxsnPj7c_tApMfXVCX_K1nirKirjjUIYTrul-CJo96MsF__VxM9jKn_zClHAfZEWj4FDtG7nmsT_FZz_2IxWMGz8UeFIw7wUG3QUs4gec_fWNPQya3X-JUN7jUsbVm8TH_HD7i1R4IqGQTaWBS_GpzEDCMeO_MLOQDEu27f8baQ9NCyZSVNZVJyHLzuhVWV3T1XeKoB2mt2H4xhqZyePj28q3Y7yRBcpKNHT_8pqitKQ
       */}
      {/* https://tomz.co.kr/AppleLogin#
      code=c4597f81633dc4a7496a2c40b6c171be1.0.rsww.Ko7oLr7znWCJMBPClmDsSg
      &id_token=eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiZXhpdG8iLCJleHAiOjE2NzI5MDc4NTgsImlhdCI6MTY3MjgyMTQ1OCwic3ViIjoiMDAwMjY2Ljk0Y2U1ZTM1NjQyNjRlMTg4NTc5OTZlNDljYWNhNmNkLjA1MDkiLCJjX2hhc2giOiJWNXRrUW1ZSktRYmU1blkxWUlPbUhBIiwiYXV0aF90aW1lIjoxNjcyODIxNDU4LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.T7idVKgn7t_hGjp9J8MEZ0kRAnFHUEEnzHeC480PkCDOnjH2UhlaeWmkoZP9EetvBg4QMosC-YYyralbB3kozwicnldp_qIglPMN8J5qzBsvpJBilr5GtSY1x-RsC9qDVpCvgCrV3xSQtKxgFuxwmLw6uWvsNAQV2Me8n1VwkI9uy2y4E2C0DGcrm5rHMexKA2TemaEbxUUi2fl3iw2WCK_X_1zTI_ZQ0LZXEZkozHlcFQEcKEDX1Os0BUZEksGvvFeS_aL0mJNypuJ6U7yIkT4wLOQKmzVMp7DU5TJyMJhF7bFmMJmhZsgCxZ3aLcT_r55Ffrxiqe0l3-GObEUeUg
       */}
    </>
  );
};
export default AppleLoginPage;
