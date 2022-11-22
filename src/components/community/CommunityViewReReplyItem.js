import React from "react";

const CommunityViewReReplyItem = ({ styles, item }) => {
  return (
    <li className={`${styles.replyItem} ${styles.reReply}`}>
      <div className={styles.writeInform}>
        <p className={styles.writer}>{item.usernickname}</p>
        <span className={styles.createTime}>{item.cret_dt}</span>
      </div>
      <div className={styles.replyCont}>
        <div className={styles.leftArea}>{item.description}</div>
        <div className={styles.rightArea}>
          좋아요{item.like_count}
          <button type="button" className="">
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
    </li>
  );
};
export default CommunityViewReReplyItem;
