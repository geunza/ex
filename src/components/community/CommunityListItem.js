import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
const CommunityListItem = ({ post }) => {
  return (
    <li key={post.cret_dt} className={styles.CommunityListItem}>
      <Link to={`/community/communityView/${post.id}`}>
        <div className={styles.leftArea}>
          <span
            className={styles.cate}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {post.category}
          </span>
          <p className={styles.title}>{post.title}</p>
          <p className={styles.content}>{post.title}</p>
          <p className={styles.write}>
            <span className={styles.name}>{post.usernickname}</span>
            <span className={styles.time}>{post.cret_dt}</span>
          </p>
        </div>
        <div className={styles.rightArea}>
          <p>
            <span>코멘트</span> <span>{post.comment_cnt}</span>
          </p>
          <p>
            <span>라이크</span> <span>999</span>
          </p>
          <p>
            <span>뷰</span> <span>{post.view_count}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};
export default CommunityListItem;
