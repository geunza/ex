import React from "react";
import AppleLogin from "react-apple-login";
const AppleLoginPage = () => {
  return (
    <>
      <AppleLogin
        clientId={"exito"}
        redirectURI={"https://tomz.co.kr/AppleLogin"}
        responseType={"code"}
        responseMode={"query"}
        usePopup={false}
        callback={(res) => {
          console.log(res);
          console.log(res.data);
        }}
        designProp={{
          height: 30,
          width: 140,
          color: "black",
          border: false,
          type: "sign-in",
          border_radius: 15,
          scale: 1,
          locale: "en_US",
        }}
      />
    </>
  );
};
export default AppleLoginPage;
