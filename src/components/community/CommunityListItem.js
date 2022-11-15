import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
const CommunityListItem = ({ post }) => {
  return (
    <li className={styles.CommunityListItem}>
      <div className={styles.cateArea}>
        <span
          className={styles.cate}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {post.category}
        </span>
      </div>
      <div className={styles.leftArea}>
        <Link to={`/community/communityView/${post.id}`}>
          <p className={styles.title}>{post.title}</p>
          <p className={styles.content}>{post.title}</p>
          <p className={styles.write}>
            <span className={styles.name}>{post.usernickname}</span>
            <span className={styles.time}>{post.cret_dt}</span>
          </p>
        </Link>
      </div>
      <div className={styles.rightArea}>
        <p>
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/ico/ico_comment.png"
            }
            alt="코멘트"
          />
          <span>{post.comment_cnt}</span>
        </p>
        <p>
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/ico/ico_like.png"
            }
            alt="좋아요"
          />
          <span>999</span>
        </p>
        <p>
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/ico/ico_view_gray.png"
            }
            alt="조회수"
          />
          <span>{post.view_count}</span>
        </p>
        <p>
          <button type="button" className={styles.myPost}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_more.png"
              }
              alt="내 게시글 관리"
            />
          </button>
        </p>
      </div>
    </li>
  );
};
export default CommunityListItem;
