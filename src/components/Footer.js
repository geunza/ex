import React from "react";
import styles from "scss/components/Footer.module.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className="inner">
        <div className={styles.footerTop}>
          <ul className={styles.terms}>
            <li>
              <Link to="###">이용약관</Link>
            </li>
            <li>
              <Link to="###">개인정보처리약관</Link>
            </li>
            <li>
              <Link to="###">위치기반서비스이용약관</Link>
            </li>
            <li>
              <Link to="###">마케팅수신동의약관</Link>
            </li>
          </ul>
          <ul className={styles.sns}>
            <li>
              <button
                onClick={() => window.open("https://blog.naver.com", "_blank")}
              >
                네이버 블로그
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                인스타
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.footerCont}>
          <div className={styles.leftArea}>
            <ul>
              <li>
                <span>엑시토</span>
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
                <span>지사 : 경기도 화성시 영천동 283-1 금강펜테리움 IX</span>
              </li>
              <li>
                <span>Copyright &copy; EXITO. All rights reserved</span>
              </li>
            </ul>
          </div>
          <div className={styles.rightArea}>
            <span>앱다운로드</span>
            <ul>
              <li>
                <button onClick={() => window.open("###", "_blank")}>
                  <span>스토어이미지</span>
                  <span>Android</span>
                </button>
              </li>
              <li>
                <button onClick={() => window.open("###", "_blank")}>
                  <span>스토어이미지</span>
                  <span>iOS</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
