import React from "react";
import styles from "scss/components/Footer.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <div className={styles.Footer}>
      {isMobile && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          className={styles.toTop}
        >
          To Top
        </button>
      )}
      <div className={styles.footerTop}>
        <ul className={styles.terms}>
          <li>
            <Link
              to="###"
              onClick={(e) => {
                e.preventDefault();
                alert("CHECK : 링크적용");
              }}
            >
              이용약관
            </Link>
          </li>
          <li>
            <Link
              to="###"
              onClick={(e) => {
                e.preventDefault();
                alert("CHECK : 링크적용");
              }}
            >
              개인정보처리약관
            </Link>
          </li>
          <li>
            <Link
              to="###"
              onClick={(e) => {
                e.preventDefault();
                alert("CHECK : 링크적용");
              }}
            >
              위치기반서비스이용약관
            </Link>
          </li>
          <li>
            <Link
              to="###"
              onClick={(e) => {
                e.preventDefault();
                alert("CHECK : 링크적용");
              }}
            >
              마케팅수신동의약관
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerMid}>
        <div className={styles.leftArea}>
          {isMobile && <h3>사업자정보</h3>}
          <ul>
            <li>
              <span>대표 : 권기정</span>
              <span>개인정보 책임자 : (주)CTNS</span>
              <span>사업자등록번호 : 307-81-50055</span>
            </li>
            <li>
              <span>고객센터 : 031-784-8443</span>
            </li>
            <li>
              <span>
                본사 : 경상남도 창원시 의창구 평산로 23 신화테크노밸리 6층
                639~641호
              </span>
            </li>
            <li>
              <span>
                지사 : 경기도 화성시 영천동 283-1 금강펜테리움 IX 타워
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.rightArea}>
          <ul>
            <li>
              <button onClick={() => window.open("###", "_blank")}>
                <img
                  src={require("assets/img/global/ico/ico_appstore.png")}
                  alt=""
                />
              </button>
            </li>
            <li>
              <button onClick={() => window.open("###", "_blank")}>
                <img
                  src={require("assets/img/global/ico/ico_playstore.png")}
                  alt=""
                />
              </button>
            </li>
            <li>
              <button onClick={() => window.open("###", "_blank")}>
                <img
                  src={require("assets/img/global/ico/ico_blog.png")}
                  alt=""
                />
              </button>
            </li>
            <li>
              <button onClick={() => window.open("###", "_blank")}>
                <img
                  src={require("assets/img/global/ico/ico_instagram.png")}
                  alt=""
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>Copyright &copy; EXITO. All rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;
