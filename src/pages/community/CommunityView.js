import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "scss/pages/CommunityView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "store";
import CommunityViewReplyItem from "components/community/CommunityViewReplyItem";
const CommunityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [post, setPost] = useState({});
  const [time, setTime] = useState("");
  const [cont, setCont] = useState("");
  const [reply, setReply] = useState([]);

  const [cmtText, setCmtText] = useState("");
  const dispatch = useDispatch();
  let loadSum = 0;
  const loadEnd = () => {
    loadSum++;
    if (loadSum == 3) {
      dispatch(loadingEnd());
    }
  };
  const getContent = () => {
    axios({
      headers: {
        "Access-Control-Allow-Origin": "strict-origin-when-cross-origin",
      },
      method: "GET",
      url: `/mobile/community/one?id=${id}`,
    }).then((res) => {
      const data = res.data;
      setPost(data);
      setCont(data.content);
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
  const getReply = () => {
    axios({
      url: "/mobile/community/comment",
      method: "POST",
      headers: { user_id: userInfo.userCode },
      data: {
        content_id: parseInt(id),
      },
    }).then((res) => {
      setReply(res.data);
      loadEnd();
    });
  };
  const getFile = () => {};
  useEffect(() => {
    dispatch(loadingStart());
    getContent();
    getReply();
  }, []);
  const submitTest = (a) => {
    console.log(a);
  };
  const commentChange = (e) => {
    const {
      target: { value },
    } = e;
    setCmtText(value);
  };
  return (
    <>
      <div className={styles.CommunityView}>
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
            <div
              className={styles.cont}
              dangerouslySetInnerHTML={{ __html: cont }}
            ></div>
            <div className={styles.btnLike}>
              <button>공감</button>
            </div>
          </div>
          <div className={styles.fileArea}>
            <span>첨부파일</span>
            <ul>
              <li>엑시토 사업계획서.pdf</li>
              <li>엑시토 사업계획서.pdf</li>
              <li>엑시토 사업계획서.pdf</li>
            </ul>
          </div>
          <div className={styles.commentArea}>
            <ul className={styles.mainReplyWrap}>
              {reply.length > 0 &&
                reply.map((item) => {
                  return <CommunityViewReplyItem item={item} key={item.id} />;
                })}
            </ul>
            <div className="writeArea">
              <h4>댓글 작성</h4>
              <form
                className={styles.iptArea}
                onSubmit={(e) => {
                  e.preventDefault();
                  submitTest();
                }}
              >
                <textarea
                  rows="4"
                  placeholder="욕설/비방 등 타인이 불쾌함을 느낄 수 있는 발언은 삼가해 주세요 :)"
                  value={cmtText}
                  onChange={commentChange}
                ></textarea>
                <button type="submit">댓글 등록</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityView;
