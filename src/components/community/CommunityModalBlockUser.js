import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "scss/components/Modal.module.scss";
import { modalOverflow } from "redux/store";
const CommunityModalBlockUser = ({ setModalOn, setBlockedModalOn }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const writerId = post.user_id;
  const [blockedUser, setBlockedUser] = useState([]);
  // 차단유저 GET
  const getBlockedUser = () => {
    axios({
      url: "/mobile/community/blockAll",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      setBlockedUser(res.data);
    });
  };
  // 차단 단일해제
  const delBlockUser = (idx) => {
    const nickname = blockedUser.find(
      (item) => item.blockidx == idx
    ).usernickname;
    if (!window.confirm(`${nickname}님을 차단 해제하시겠습니까?`)) {
      return false;
    }
    axios({
      url: "/mobile/community/delBlockUser",
      method: "POST",
      data: {
        blockidx: idx,
      },
    })
      .then(() => {
        getBlockedUser();
        alert("차단 해제되었습니다.");
      })
      .catch((err) => console.log("err", err));
  };
  // 차단 전체해제
  const delAllBlockUser = () => {
    if (!window.confirm(`차단한 유저를 전체 해제하시겠습니까?`)) {
      return false;
    }
    axios({
      url: "/mobile/community/delAllBlockUser",
      method: "POST",
      headers: { user_id: userInfo.id },
    }).then((res) => {
      getBlockedUser();
    });
  };
  const closeModal = () => {
    setBlockedModalOn(false);
  };
  useEffect(() => {
    getBlockedUser();
    dispatch(modalOverflow(true));
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
        <div className={styles.communityModal}>
          <div className={styles.modalTop}>
            <div className={styles.tit}>
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/ico/ico_blocked.png"
                }
                alt="차단 회원 관리"
              />
              <p>차단 회원 관리</p>
            </div>
            <button
              type="button"
              value={false}
              onClick={closeModal}
              className={styles.btn_close}
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/public_assets/img/global/btn/btn_close_black.png"
                }
                alt="닫기"
              />
            </button>
          </div>
          <div className={styles.modalCont}>
            {blockedUser.length > 0 ? (
              <>
                <p className={styles.subTit}>
                  <span>차단 회원을 해지할 수 있어요.</span>
                  <span>해지 시, 해당 회원의 게시물을 볼 수 있어요.</span>
                </p>
                <ul className={styles.commonList}>
                  {blockedUser.map((v, i) => {
                    return (
                      <li className={styles.listWithDelete} key={i}>
                        <p>{v.usernickname}</p>
                        <button
                          onClick={() => {
                            delBlockUser(v.blockidx);
                          }}
                        >
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/public_assets/img/global/btn/btn_close_white_small.png"
                            }
                            alt="닫기"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className={styles.deleteAll}>
                  <button
                    className={styles.removeAll}
                    type="button"
                    onClick={delAllBlockUser}
                  >
                    전체삭제
                  </button>
                </div>
              </>
            ) : (
              <p className={styles.subTit} style={{ marginBottom: 0 }}>
                <span>차단된 회원이 없습니다.</span>
              </p>
            )}
          </div>
          <div className={styles.modalSubmit}>
            <button type="button" onClick={closeModal}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityModalBlockUser;
