import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "scss/pages/CommonView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd, setLoginCheck } from "redux/store";
import CommunityViewReplyItem from "components/community/CommunityViewReplyItem";
import CommunityModalReport from "components/community/CommunityModalReport";
import "@toast-ui/editor/dist/toastui-editor.css";
const CommunityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [post, setPost] = useState({});
  const [time, setTime] = useState("");
  const [cont, setCont] = useState("");
  const [reply, setReply] = useState([]);
  const [files, setFiles] = useState([]);
  const [cmtText, setCmtText] = useState("");
  const [controlBox, setControlBox] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  let loadSum = 0;
  const loadEnd = () => {
    loadSum++;
    if (loadSum >= 3) {
      dispatch(loadingEnd());
    }
  };
  const getContent = () => {
    axios({
      method: "GET",
      url: `/mobile/community/one?id=${id}`,
    }).then((res) => {
      const data = res.data;
      setPost(data);
      setCont(data.content);
      console.log(res.data);
      setTime(() => getTime(data.cret_dt));
      loadEnd();
    });
    const getTime = (timeStamp) => {
      const iso = new Date(timeStamp)
        .toISOString()
        .split("T")[0]
        .replaceAll("-", ".");
      const timeString = new Date(timeStamp)
        .toTimeString()
        .split(" ")[0]
        .slice(0, 5);
      return `${iso} ${timeString}`;
    };
  };
  const getReply = (userId) => {
    axios({
      url: "/mobile/community/comment",
      method: "POST",
      headers: { user_id: userInfo.id },
      data: {
        content_id: parseInt(id),
      },
    }).then((res) => {
      res.data.sort((a, b) => {
        const date1 = new Date(a.cret_dt);
        const date2 = new Date(b.cret_dt);
        return date1 - date2;
      });
      setReply(res.data);
      loadEnd();
    });
  };
  const getFiles = () => {
    axios({
      url: "/mobile/community/getFile",
      method: "POST",
      data: {
        content_id: parseInt(id),
      },
    })
      .then((res) => {
        setFiles(res.data);
        loadEnd();
      })
      .catch((err) => {
        console.log("filesError");
        loadEnd();
      });
  };
  const replySubmit = (e) => {
    if (cmtText.replaceAll(" ", "") == "") {
      alert("내용을 등록해주세요."); // CHECK : 메시지 확인
      return false;
    }
    if (!window.confirm("댓글을 등록하시겠습니까?")) {
      return false;
    }
    const contId = post.id;
    const desc = cmtText;
    const step = 1;
    axios({
      method: "POST",
      url: "/mobile/community/insertComment",
      headers: {
        user_id: userInfo.id,
      },
      data: {
        c_content_id: contId,
        description: cmtText,
        step: step,
      },
    }).then(() => {
      setCmtText("");
      getReply();
      alert("등록되었습니다.");
    });
  };
  const commentChange = (e) => {
    const {
      target: { value },
    } = e;
    setCmtText(value);
  };
  useEffect(() => {
    dispatch(loadingStart());
    getContent();
    getReply();
    getFiles();
  }, [userInfo]);
  useEffect(() => {
    // !isLoggedIn && navigate("/");
  }, []);
  useEffect(() => {
    setIsMine(post.user_id == userInfo.id);
  }, [userInfo, post]);
  const btnPostClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    switch (name) {
      case "modify":
        btnModify(e, value);
        break;
      case "report":
        btnReport(e);
        break;
      case "delete":
        btnDelete(value);
        break;
      case "block":
        btnBlock();
        break;
      default:
        console.log("ERR");
        break;
    }
  };
  // 게시글수정 버튼
  const btnModify = (e, value) => {
    navigate(`/community/CommunityModify/${value}`);
  };
  // 게시글삭제 버튼
  const btnDelete = (value) => {
    dispatch(loadingStart());
    const id = value.toString();
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id.toString() },
      url: "/mobile/community/delete",
      method: "POST",
    })
      .then((res) => {
        dispatch(loadingEnd());
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };
  // 신고 버튼
  const btnReport = (e) => {
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
      return false;
    }
    setModalOn((prev) => !prev);
  };
  // 차단 버튼
  const btnBlock = () => {
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
      return false;
    }

    if (!window.confirm(`${post.usernickname}님을 차단 하시겠습니까?`)) {
      return false;
    }
    let targetId;
    isNaN(Number(post.user_id))
      ? (targetId = post.user_id)
      : (targetId = parseInt(post.user_id));
    axios({
      method: "POST",
      url: "/mobile/community/insertBlock",
      headers: {
        user_id: parseInt(userInfo.id),
        target_id: targetId,
      },
    }).then((res) => {
      alert(`${post.usernickname}님을 차단했습니다.`);
    });
  };
  return (
    <>
      <div className={`${styles.CommunityView} ${styles.CommonView}`}>
        <div className={`inner ${styles.inner}`}>
          <div className={styles.btns}>
            <button onClick={() => navigate(-1)} className={styles.btnBack}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_back.png"
                }
                alt="전체 게시글"
              />
              <span>전체 게시글</span>
            </button>
          </div>
          <div className={styles.contWrap}>
            <div className={styles.contTop}>
              <div className={styles.writer}>
                <p className={styles.nickname}>{post.usernickname}</p>
                <p className={styles.time}>{time}</p>
              </div>
              <div className={styles.titleArea}>
                <h3 className={styles.title}>{post.title}</h3>
              </div>
            </div>
            <div className="toastui-editor-contents">
              <div
                className={styles.cont}
                dangerouslySetInnerHTML={{ __html: cont }}
              ></div>
            </div>
            <div className={styles.bottomBtns}>
              <button type="button" className={styles.btnLike}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_like.png"
                  }
                  alt="like icon"
                />
                <span>Like Count</span>
              </button>
              <div className="controlBoxWrap">
                <button
                  type="button"
                  className={styles.btnControl}
                  onClick={() => {
                    setControlBox((prev) => !prev);
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/ico/ico_more.png"
                    }
                    alt="게시글 관리"
                  />
                </button>
                {controlBox &&
                  (isMine ? (
                    <ul className="controlBox">
                      <li>
                        <button
                          type="button"
                          onClick={btnPostClick}
                          value={post.id}
                          name="modify"
                        >
                          수정
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={btnPostClick}
                          value={post.id}
                          name="delete"
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
                          onClick={btnPostClick}
                          value={true}
                          name="report"
                        >
                          신고
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={btnPostClick}
                          value={post.id}
                          name="block"
                        >
                          차단
                        </button>
                      </li>
                    </ul>
                  ))}
              </div>
            </div>
            {files.length > 0 && (
              <ul className={styles.fileArea}>
                {files.map((file, idx) => {
                  return (
                    <li key={idx}>
                      <a href={file.file_url} download>
                        {file.file_name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className={styles.commentArea}>
            {isLoggedIn ? (
              <div className={styles.writeArea}>
                <h4>댓글 작성</h4>
                <textarea
                  rows="6"
                  placeholder="욕설/비방 등 타인이 불쾌함을 느낄 수 있는 발언은 삼가해 주세요 :)"
                  value={cmtText}
                  onChange={commentChange}
                ></textarea>
                <div className={styles.btnArea}>
                  <button type="button" onClick={replySubmit}>
                    댓글 등록
                  </button>
                </div>
              </div>
            ) : (
              <p className={styles.needSignIn}>
                로그인이 필요합니다.
                {/* CHECK : 메시지 정리 */}
              </p>
            )}
            <ul className={styles.mainReplyWrap}>
              {reply.length > 0 &&
                reply.map((item) => {
                  return (
                    <CommunityViewReplyItem
                      item={item}
                      key={item.id}
                      getReply={getReply}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      {modalOn && <CommunityModalReport post={post} setModalOn={setModalOn} />}
    </>
  );
};
export default CommunityView;
