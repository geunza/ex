import { useEffect } from "react";
import { ReactComponent as AppleLogo } from "assets/img/global/ico/ico_apple_black.svg";
import {
  APPLE_CLIENT_ID,
  APPLE_REDIRECT_URI,
  APPLE_RESPONSE_TYPE,
  APPLE_RESPONSE_MODE,
  APPLE_STATE,
} from "pages/login/LoginData";
const AppleLoginBtn = () => {
  const btnClick = () => {
    const config = {
      client_id: APPLE_CLIENT_ID,
      redirect_uri: APPLE_REDIRECT_URI,
      response_type: APPLE_RESPONSE_TYPE,
      state: APPLE_STATE,
      response_mode: APPLE_RESPONSE_MODE,
    };
    const queryString = Object.entries(config)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    window.location = `https://appleid.apple.com/auth/authorize?${queryString}`;
  };
  useEffect(() => {
    sessionStorage.setItem("appleRedirectPath", window.location.pathname);
  }, []);
  return (
    <>
      <button onClick={btnClick} className="btnLogin btnAppleLogin">
        <AppleLogo width="20" height="100%" fill="#fff" />
        <span>Apple로 로그인</span>
      </button>
    </>
  );
};

export default AppleLoginBtn;
