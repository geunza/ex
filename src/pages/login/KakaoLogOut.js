import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut, removeUserInfo } from "redux/store";
const KakaoLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
    dispatch(removeUserInfo());
    sessionStorage.removeItem("oAuthType");
    navigate("/");
  }, []);
  return (
    <>
      <div>KakaoLogOut</div>
    </>
  );
};
export default KakaoLogOut;
