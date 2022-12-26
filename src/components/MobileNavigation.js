import React from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/MobileNavigation.module.scss";
const MobileNavigation = () => {
  return (
    <>
      <ul className={styles.MobileNavigation}>
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