import React from "react";
import AppleLogin from "react-apple-login";
import {
  APPLE_CLIENT_ID,
  APPLE_REDIRECT_URI,
  APPLE_RESPONSE_TYPE,
  APPLE_RESPONSE_MODE,
} from "./AppleLoginData";
const AppleLoginPage = () => {
  const obj = {
    iss: "https://appleid.apple.com",
    aud: "exito",
    exp: 1672904447,
    iat: 1672818047,
    sub: "000266.94ce5e3564264e18857996e49caca6cd.0509",
    c_hash: "XXLddexwCT-SAzxfZhIRsQ",
    auth_time: 1672818047,
    nonce_supported: true,
  };
  const obj2 = {
    iss: "https://appleid.apple.com",
    aud: "exito",
    exp: 1672907858,
    iat: 1672821458,
    sub: "000266.94ce5e3564264e18857996e49caca6cd.0509",
    c_hash: "V5tkQmYJKQbe5nY1YIOmHA",
    auth_time: 1672821458,
    nonce_supported: true,
  };
  return (
    <>
      <div>EFFFEE</div>
      <AppleLogin
        clientId={APPLE_CLIENT_ID}
        responseType={APPLE_RESPONSE_TYPE}
        responseMode={APPLE_RESPONSE_MODE}
        redirectURI={APPLE_REDIRECT_URI}
        usePopup={false}
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
      <div>EEE</div>
      {/* https://tomz.co.kr/ AppleLogin#
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
