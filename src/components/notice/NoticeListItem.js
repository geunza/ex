import React from "react";
import styles from "scss/notice/NoticeListItem.module.scss";
import { Link } from "react-router-dom";
const NoticeListItem = ({ item }) => {
  return (
    <li className={`commonListItem ${styles.noticeListItem}`}>
      <div className="cateArea">
        <span
          className={styles.cate}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {item.category}
        </span>
      </div>
      <div className="leftArea">
        <Link to={`/community/noticeView/${item.id}`}>
          <p className="title">{item.title}</p>
          <div
            className={`content ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: item.contents }}
          ></div>
        </Link>
      </div>
      <div className="rightArea">
        <span className="time">{item.cret_dt}</span>
      </div>
    </li>
  );
};
export default NoticeListItem;
