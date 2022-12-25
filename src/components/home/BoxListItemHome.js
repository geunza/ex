import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/BoxListItem.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
const BoxListItemHome = ({
  item,
  writerShow,
  commentShow,
  viewShow,
  likeShow,
  getHomeSupport,
  category,
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  const isMobile = useSelector((state) => state.isMobile);
  const openInNewTab = (url, idx) => {
    window.open(url, "_blank", "noopener,noreferrer");
    if (Object.keys(userInfo).length > 0) {
      axios({
        url: "/mainpage/insertTimeLine",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: { support_info: idx },
      }).then((res) => {});
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${idx}`,
      method: "POST",
    }).then((res) => {
      getHomeSupport(category.category, category.url, category.cat_name);
    });
  };
  return (
    <>
      <div className={styles.BoxListItem}>
        <Link to={"support/supportView/" + item.si_idx}>
          <h5 className={styles.title}>{item.si_title}</h5>
          {writerShow && <p className={styles.writer}>{item.target_name}</p>}
          <div className={styles.countArea}>
            {commentShow && (
              <p>
                <img
                  src={require("assets/img/global/ico/ico_comment.png")}
                  alt="like count"
                />
                <span>{item.comment_cnt}</span>
              </p>
            )}
            {likeShow && (
              <p>
                <img
                  src={require("assets/img/global/ico/ico_like.png")}
                  alt="View count"
                />
                <span>{item.lovely_cnt}</span>
              </p>
            )}
            {viewShow && (
              <p>
                {isMobile ? (
                  <img
                    src={require("assets/img/global/ico/ico_view_green.png")}
                    alt="like count"
                  />
                ) : (
                  <img
                    src={require("assets/img/global/ico/ico_view_gray.png")}
                    alt="like count"
                  />
                )}
                <span>{item.view_cnt}</span>
              </p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};
export default BoxListItemHome;
