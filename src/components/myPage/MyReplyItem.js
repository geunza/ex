import React, { useState } from "react";
import styles from "scss/components/community/CommunityViewReplyItem.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const MyReplyItem = ({ item, getMyReply }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const nickname = userInfo.usernickname;
  const createTime = item.cret_dt;
  const desc = item.description;
  const [controlBoxOpen, setControlBoxOpen] = useState(false);
  const [currentReply, setCurrentReply] = useState(desc);
  const [reReply, setReReply] = useState([]);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [reReplyOpen, setReReplyOpen] = useState(false);
  const [reReplyTxt, setReReplyTxt] = useState("");
  const btnModify = () => {
    setModifyOpen((prev) => !prev);
  };
  const modifyReplySubmit = () => {
    if (currentReply.replaceAll(" ", "").replaceAll("\n", "") == "") {
      alert("내용을 입력해주세요."); // CHECK : 메시지 확인
      return false;
    }
    if (!window.confirm("댓글을 수정하시겠습니까?")) return false;
    axios({
      method: "POST",
      url: "/mobile/community/updateComment",
      data: {
        // id: cmtId, // CHECK!!
        description: currentReply,
      },
    }).then((res) => {
      setModifyOpen((prev) => !prev);
      controlEnd();
      alert("수정되었습니다.");
    });
  };
  const btnCmtLike = () => {
    axios({
      method: "POST",
      url: "/mobile/community/insertCommentLike",
      headers: {
        user_id: userInfo.id,
      },
      data: {
        // comment_id: cmtId // CHECK !!
      },
    })
      .then((res) => {
        controlEnd();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const btnDelete = (e) => {
    const {
      currentTarget: { value },
    } = e;

    if (!window.confirm("댓글을 삭제하시겠습니까?")) return false;
    axios({
      url: "/mobile/community/delComment",
      method: "POST",
      data: {
        id: parseInt(value),
      },
    }).then((res) => {
      controlEnd();
      alert("삭제되었습니다.");
    });
  };
  const controlEnd = () => {
    getMyReply();
  };
  return (
    <li className={`${styles.replyItem} ${styles.mainReply}`}>
      <div className={styles.writeInform}>
        <p className={styles.writer}>{nickname}</p>
        <span className={styles.createTime}>{createTime}</span>
      </div>
      {modifyOpen ? (
        <div className={styles.replyModify}>
          <textarea
            rows="6"
            value={currentReply}
            onChange={(e) => {
              setCurrentReply((prev) => e.target.value);
            }}
          ></textarea>
          <button type="button" onClick={modifyReplySubmit}>
            댓글수정
          </button>
        </div>
      ) : (
        <>
          <div className={styles.replyCont}>
            <div className={styles.leftArea}>{desc}</div>
            <div className={styles.rightArea}>
              <button className={styles.likeArea} onClick={btnCmtLike}>
                {/* CHECK : 좋아요 내역 확인하는 API 필요 */}
                <img
                  // style={{ display: item.thumb_up != true ? "none" : null }}
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_like_selected.png"
                  }
                  alt=""
                />
                <img
                  // style={{ display: item.thumb_up == true ? "none" : null }}
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_like.png"
                  }
                  alt=""
                />
                <span>{item.like_count}</span>
              </button>
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
                <ul className="controlBox">
                  <li>
                    <button type="button" name="modify" onClick={btnModify}>
                      수정
                    </button>
                  </li>
                  <li>
                    <button type="button" value={"cmtId"} onClick={btnDelete}>
                      삭제
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
export default MyReplyItem;
