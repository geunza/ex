import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "scss/components/BoxListItem.module.scss";
const BoxListItemCommunity = ({
  item,
  writerShow,
  commentShow,
  viewShow,
  likeShow,
  url,
}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <div className={styles.BoxListItem}>
        <Link to={`${url}${item.id}`}>
          <h5 className={styles.title}>{item.title}</h5>
          {writerShow && <p className={styles.writer}>{item.usernickname}</p>}
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
                <span>{item.like_cnt}</span>
              </p>
            )}
            {viewShow && (
              <p>
                <img
                  src={require("assets/img/global/ico/ico_view_gray.png")}
                  alt="like count"
                />
                <span>{item.view_count}</span>
              </p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};
export default BoxListItemCommunity;
