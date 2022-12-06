import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const CommunityViewReReplyItem = ({ styles, item, getReply, getReReply }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const writerId = item.user_id;
  const isWriter = userInfo.id == writerId;
  const cmtId = item.id;

  const [controlBoxOpen, setControlBoxOpen] = useState(false);
  const [modifyOpen, setModifyOpen] = useState(false);

  const [currentReply, setCurrentReply] = useState(item.description);

  // 대댓글 삭제기능 완료
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
  // 대댓글 수정기능 완료
  const btnModify = () => {
    setModifyOpen((prev) => !prev);
  };
  const modifyReplySubmit = () => {
    if (!window.confirm("댓글을 수정하시겠습니까?")) return false;
    axios({
      method: "POST",
      url: "/mobile/community/updateComment",
      data: {
        id: cmtId,
        description: currentReply,
      },
    }).then((res) => {
      setModifyOpen((prev) => !prev);
      controlEnd();
      alert("수정되었습니다.");
    });
  };

  const btnReport = () => {};

  // 대댓글 차단기능 완료
  const btnBlock = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
    if (!window.confirm(`${item.usernickname}님을 차단하시겠습니까?`))
      return false;
    let targetId;
    isNaN(Number(writerId))
      ? (targetId = writerId)
      : (targetId = parseInt(writerId));

    axios({
      method: "POST",
      url: "/mobile/community/insertBlock",
      headers: {
        user_id: parseInt(userInfo.id),
        target_id: targetId,
      },
    }).then((res) => {
      controlEnd();
      alert(`${item.usernickname}님을 차단했습니다.`);
    });
  };
  const controlEnd = () => {
    getReply();
    getReReply();
    setControlBoxOpen(false);
  };

  // 대댓글 좋아요기능
  const btnCmtLike = () => {
    axios({
      method: "POST",
      url: "/mobile/community/insertCommentLike",
      headers: {
        user_id: userInfo.id,
      },
      data: { comment_id: cmtId },
    })
      .then((res) => {
        getReReply();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
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
        {modifyOpen ? (
          <div className={styles.replyModify}>
            <textarea
              rows="5"
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
            <div className={styles.writeInform}>
              <p className={styles.writer}>{item.usernickname}</p>
              <span className={styles.createTime}>{item.cret_dt}</span>
            </div>
            <div className={`${styles.replyCont} ${styles.reReplyCont}`}>
              <div className={styles.leftArea}>{item.description}</div>
              <div className={styles.rightArea}>
                <div className={styles.likeArea}>
                  <button className={styles.likeArea} onClick={btnCmtLike}>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_like.png"
                      }
                      alt="like icon"
                    />
                    <span>{item.like_count}</span>
                  </button>
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
                          <button
                            type="button"
                            name="modify"
                            onClick={btnModify}
                          >
                            수정
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            name="delete"
                            value={cmtId}
                            onClick={btnDelete}
                          >
                            삭제
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <ul className="controlBox">
                        <li>
                          <button
                            type="button"
                            name="report"
                            onClick={btnReport}
                          >
                            신고
                          </button>
                        </li>
                        <li>
                          <button type="button" name="block" onClick={btnBlock}>
                            차단
                          </button>
                        </li>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};
export default CommunityViewReReplyItem;
