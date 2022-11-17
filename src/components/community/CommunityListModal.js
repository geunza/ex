import React, { useState } from "react";
import styles from "scss/components/community/CommunityListModal.module.scss";
const CommunityListModal = ({ modalOn, modalOpener }) => {
  const [blockedUser, setBlockedUser] = useState([
    "더 하우스트",
    "jason",
    "더 하우스트",
    "jason",
    "더 하우스트",
    "jason",
  ]);
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
    setSelectedReport({ value: value });
  };
  const btnSubmit = (e) => {
    console.log("btnSubmit");
  };
  const btnReport = (e) => {
    console.log("btnReport");
  };
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
                  <p className={styles.subTit}>
                    <span>차단 회원을 해지할 수 있어요.</span>
                    <span>해지 시, 해당 회원의 게시물을 볼 수 있어요.</span>
                  </p>
                  <ul className={styles.blockedList}>
                    {blockedUser.map((v, i) => {
                      return (
                        <li className={styles.blockedUser} key={i}>
                          <p>{v}</p>
                          <button>
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
                    <button className={styles.removeAll} type="button">
                      전체삭제
                    </button>
                  </div>
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
                        <li>
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
                      <textArea
                        rows="4"
                        disabled={selectedReport.value != "기타이유"}
                        placeholder="기타 이유를 작성해주세요."
                      ></textArea>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div className={styles.modalSubmit}>
              {modalOn.type == "blockedUser" && (
                <button type="button" onClick={btnSubmit}>
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
export default CommunityListModal;
