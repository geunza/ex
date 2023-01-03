import React from "react";
import styles from "scss/pages/Community.module.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
import axios from "axios";
const MyPostItem = ({
  post,
  setScrollStorage,
  controlBoxOpen,
  setControlBox,
  controlBox,
  getMyPost,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const controlBoxClick = (id) => {
    if (controlBox.id == id) {
      setControlBox({ id: "" });
    } else {
      setControlBox({ id: id });
    }
  };
  // 게시글수정 버튼
  const btnModify = (e) => {
    const {
      currentTarget: { value },
    } = e;
    console.log(value);
    navigate(`/community/CommunityModify/${value}`);
  };
  // 게시글삭제 버튼
  const btnDelete = (e) => {
    const {
      currentTarget: { value },
    } = e;
    // dispatch(loadingStart());
    const id = value.toString();
    console.log(id);
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      return false;
    }
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id },
      url: "/mobile/community/delete",
      method: "POST",
    })
      .then((res) => {
        console.log(res.data);
        getMyPost();
        // dispatch(loadingEnd());
      })
      .catch((err) => console.log(err));
  };
  return (
    <li className={`commonListItem ${styles.CommunityListItem}`}>
      <div className="cateArea">
        <span
          className={styles.cate}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {post.category}
        </span>
      </div>
      <div className={`leftArea ${styles.leftArea}`}>
        <Link
          to={`/community/communityView/${post.id}`}
          onClick={() => {
            setScrollStorage(window.scrollY);
          }}
        >
          <p className="title">{post.title}</p>
          <div
            className={`content ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <p className="write">
            <span className="time">{post.cret_dt}</span>
          </p>
        </Link>
      </div>
      <div className={`rightArea ${styles.rightArea}`}>
        <p className="rightInform">
          <img
            src={require("assets/img/global/ico/ico_comment.png")}
            alt="코멘트"
          />
          <span>{post.comment_cnt}</span>
        </p>
        <p className="rightInform">
          <img
            src={require("assets/img/global/ico/ico_like.png")}
            alt="좋아요"
          />
          <span>{post.like_cnt}</span>
        </p>
        <p className="rightInform">
          <img
            src={require("assets/img/global/ico/ico_view_gray.png")}
            alt="조회수"
          />
          <span>{post.view_count}</span>
        </p>
        <div className={`controlBoxWrap ${styles.rightInform}`}>
          <button
            type="button"
            className="myPost"
            onClick={() => {
              controlBoxClick(post.id);
            }}
          >
            <img
              src={require("assets/img/global/ico/ico_more.png")}
              alt="내 게시글 관리"
            />
          </button>
          {controlBoxOpen && (
            <ul className="controlBox">
              <li>
                <button
                  type="button"
                  name="modify"
                  value={post.id}
                  onClick={btnModify}
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  name="delete"
                  value={post.id}
                  onClick={btnDelete}
                >
                  삭제
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </li>
  );
};
export default MyPostItem;
