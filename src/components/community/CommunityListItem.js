import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
import { useDispatch } from "react-redux";
import { modalOverflow } from "store";
import CommunityListModal from "components/community/CommunityListModal";
const CommunityListItem = ({
  post,
  modalOn,
  modalOpener,
  controlBox,
  setControlBox,
  controlBoxOpen,
}) => {
  const dispatch = useDispatch();
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
      console.log("btnDeleteClick", value);
    } else if (name == "block") {
      //차단버튼
      console.log("btnBlockClick", value);
    } else {
      //에러
      console.log("ELSE");
    }
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
  return (
    <>
      <li className={styles.CommunityListItem}>
        <div className={styles.cateArea}>
          <span
            className={styles.cate}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {post.category}
          </span>
        </div>
        <div className={styles.leftArea}>
          <Link to={`/community/communityView/${post.id}`}>
            <p className={styles.title}>{post.title}</p>
            <p className={styles.content}>{post.title}</p>
            <p className={styles.write}>
              <span className={styles.name}>{post.usernickname}</span>
              <span className={styles.time}>{post.cret_dt}</span>
            </p>
          </Link>
        </div>
        <div className={styles.rightArea}>
          <p className={styles.rightInform}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_comment.png"
              }
              alt="코멘트"
            />
            <span>{post.comment_cnt}</span>
          </p>
          <p className={styles.rightInform}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_like.png"
              }
              alt="좋아요"
            />
            <span>999</span>
          </p>
          <p className={styles.rightInform}>
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_view_gray.png"
              }
              alt="조회수"
            />
            <span>{post.view_count}</span>
          </p>
          <div className={styles.rightInform}>
            <button
              type="button"
              className={styles.myPost}
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
              (controlBoxOpen ? ( // userInform == createInform 으로 변경예정
                <ul className={styles.controlBox}>
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
                <ul className={styles.controlBox}>
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
