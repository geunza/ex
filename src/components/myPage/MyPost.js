import React, { useState, useEffect } from "react";
import CommunityListItem from "components/community/CommunityListItem";
import styles from "scss/pages/Community.module.scss";
import MyPostItem from "./MyPostItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Pagination from "components/Pagination";
import { useLocation } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const MyPost = ({ page, postLimit }) => {
  const searchParams = new URLSearchParams(window.location);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [modalOn, setModalOn] = useState({ current: false, type: "", id: "" });
  const [controlBox, setControlBox] = useState({ id: "" });
  const userInfo = useSelector((state) => state.userInfo);
  const setScrollStorage = (value) => {
    sessionStorage.setItem("cOffset", value);
  };
  const getMyPost = () => {
    // dispatch(loadingStart());
    axios({
      url: process.env.REACT_APP_API_RESOURCE + "/mobile/community/myContent",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      setPosts(res.data);
      // dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getMyPost();
  }, [userInfo]);
  return (
    <>
      <div className={styles.listCont}>
        {posts.length > 0 ? (
          <ul className="commonListItemWrap">
            {posts
              .slice((page - 1) * postLimit, page * postLimit)
              .map((post, i) => {
                let modalInform;
                modalOn.id == post.id
                  ? (modalInform = modalOn)
                  : (modalInform = {});
                let controlBoxOpen;
                controlBox.id == post.id
                  ? (controlBoxOpen = true)
                  : (controlBoxOpen = false);
                return (
                  <MyPostItem
                    key={i}
                    setScrollStorage={setScrollStorage}
                    post={post}
                    controlBox={controlBox}
                    setControlBox={setControlBox}
                    controlBoxOpen={controlBoxOpen}
                    getMyPost={getMyPost}
                  />
                );
              })}
          </ul>
        ) : (
          <div className="empty">
            <p className="empty_tit">커뮤니티 게시글이 없습니다.</p>
            <p className="empty_para">첫번째 게시글을 작성해보세요!</p>
          </div>
        )}
      </div>
      <Pagination
        total={posts.length}
        // total={5000}
        postLimit={postLimit}
        numLimit={5}
        page={parseInt(page)}
        searchParams={searchParams}
      />
    </>
  );
};
export default MyPost;
