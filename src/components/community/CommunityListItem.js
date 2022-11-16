import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
const CommunityListItem = ({ post }) => {
  const [controlBox, setControlBox] = useState(false);

  const modalOpener = (e) => {
    const {
      currentTarget: { name },
    } = e;
    if (name == "modify") {
      console.log("modify입니당");
    } else if (name == "delete") {
      console.log("delete입니당");
    } else if (name == "report") {
      console.log("report입니당");
    } else if (name == "block") {
      console.log("block입니당");
    }
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
                setControlBox((prev) => !prev);
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
            {controlBox &&
              (controlBox ? ( // userInform == createInform 으로 변경예정
                <ul className={styles.controlBox}>
                  <li>
                    <button type="button" name="modify" onClick={modalOpener}>
                      수정
                    </button>
                  </li>
                  <li>
                    <button type="button" name="delete" onClick={modalOpener}>
                      삭제
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className={styles.controlBox}>
                  <li>
                    <button type="button" name="report" onClick={modalOpener}>
                      신고
                    </button>
                  </li>
                  <li>
                    <button type="button" name="block" onClick={modalOpener}>
                      차단
                    </button>
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {/* <div className="modalWrap">
          <div className="modalInner">asdfasdf</div>
        </div> */}
      </li>
    </>
  );
};
export default CommunityListItem;
