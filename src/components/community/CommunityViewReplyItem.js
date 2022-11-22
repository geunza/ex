import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "scss/components/community/CommunityViewReplyItem.module.scss";
import CommunityViewReReplyItem from "components/community/CommunityViewReReplyItem";
const CommunityViewReplyItem = ({ item }) => {
  // console.log(item);
  const userInfo = useSelector((state) => state.userInfo);
  const nickname = item.usernickname;
  const createTime = item.cret_dt.slice(0, -3);
  const desc = item.description;
  const cmtId = item.id;
  const isReply = item.comment_cnt;
  const [reReply, setReReply] = useState([]);
  const getReReply = () => {
    axios({
      url: "/mobile/community/recomment",
      method: "POST",
      headers: {
        user_id: userInfo.userCode,
      },
      data: {
        parent_comment_id: cmtId,
      },
    }).then((res) => {
      setReReply(res.data);
      console.log(res.data[0]);
    });
  };

  useEffect(() => {
    if (isReply) {
      getReReply();
    }
  }, []);
  return (
    <>
      <li className={`${styles.replyItem} ${styles.mainReply}`}>
        <div className={styles.writeInform}>
          <p className={styles.writer}>{nickname}</p>
          <span className={styles.createTime}>{createTime}</span>
        </div>
        <div className={styles.replyCont}>
          <div className={styles.leftArea}>{desc}</div>
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
        <button type="button" className={styles.btnReReply}>
          대댓글 달기
        </button>
        {reReply && (
          <ol className={styles.reReplyWrap}>
            {reReply.map((item, idx) => {
              return <CommunityViewReReplyItem styles={styles} item={item} />;
            })}
          </ol>
        )}
      </li>
    </>
  );
};
export default CommunityViewReplyItem;
