import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/BoxListItem.module.scss";
const BoxListItemHome = ({
  item,
  writerShow,
  commentShow,
  viewShow,
  likeShow,
  url,
}) => {
  return (
    <>
      <div className={styles.BoxListItem}>
        <Link to={`${url}${item.id}`}>
          <h5 className={styles.title}>{item.si_title}</h5>
          {writerShow && <p className={styles.writer}>{item.target_name}</p>}
          <div className={styles.countArea}>
            {commentShow && (
              <p>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_comment.png"
                  }
                  alt="like count"
                />
                <span>{item.comment_cnt}</span>
              </p>
            )}
            {likeShow && (
              <p>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_like.png"
                  }
                  alt="View count"
                />
                <span>{item.lovely_cnt}</span>
              </p>
            )}
            {viewShow && (
              <p>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_view_gray.png"
                  }
                  alt="like count"
                />
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
