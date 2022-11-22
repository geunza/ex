import axios from "axios";
import React from "react";
import styles from "scss/components/community/CommunityViewReplyItem.module.scss";
const CommunityViewReplyItem = ({ item }) => {
  console.log(item);
  const nickname = item.usernickname;
  const createTime = item.cret_dt.slice(0, -3);
  const desc = item.description;

  const getReReply = () => {};
  if (item.comment_cnt > 0) {
    getReReply();
  }
  return (
    <>
      <li className={styles.mainReply}>
        <div className={styles.writeInform}>
          <p className={styles.writer}>{nickname}</p>
          <span className={styles.createTime}>{createTime}</span>
        </div>
        <div className={styles.replyCont}>
          <div className={styles.leftArea}>{desc}</div>
          <div className={styles.rightArea}>
            좋아요{item.like_count}
            <button type="button" class="CommunityListItem_myPost__YcaWV">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_more.png"
                }
                alt="내 게시글 관리"
              />
            </button>
          </div>
        </div>
        <button type="button" className={styles.btnReReply}>
          대댓글 달기
        </button>
      </li>
    </>
  );
};
export default CommunityViewReplyItem;
