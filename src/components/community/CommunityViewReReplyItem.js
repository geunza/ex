import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const CommunityViewReReplyItem = ({ styles, item }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [controlBoxOpen, setControlBoxOpen] = useState(false);
  const isWriter = userInfo.id == item.user_id;
  return (
    <li
      className={
        `${styles.replyItem} ${styles.reReply} ` +
        (isWriter ? styles.isWriter : "")
      }
    >
      <div className={styles.reReplyIco}>
        <img
          src={
            process.env.PUBLIC_URL +
            "/public_assets/img/global/ico/ico_reReply.png"
          }
          alt="rereply icon"
        />
      </div>
      <div className={styles.reReplyContWrap}>
        <div className={styles.writeInform}>
          <p className={styles.writer}>{item.usernickname}</p>
          <span className={styles.createTime}>{item.cret_dt}</span>
        </div>
        <div className={`${styles.replyCont} ${styles.reReplyCont}`}>
          <div className={styles.leftArea}>{item.description}</div>
          <div className={styles.rightArea}>
            <div className={styles.likeArea}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_like.png"
                }
                alt="like icon"
              />
              <span>{item.like_count}</span>
            </div>
            <div className="controlBoxWrap">
              <button
                type="button"
                onClick={() => {
                  setControlBoxOpen((prev) => !prev);
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_more.png"
                  }
                  alt="댓글 관리"
                />
              </button>
              {controlBoxOpen &&
                (isWriter ? (
                  <ul className="controlBox">
                    <li>
                      <button type="button" name="modify">
                        수정
                      </button>
                    </li>
                    <li>
                      <button type="button" name="delete">
                        삭제
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="controlBox">
                    <li>
                      <button type="button" name="report">
                        신고
                      </button>
                    </li>
                    <li>
                      <button type="button" name="block">
                        차단
                      </button>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CommunityViewReReplyItem;
