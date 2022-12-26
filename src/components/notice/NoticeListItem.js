import React, { useEffect, useState } from "react";
import styles from "scss/pages/Notice.module.scss";
import { Link } from "react-router-dom";
const NoticeListItem = ({ item }) => {
  const [mustRead, setMustRead] = useState("");
  useEffect(() => {
    setMustRead(item.mustYn);
  }, []);
  return (
    <li className={`commonListItem ${styles.noticeListItem}`}>
      <div className="cateArea">
        <span className={styles.cate}>
          {mustRead == "Y" ? (
            <span className={styles.mustRead}>필독</span>
          ) : (
            <span>일반</span>
          )}
        </span>
      </div>
      <div className={`leftArea ${styles.leftArea}`}>
        <Link to={`/notice/noticeView/${item.id}`}>
          <p className="title">{item.title}</p>
          <div
            className={`content ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: item.contents }}
          ></div>
        </Link>
      </div>
      <div className={`rightArea ${styles.rightArea}`}>
        <span className="time">{item.createAt}</span>
      </div>
    </li>
  );
};
export default NoticeListItem;
