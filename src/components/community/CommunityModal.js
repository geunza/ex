import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "scss/components/community/CommunityModal.module.scss";
import { modalOverflow } from "redux/store";
const CommunityModal = ({ modalOn, modalOpener, post }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const writerId = post.user_id;
  const [blockedUser, setBlockedUser] = useState([]);
  const [txtArea, setTxtArea] = useState("");
  // 차단유저 GET
  const getBlockedUser = () => {
    axios({
      url: "/mobile/community/blockAll",
      method: "POST",
      headers: {
        user_id: parseInt(userInfo.id),
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
  // 신고하기
  const btnReport = (e) => {
    let targetId;
    isNaN(Number(writerId))
      ? (targetId = writerId)
      : (targetId = parseInt(writerId));

    const targetIdx = post.id;
    const category = post.category;
    const status = "검토중";
    let desc;
    if (selectedReport.value == "기타이유") {
      desc = `${selectedReport.value} : ${txtArea}`;
    } else {
      desc = selectedReport.value;
    }
    axios({
      url: "/mobile/community/insertReport",
      method: "POST",
      headers: {
        user_id: userInfo.id,
        target_user_id: targetId,
      },
      data: {
        target_idx: targetIdx,
        category: category,
        description: desc,
        status: status,
      },
    }).then((res) => {
      console.log(res);
    });
  };
  const reportList = [
    { value: "욕설 및 비방" },
    { value: "도박/사행성" },
    { value: "성희롱/성적 이미지 또는 성적 행위 등" },
    { value: "사기/불법 정보" },
    { value: "허위사실 유포" },
    { value: "자살 또는 자해" },
    { value: "지적재산권 침해" },
    { value: "기타이유" },
  ];
  const [selectedReport, setSelectedReport] = useState({
    value: "욕설 및 비방",
  });
  const rdoChange = (e) => {
    const {
      target: { value },
    } = e;
    console.log(value);
    setSelectedReport({ value: value });
  };

  useEffect(() => {
    getBlockedUser();
    dispatch(modalOverflow(true));
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  return (
    <>
      <div className="modalWrap">
        <div className="modalInner" style={{ maxWidth: "500px" }}>
          <div className={styles.communityModal}>
            <div className={styles.modalTop}>
              <div className={styles.tit}>
                {modalOn.type == "blockedUser" && (
                  <>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_blocked.png"
                      }
                      alt="차단 회원 관리"
                    />
                    <p>차단 회원 관리</p>
                  </>
                )}
                {modalOn.type == "report" && (
                  <>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_report.png"
                      }
                      alt="커뮤니티 글 / 댓글 신고"
                    />
                    <p>커뮤니티 글 / 댓글 신고</p>
                  </>
                )}
              </div>
              <button
                type="button"
                value={false}
                onClick={modalOpener}
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
              {modalOn.type == "blockedUser" && (
                <>
                  {blockedUser.length > 0 ? (
                    <p className={styles.subTit}>
                      <span>차단 회원을 해지할 수 있어요.</span>
                      <span>해지 시, 해당 회원의 게시물을 볼 수 있어요.</span>
                    </p>
                  ) : (
                    <p className={styles.subTit} style={{ marginBottom: 0 }}>
                      <span>차단된 회원이 없습니다.</span>
                    </p>
                  )}
                  {blockedUser.length > 0 && (
                    <>
                      <ul className={styles.blockedList}>
                        {blockedUser.map((v, i) => {
                          return (
                            <li className={styles.blockedUser} key={i}>
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
                      <div className={styles.btns}>
                        <button
                          className={styles.removeAll}
                          type="button"
                          onClick={delAllBlockUser}
                        >
                          전체삭제
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
              {modalOn.type == "report" && (
                <>
                  <p className={styles.subTit}>
                    <span>아래 신고 사유를 선택해 주세요.</span>
                  </p>
                  <ul className={styles.reportList}>
                    {reportList.map((v, i) => {
                      const numb = ("00" + i).slice(-2);
                      return (
                        <li key={i}>
                          <label htmlFor={`report_${numb}`}>
                            <input
                              type="radio"
                              value={v.value}
                              name="report"
                              id={`report_${numb}`}
                              onChange={rdoChange}
                              checked={selectedReport.value == v.value}
                            />
                            <span className={styles.circle}></span>
                            <span>{v.value}</span>
                          </label>
                        </li>
                      );
                    })}
                    <li>
                      <textarea
                        rows="4"
                        disabled={selectedReport.value != "기타이유"}
                        placeholder="기타 이유를 작성해주세요."
                        onChange={(e) => {
                          const {
                            currentTarget: { value },
                          } = e;
                          setTxtArea(value);
                        }}
                        value={txtArea}
                      ></textarea>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className={styles.modalSubmit}>
              {modalOn.type == "blockedUser" && (
                <button type="button" onClick={modalOpener}>
                  완료
                </button>
              )}
              {modalOn.type == "report" && (
                <button type="button" onClick={btnReport}>
                  신고하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityModal;
