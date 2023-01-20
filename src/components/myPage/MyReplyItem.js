import React, { useState } from "react";
import styles from "scss/pages/Community.module.scss";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CommunityModalReport from "components/community/CommunityModalReport";
import axios from "axios";
const MyReplyItem = ({
  item,
  getMyReply,
  controlBox,
  setControlBox,
  controlBoxOpen,
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userInfo = useSelector((state) => state.userInfo);
  const nickname = userInfo.usernickname;
  const createTime = item.cret_dt;
  const desc = item.description;
  const [modalOn, setModalOn] = useState(false);
  const [currentReply, setCurrentReply] = useState(desc);
  const [reReply, setReReply] = useState([]);
  const [modifyOpen, setModifyOpen] = useState(false);
  const [reReplyOpen, setReReplyOpen] = useState(false);
  const [reReplyTxt, setReReplyTxt] = useState("");
  const btnModify = () => {
    setModifyOpen((prev) => !prev);
  };
  useEffect(() => {
    setCurrentReply(desc);
  }, [modifyOpen]);
  const modifyReplySubmit = () => {
    if (currentReply.replaceAll(" ", "").replaceAll("\n", "") == "") {
      alert("내용을 입력해주세요."); // CHECK : 메시지 확인
      return false;
    }
    if (!window.confirm("댓글을 수정하시겠습니까?")) return false;
    axios({
      method: "POST",
      url:
        process.env.REACT_APP_API_RESOURCE + "/mobile/community/updateComment",
      data: {
        id: item.id, // CHECK!!
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
      url:
        process.env.REACT_APP_API_RESOURCE +
        "/mobile/community/insertCommentLike",
      headers: {
        user_id: userInfo.id,
      },
      data: {
        comment_id: item.id, // CHECK !!
      },
    })
      .then((res) => {
        getMyReply();
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
      url: process.env.REACT_APP_API_RESOURCE + "/mobile/community/delComment",
      method: "POST",
      data: {
        id: parseInt(value),
      },
    }).then((res) => {
      controlEnd();
      alert("삭제되었습니다.");
    });
  };
  const controlBoxClick = (id) => {
    if (controlBox.id == id) {
      setControlBox({ id: "" });
    } else {
      setControlBox({ id: id });
    }
  };
  const controlEnd = () => {
    setControlBox({ id: "" });
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
            <div className={styles.leftArea}>
              <Link to={`/community/communityView/${item.c_content_id}`}>
                {desc}
              </Link>
            </div>
            <div className={styles.rightArea}>
              <button className={styles.likeArea} onClick={btnCmtLike}>
                {/* CHECK : 좋아요 내역 확인하는 API 필요 */}
                <img
                  style={{ display: item.thumb_up != true ? "none" : null }}
                  src={
                    item.thumb_up == true
                      ? require("assets/img/global/ico/ico_like_selected.png")
                      : require("assets/img/global/ico/ico_like.png")
                  }
                  alt={item.thumb_up == true ? "좋아요 ON" : "좋아요 OFF"}
                />
                <span>{item.like_count}</span>
              </button>
              <div className="controlBoxWrap">
                <button
                  type="button"
                  onClick={() => {
                    controlBoxClick(item.id);
                  }}
                >
                  <img
                    src={require("assets/img/global/ico/ico_more.png")}
                    alt="댓글 관리"
                  />
                </button>

                {controlBoxOpen && (
                  <ul className="controlBox">
                    <li>
                      <button type="button" name="modify" onClick={btnModify}>
                        수정
                      </button>
                    </li>
                    <li>
                      <button type="button" value={item.id} onClick={btnDelete}>
                        삭제
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};
export default MyReplyItem;
