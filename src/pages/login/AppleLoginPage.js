import React from "react";
import AppleLogin from "react-apple-login";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URI } from "./AppleLoginData";
const AppleLoginPage = () => {
  return (
    <>
      <div>EFFFEE</div>
      <AppleLogin
        clientId={APPLE_CLIENT_ID}
        responseType={"code id_token"}
        responseMode={"fragment"}
        redirectURI={APPLE_REDIRECT_URI}
        usePopup={false}
        callback={(res) => {
          console.log(res);
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
      <div>EEE</div>
      {/* https://tomz.co.kr/ AppleLogin#
      code=cb7825c96b71a46ed9faba74c0d5122d3.0.rsww.0aXl14MB_6htR-9a8AQfhA&id_token=eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiZXhpdG8iLCJleHAiOjE2NzI5MDQ0NDcsImlhdCI6MTY3MjgxODA0Nywic3ViIjoiMDAwMjY2Ljk0Y2U1ZTM1NjQyNjRlMTg4NTc5OTZlNDljYWNhNmNkLjA1MDkiLCJjX2hhc2giOiJYWExkZGV4d0NULVNBenhmWmhJUnNRIiwiYXV0aF90aW1lIjoxNjcyODE4MDQ3LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.tomvqpXGfCjzMYLJLENamC9fihtv3VH5ByBXmtsySJ16ReGk1e-vTDFoyaSz2AhNmpP4cmUlYD7F39rVW8JHxetRgshO7YSTSbm5ZM8FsnOxsnPj7c_tApMfXVCX_K1nirKirjjUIYTrul-CJo96MsF__VxM9jKn_zClHAfZEWj4FDtG7nmsT_FZz_2IxWMGz8UeFIw7wUG3QUs4gec_fWNPQya3X-JUN7jUsbVm8TH_HD7i1R4IqGQTaWBS_GpzEDCMeO_MLOQDEu27f8baQ9NCyZSVNZVJyHLzuhVWV3T1XeKoB2mt2H4xhqZyePj28q3Y7yRBcpKNHT_8pqitKQ */}
    </>
  );
};
export default AppleLoginPage;
