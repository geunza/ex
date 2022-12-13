import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "scss/components/community/CommunityListItem.module.scss";
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
  getCommunityList,
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
      url: "/mobile/community/insertBlock",
      headers: {
        user_id: parseInt(userInfo.id),
        target_id: targetId,
      },
    }).then((res) => {
      alert(`${post.usernickname}님을 차단했습니다.`);
    });
  };
  // 컨트롤박스 버튼
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
        <Link to={`/community/communityView/${post.id}`}>
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
      {modalOn && <CommunityModalReport post={post} setModalOn={setModalOn} />}
    </li>
  );
};
export default CommunityListItem;
