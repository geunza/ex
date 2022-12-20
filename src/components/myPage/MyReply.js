import React, { useState, useEffect } from "react";

import styles from "scss/pages/CommonView.module.scss";
import MyReplyItem from "./MyReplyItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Pagination from "components/Pagination";
import { useLocation } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const MyReply = ({ page, postLimit }) => {
  const searchParams = new URLSearchParams(window.location);
  const dispatch = useDispatch();
  const [replys, setReplys] = useState([]);
  const [controlBox, setControlBox] = useState({ id: "" });
  const userInfo = useSelector((state) => state.userInfo);
  const setScrollStorage = (value) => {
    sessionStorage.setItem("cOffset", value);
  };
  const getMyReply = () => {
    dispatch(loadingStart());
    axios({
      url: "/mobile/community/myComment",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      setReplys(res.data);
      dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getMyReply();
  }, [userInfo]);
  return (
    <>
      <div className={styles.CommonView}>
        {replys.length > 0 ? (
          <ul className={styles.commentArea}>
            {replys
              .slice((page - 1) * postLimit, page * postLimit)
              .map((reply, idx) => {
                let controlBoxOpen;
                controlBox.id == reply.id
                  ? (controlBoxOpen = true)
                  : (controlBoxOpen = false);
                return (
                  <MyReplyItem
                    item={reply}
                    getMyReply={getMyReply}
                    controlBox={controlBox}
                    setControlBox={setControlBox}
                    controlBoxOpen={controlBoxOpen}
                  />
                );
              })}
          </ul>
        ) : (
          <div className="empty">
            <p className="empty_tit">작성한 댓글이 없습니다.</p>
            <p className="empty_para">첫번째 댓글을 작성해보세요!</p>
          </div>
        )}
      </div>
      <Pagination
        total={replys.length}
        // total={5000}
        postLimit={postLimit}
        numLimit={5}
        page={parseInt(page)}
        searchParams={searchParams}
      />
    </>
  );
};
export default MyReply;
