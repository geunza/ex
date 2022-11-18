import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "scss/pages/CommunityView.module.scss";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "store";
const CommunityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [cont, setCont] = useState("");
  const [cmtText, setCmtText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingStart());
    axios(`https://exitobiz.co.kr/mobile/community/one?id=${id}`)
      .then((res) => {
        const data = res.data;
        setPost(data);
        setCont(data.content);
      })
      .then(() => {
        dispatch(loadingEnd());
      });
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
          <div>CommunityView {id}</div>
          <div className={styles.btns}>
            <button onClick={() => navigate(-1)}>&lt; 전체 게시글</button>
          </div>
          <div className={styles.contWrap}>
            <div className={styles.contTop}>
              <div className={styles.titleArea}>
                <h3 className={styles.title}>{post.title}</h3>
                <button>...</button>
              </div>
              <div className={styles.writer}>
                <span>{post.usernickname}</span>
                <span>{post.cret_dt}</span>
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
    </>
  );
};
export default CommunityView;
