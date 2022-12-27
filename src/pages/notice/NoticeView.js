import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "scss/pages/CommonView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
import CommunityViewReplyItem from "components/community/CommunityViewReplyItem";
import "@toast-ui/editor/dist/toastui-editor.css";
const NoticeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [post, setPost] = useState({});
  const [time, setTime] = useState("");
  const [cont, setCont] = useState("");

  const getContent = () => {
    // dispatch(loadingStart());
    axios({
      method: "GET",
      url: "/cms/notice/api",
    }).then((res) => {
      const data = res.data;
      const target = data.find((item) => item.id == id);
      setPost(target);
      setTime(getTime(target.createAt));
      setCont(target.contents);
      // dispatch(loadingEnd());
    });
    const getTime = (timeStamp) => {
      return timeStamp;
      // const iso = new Date(timeStamp)
      //   .toISOString()
      //   .split("T")[0]
      //   .replaceAll("-", ".");
      // const timeString = new Date(timeStamp)
      //   .toTimeString()
      //   .split(" ")[0]
      //   .slice(0, 5);
      // return `${iso} ${timeString}`;
    };
  };
  useEffect(() => {
    getContent();
  }, []);
  useEffect(() => {
    // !isLoggedIn && navigate("/");
  }, []);
  return (
    <>
      <div className={`${styles.NoticeView} ${styles.CommonView}`}>
        <div className={`inner ${styles.inner}`}>
          <div className={styles.btns}>
            <button
              onClick={() => navigate("/notice/noticeList")}
              className={styles.btnBack}
            >
              <img
                src={require("assets/img/global/btn/btn_back.png")}
                alt="전체 공지"
              />
              <span>전체 공지</span>
            </button>
          </div>
          <div className={styles.contWrap}>
            <div className={styles.contTop}>
              <div className={styles.titleArea}>
                <h3 className={styles.title}>{post.title}</h3>
              </div>
              <div className={styles.writer}>
                <p className={styles.time}>{time}</p>
              </div>
            </div>
            <div className="toastui-editor-contents">
              <div
                className={styles.cont}
                dangerouslySetInnerHTML={{ __html: cont }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NoticeView;
