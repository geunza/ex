import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "scss/components/Modal.module.scss";
import { modalOverflow } from "redux/store";
const CommunityModalReport = ({
  setModalOn,
  item,
  category,
  setControlBox,
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [txtArea, setTxtArea] = useState("");
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
  const [selectedReport, setSelectedReport] = useState(reportList[0]);
  const writerId = item.user_id;
  const targetIdx = item.id;
  const btnReport = (e) => {
    if (!window.confirm("신고하시겠습니까?")) return false;
    let status = "검토중";
    let desc;
    if (selectedReport.value == "기타이유") {
      desc = `${selectedReport.value} : ${txtArea}`;
    } else {
      desc = selectedReport.value;
    }
    axios({
      url: "/mobile/community/insertReport",
      method: "POST",
      headers: { user_id: userInfo.id, target_user_id: writerId },
      data: {
        target_idx: targetIdx,
        category: category,
        description: desc,
        status: status,
      },
    }).then(() => {
      setModalOn(false);
      setControlBox({ id: "" });
      alert("신고 처리가 완료되었습니다.");
    });
  };
  const rdoChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedReport({ value: value });
  };

  useEffect(() => {
    dispatch(modalOverflow(true));
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  return (
    <>
      <div className={styles.modalWrap}>
        <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
          <div className={styles.communityModal}>
            <div className={styles.modalTop}>
              <div className={styles.tit}>
                <img
                  src={require("assets/img/global/ico/ico_report.png")}
                  alt="커뮤니티 글 / 댓글 신고"
                />
                <p>커뮤니티 글 / 댓글 신고</p>
              </div>
              <button
                type="button"
                value={false}
                className={styles.btn_close}
                onClick={() => {
                  setModalOn(false);
                }}
              >
                <img
                  src={require("assets/img/global/btn/btn_close_black.png")}
                  alt="닫기"
                />
              </button>
            </div>
            <div className={styles.modalCont}>
              <p className={styles.subTit}>
                <span>아래 신고 사유를 선택해 주세요.</span>
              </p>
              <ul className={styles.commonList}>
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
            </div>
            <div className={styles.modalSubmit}>
              <button type="button" onClick={btnReport}>
                신고하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityModalReport;
