import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "scss/components/community/CommunityViewReplyItem.module.scss";
import CommunityViewReReplyItem from "components/community/CommunityViewReReplyItem";
const CommunityViewReplyItem = ({ item, getReply }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const nickname = item.usernickname;
  const createTime = item.cret_dt.slice(0, -3);
  const desc = item.description;
  const cmtId = item.id;
  const writerId = item.user_id;
  const isWriter = writerId == userInfo.id;
  const isReply = item.comment_cnt;
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
      setReReply(res.data);
    });
  };

  const [controlBoxOpen, setControlBoxOpen] = useState(false);
  const [currentReply, setCurrentReply] = useState(desc);
  const [reReply, setReReply] = useState([]);
  const [modifyOpen, setModifyOpen] = useState(false);
  const controlBtnClick = (e) => {
    const {
      currentTarget: { name },
    } = e;
    if (name == "modify") {
      btnModify();
    } else if (name == "delete") {
      btnDelete();
    } else if (name == "report") {
      btnReport();
    } else if (name == "block") {
      btnBlock();
    }
  };
  const btnModify = () => {
    setModifyOpen((prev) => !prev);
  };
  const modifyReplySubmit = () => {
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
    });
  };
  const btnDelete = () => {
    axios({
      url: "/mobile/community/delComment",
      method: "POST",
      data: {
        id: cmtId,
      },
    }).then((res) => {
      controlEnd();
    });
  };
  // CHECK : 신고기능 API
  const btnReport = () => {};

  // CHECK : 차단기능 실행여부
  const btnBlock = () => {
    axios({
      method: "POST",
      url: "/mobile/community/insertBlock",
      headers: {
        user_id: userInfo.id,
        target_id: cmtId,
      },
    }).then((res) => {
      controlEnd();
    });
  };
  const controlEnd = () => {
    setControlBoxOpen(false);
    getReply();
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
          <>
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
          </>
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
                            onClick={controlBtnClick}
                          >
                            수정
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            name="delete"
                            onClick={controlBtnClick}
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
                            onClick={controlBtnClick}
                          >
                            신고
                          </button>
                        </li>
                        <li>
                          <button
                            type="button"
                            name="block"
                            onClick={controlBtnClick}
                          >
                            차단
                          </button>
                        </li>
                      </ul>
                    ))}
                </div>
              </div>
            </div>
            <button type="button" className={styles.btnReReply}>
              대댓글 달기
            </button>
          </>
        )}
      </li>
      <div className={styles.writeReReply} style={{ display: "none" }}>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      {reReply && (
        <ol className={styles.reReplyWrap}>
          {reReply.map((item, idx) => {
            return (
              <CommunityViewReReplyItem styles={styles} item={item} key={idx} />
            );
          })}
        </ol>
      )}
    </>
  );
};
export default CommunityViewReplyItem;
