import React from "react";
import styles from "scss/components/Home/Event.module.scss";
import { Link } from "react-router-dom";
const Event = () => {
  return (
    <>
      <div className={styles.Event}>
        <h4>엑시토 이벤트</h4>
        <ul>
          <li>
            <Link to="###">지원사업 메일링 서비스</Link>
          </li>
          <li>
            <Link to="###">APP/WEB 제작</Link>
          </li>
          <li>
            <Link to="###">창업자 네트워킹</Link>
          </li>
          <li>
            <Link to="###">사업계획서 교육</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Event;
