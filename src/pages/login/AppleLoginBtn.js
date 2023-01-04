import { useEffect } from "react";
import AppleLogin from "react-apple-login";
import {
  APPLE_CLIENT_ID,
  APPLE_REDIRECT_URI,
  APPLE_RESPONSE_TYPE,
  APPLE_RESPONSE_MODE,
} from "./AppleLoginData";
const AppleLoginBtn = () => {
  useEffect(() => {
    sessionStorage.setItem("appleRedirectPath", window.location.pathname);
  }, []);
  return (
    <AppleLogin
      onClick={() => {
        sessionStorage.setItem("ASDF", "ASDFASDF");
      }}
      clientId={APPLE_CLIENT_ID}
      responseType={APPLE_RESPONSE_TYPE}
      responseMode={APPLE_RESPONSE_MODE}
      redirectURI={APPLE_REDIRECT_URI}
      usePopup={false}
      designProp={{
        height: 44,
        width: 373,
        color: "black",
        border: false,
        type: "sign-in",
        border_radius: 15,
        scale: 4,
        locale: "en_US",
      }}
    />
  );
};

export default AppleLoginBtn;
