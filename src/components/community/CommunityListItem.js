import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "scss/pages/Community.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalOverflow } from "redux/store";
import { loadingStart, loadingEnd, setLoginCheck } from "redux/store";
import CommunityModalReport from "components/community/CommunityModalReport";
import axios from "axios";
const CommunityListItem = ({
  post,
  controlBox,
  setControlBox,
  controlBoxOpen,
  getParamPC,
  setScrollStorage,
  getParamMobile,
  isMobile,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const writerId = post.user_id;
  const isMine = userInfo.id == writerId;
  const [modalOn, setModalOn] = useState(false);
  const btnPostClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    switch (name) {
      case "modify":
        btnModify(e, value);
        break;
      case "report":
        btnReport(e);
        break;
      case "delete":
        btnDelete(value);
        break;
      case "block":
        btnBlock();
        break;
      default:
        console.log("ERR");
        break;
    }
  };
  // 게시글수정 버튼
  const btnModify = (e, value) => {
    navigate(`/community/CommunityModify/${value}`);
  };
  // 게시글삭제 버튼
  const btnDelete = (value) => {
    // dispatch(loadingStart());
    const id = value.toString();
    if (!window.confirm("게시글을 삭제하시겠습니까?")) {
      return false;
    }
    axios({
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: id.toString() },
      url: process.env.REACT_APP_API_RESOURCE + "/mobile/community/delete",
      method: "POST",
    })
      .then((res) => {
        if (isMobile) {
          getParamMobile();
        } else {
          getParamPC();
        }
        // dispatch(loadingEnd());
      })
      .catch((err) => console.log(err));
  };
  // 신고 버튼
  const btnReport = (e) => {
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
      return false;
    }
    setModalOn((prev) => !prev);
  };
  // 차단 버튼
  const btnBlock = () => {
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
      return false;
    }

    if (!window.confirm(`${post.usernickname}님을 차단 하시겠습니까?`)) {
      return false;
    }
    let targetId;
    isNaN(Number(writerId))
      ? (targetId = writerId)
      : (targetId = parseInt(writerId));
    axios({
      method: "POST",
      url: process.env.REACT_APP_API_RESOURCE + "/mobile/community/insertBlock",
      headers: {
        user_id: userInfo.id,
        target_id: targetId,
      },
    }).then((res) => {
      if (isMobile) {
        getParamMobile();
      } else {
        getParamPC();
      }
      setControlBox({ id: "" });
      alert(`${post.usernickname}님을 차단했습니다.`);
    });
  };
  // 컨트롤박스 버튼
  const controlBoxClick = (id) => {
    if (controlBox.id == id) {
      setControlBox({ id: "" });
    } else {
      setControlBox({ id: id });
    }
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
            sessionStorage.setItem("cMover", "true");
          }}
        >
          <p className="title">{post.title}</p>

          <p
            className={`content ${styles.content}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></p>
          <p className="write">
            <span className="name">{post.usernickname}</span>
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
                    onClick={btnReport}
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
      {modalOn && (
        <CommunityModalReport
          item={post}
          setModalOn={setModalOn}
          category={"커뮤니티-게시글"}
          setControlBox={setControlBox}
        />
      )}
    </li>
  );
};
export default CommunityListItem;
