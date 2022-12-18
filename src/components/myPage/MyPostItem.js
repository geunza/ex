import React from "react";
import styles from "scss/components/community/CommunityListItem.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const MyPostItem = ({
  post,
  setScrollStorage,
  controlBoxOpen,
  setControlBox,
  controlBox,
}) => {
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
          to={`/community/communityView/${"post.id"}`}
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
            <span className="time">{"post.cret_dt"}</span>
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
          {controlBoxOpen && (
            <ul className="controlBox">
              <li>
                <button
                  type="button"
                  name="modify"
                  value={"post.id"}
                  // onClick={btnPostClick}
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  type="button"
                  name="delete"
                  value={"post.id"}
                  // onClick={btnPostClick}
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
