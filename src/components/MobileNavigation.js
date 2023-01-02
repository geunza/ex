import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setLoginCheck } from "redux/store";
import styles from "scss/components/MobileNavigation.module.scss";
const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [communityBtnShow, setCommunityBtnShow] = useState(false);
  useEffect(() => {
    const path = location.pathname;
    path.includes("communityList")
      ? setCommunityBtnShow(true)
      : setCommunityBtnShow(false);
  }, [location]);

  return (
    <>
      <ul className={styles.MobileNavigation}>
        <li className={styles.mobileBtns}>
          {communityBtnShow && (
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                navigate("/community/communityWrite");
              }}
              className={styles.btnWrite}
            >
              커뮤니티 글 작성
            </button>
          )}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className={styles.toTop}
          >
            To Top
          </button>
        </li>
        <li>
          <Link to={"/"}>
            <img src={require("assets/img/global/ico/mNavHome.png")} alt="홈" />
            <span>홈</span>
          </Link>
        </li>
        <li>
          <Link to={"/saved"}>
            <img
              src={require("assets/img/global/ico/mNavSaved.png")}
              alt="찜"
            />
            <span>찜</span>
          </Link>
        </li>
        <li>
          <Link to={"/support/supportList"}>
            <img
              src={require("assets/img/global/ico/mNavSupport.png")}
              alt="지원사업"
            />
            <span>지원사업</span>
          </Link>
        </li>
        <li>
          <Link to={"/community/communityList"}>
            <img
              src={require("assets/img/global/ico/mNavComm.png")}
              alt="커뮤니티"
            />
            <span>커뮤니티</span>
          </Link>
        </li>
      </ul>
    </>
  );
};
export default MobileNavigation;
