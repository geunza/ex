import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "scss/components/community/CommunityViewReplyItem.module.scss";
import CommunityViewReReplyItem from "components/community/CommunityViewReReplyItem";
const CommunityViewReplyItem = ({ item, getReply }) => {
  // console.log(item);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const nickname = item.usernickname;
  const createTime = item.cret_dt.slice(0, -3);
  const desc = item.description;
  const cmtId = item.id;
  const writerId = item.user_id;
  const isWriter = writerId == userInfo.id;
  const isReply = item.comment_cnt;
  const contId = item.c_content_id;
  const getReReply = () => {
    axios({
      url: "/mobile/community/recomment",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
      data: {
        parent_comment_id: cmtId,
      },
    }).then((res) => {
      res.data.sort((a, b) => {
        const date1 = new Date(a.cret_dt);
        const date2 = new Date(b.cret_dt);
        return date1 - date2;
      });
      setReReply(res.data);
    });
  };

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
  // CHECK : 신고기능 API
  const btnReport = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
  };

  const btnBlock = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
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
      console.log(res.data);
      controlEnd();
    });
  };
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
        console.log("res", res);
        getReply();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // 대댓글 Submit
  const submitReReply = () => {
    if (reReplyTxt.replaceAll(" ", "") == "") {
      alert("내용을 등록해주세요."); // CHECK : 메시지 확인
      return false;
    }
    if (!window.confirm("댓글을 등록하시겠습니까?")) return false;
    axios({
      method: "POST",
      url: "/mobile/community/insertComment",
      data: {
        c_content_id: contId,
        description: reReplyTxt,
        step: 2,
        parent_comment_id: cmtId,
      },
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      controlEnd();
      setReReplyOpen(false);
      setReReplyTxt("");
      alert("등록되었습니다.");
    });
  };
  const controlEnd = () => {
    getReply();
    getReReply();
    setControlBoxOpen(false);
  };
  useEffect(() => {
    if (isReply) {
      getReReply();
    }
  }, []);
  return (
    <>
      <li
        className={
          `${styles.replyItem} ${styles.mainReply} ` +
          (isWriter ? styles.isWriter : "")
        }
      >
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
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/ico/ico_like.png"
                    }
                    alt="like icon"
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
            <button
              type="button"
              className={styles.btnReReply}
              onClick={() => {
                setReReplyOpen((prev) => !prev);
              }}
            >
              대댓글 달기
            </button>
          </>
        )}
      </li>
      {reReplyOpen ? (
        <div className={styles.writeReReply}>
          <div>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_reReply.png"
              }
              alt="rereply icon"
            />
            <textarea
              rows="4"
              className={styles.reReplyTxt}
              placeholder="대댓글을 입력해 보세요."
              value={reReplyTxt}
              onChange={(e) => {
                const {
                  currentTarget: { value },
                } = e;
                setReReplyTxt(value);
              }}
            ></textarea>
          </div>
          <button onClick={submitReReply}>댓글 등록</button>
        </div>
      ) : null}

      {reReply && (
        <ol className={styles.reReplyWrap}>
          {reReply.map((item, idx) => {
            return (
              <CommunityViewReReplyItem
                styles={styles}
                item={item}
                key={idx}
                getReply={getReply}
                getReReply={getReReply}
              />
            );
          })}
        </ol>
      )}
    </>
  );
};
export default CommunityViewReplyItem;
