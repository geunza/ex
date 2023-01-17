import { useEffect } from "react";
import AppleLogin from "react-apple-login";
import { useLocation } from "react-router-dom";
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
      client_id: APPLE_CLIENT_ID, // This is the service ID we created.
      redirect_uri: APPLE_REDIRECT_URI, // As registered along with our service ID
      response_type: APPLE_RESPONSE_TYPE,
      state: APPLE_STATE, // Any string of your choice that you may use for some logic. It's optional and you may omit it.
      response_mode: APPLE_RESPONSE_MODE,
    };
    const queryString = Object.entries(config)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    window.location = `https://appleid.apple.com/auth/authorize?${queryString}`;
    console.log(`https://appleid.apple.com/auth/authorize?${queryString}`);
  };
  useEffect(() => {
    sessionStorage.setItem("appleRedirectPath", window.location.pathname);
  }, []);
  return (
    <>
      <button onClick={btnClick}>test</button>
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
    </>
  );
};

export default AppleLoginBtn;
