import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalOverflow } from "store";
import { loadingStart, loadingEnd } from "store";
import CommunityListModal from "components/community/CommunityListModal";
import axios from "axios";
const CommunityListItem = ({
  post,
  modalOn,
  modalOpener,
  controlBox,
  setControlBox,
  controlBoxOpen,
  getCommunityList,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);

  const btnPostClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    console.log(value);
    if (name == "modify") {
      //수정버튼
      console.log("btnModifyClick", value);
    } else if (name == "delete") {
      //삭제버튼
      clickDelete(value);
    } else if (name == "block") {
      //차단버튼
      console.log("btnBlockClick", value);
    } else {
      //에러
      console.log("ELSE");
    }
  };
  const clickDelete = (value) => {
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
        getCommunityList();
        dispatch(loadingEnd());
      })
      .catch((err) => console.log(err));
  };
  const controlBoxClick = (id) => {
    if (controlBox.id == id) {
      setControlBox({ id: "" });
      // console.log("있당");
    } else {
      setControlBox({ id: id });
      // console.log("없당");
    }
    //console.log("id =>", id);
    //console.log("controlBox =>", controlBox);
    //console.log("controlBoxOpen =>", controlBoxOpen);
  };
  const isMine = userInfo.id == post.user_id;
  return (
    <>
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
            onClick={(e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                alert("로그인이 필요합니다.");
              }
            }}
          >
            <p className="title">{post.title}</p>
            <p className={`content ${styles.content}`}>{post.title}</p>
            <p className="write">
              <span className="name">{post.usernickname}</span>
              <span className="time">{post.cret_dt}</span>
            </p>
          </Link>
        </div>
        <div className={`rightArea ${styles.rightArea}`}>
          <p className="rightInform">
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_comment.png"
              }
              alt="코멘트"
            />
            <span>{post.comment_cnt}</span>
          </p>
          <p className="rightInform">
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_like.png"
              }
              alt="좋아요"
            />
            <span>999</span>
          </p>
          <p className="rightInform">
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_view_gray.png"
              }
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
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_more.png"
                }
                alt="내 게시글 관리"
              />
            </button>
            {controlBoxOpen &&
              (isMine ? (
                <ul className="controlBox">
                  <li>
                    <button
                      type="button"
                      name="modify"
                      value={post.id}
                      onClick={btnPostClick}
                    >
                      수정
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      name="delete"
                      value={post.id}
                      onClick={btnPostClick}
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
                      value={true}
                      data-id={post.id}
                      onClick={modalOpener}
                    >
                      신고
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      name="block"
                      value={post.id}
                      onClick={btnPostClick}
                    >
                      차단
                    </button>
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {modalOn.current &&
        modalOn.type == "report" &&
        modalOn.id == post.id ? (
          <CommunityListModal modalOn={modalOn} modalOpener={modalOpener} />
        ) : null}
      </li>
    </>
  );
};
export default CommunityListItem;
