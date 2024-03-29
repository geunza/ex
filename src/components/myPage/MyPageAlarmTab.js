import React from "react";
import { useEffect, useState } from "react";
import { loadingStart, loadingEnd } from "redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const MyPageAlarmTab = ({ setAlaramOpen, styles }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [allChecked, setAllChecked] = useState(false);
  const [alarmAgree, setAlarmAgree] = useState(false);
  const [alarmObj, setAlarmObj] = useState({
    spReceivePush: false, // 지원사업 안내 알림
    spKeywordPush: false, // 지원사업 키워드 알림
    spBookmarkPush: false, // 찜한 지원사업 마감임박 알림
    spRecommentPush: false, // 지원사업대댓글알림
    spCommentlikePush: false, // 지원사업댓글좋아요알림
    spContentCommentPush: false, // 커뮤니티 컨텐츠 댓글 알림
    spCommunityCommentlikePush: false, // 커뮤니티 댓글 좋아요 알림
    spCommunityRecommentPush: false, // 커뮤니티 대댓글 알림
  });
  const agreeChange = (e) => {
    const {
      target: { checked },
    } = e;
    if (checked) {
      setAlarmAgree(true);
      const YY = new Date().getFullYear();
      const MM = new Date().getMonth() + 1;
      const DD = new Date().getDate();
      alert(
        `마케팅 수신 동의 완료\n- 전송자 : 엑시토\n- 수신동의 일시 : ${YY}년 ${MM}월 ${DD}일\n- 처리내용 : 수신동의 완료\n\n 마이페이지 - Push 알림설정에서 설정을 변경할 수 있습니다.\n`
      );
    } else {
      if (
        window.confirm(
          "잠시만요!\n\n마케팅 수신 동의 해제 시,\n사업계획서 교육 모집, 창업자 네트워킹, 시제품/인건비/입주공간 등의 정보를 받아 볼 수 없습니다\n\n해제하시겠습니까?"
        )
      ) {
        setAlarmAgree(false);
      }
    }
  };
  const chkChange = (e) => {
    const {
      target: { id, checked },
    } = e;
    let copy = { ...alarmObj };
    copy[id] = checked;
    setAlarmObj(copy);
  };
  const checkAllChange = (e) => {
    const {
      target: { checked },
    } = e;
    let copy = { ...alarmObj };
    if (checked) {
      for (let key in copy) {
        copy[key] = true;
      }
      setAlarmObj(copy);
    } else {
      for (let key in copy) {
        copy[key] = false;
      }
      setAlarmObj(copy);
    }
  };
  function boolToYN(bool) {
    if (bool) {
      return "Y";
    } else {
      return "N";
    }
  }
  function YNToBool(YN) {
    if (YN == "Y") {
      return true;
    } else {
      return false;
    }
  }
  const submitAlarm = () => {
    axios({
      url: process.env.REACT_APP_API_RESOURCE + "/user/updatePushSetting",
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
      data: {
        spReceivePush: boolToYN(alarmObj.spReceivePush),
        spKeywordPush: boolToYN(alarmObj.spKeywordPush),
        spBookmarkPush: boolToYN(alarmObj.spBookmarkPush),
        spRecommentPush: boolToYN(alarmObj.spRecommentPush),
        spCommentlikePush: boolToYN(alarmObj.spCommentlikePush),
        spContentCommentPush: boolToYN(alarmObj.spContentCommentPush),
        spCommunityCommentlikePush: boolToYN(
          alarmObj.spCommunityCommentlikePush
        ),
        spCommunityRecommentPush: boolToYN(alarmObj.spCommunityRecommentPush),
        marketingPush: boolToYN(alarmAgree),
      },
    }).then((res) => {
      // CHECK : response는 success지만 결과값 null 오는 상태, 확인 필요
      alert("설정 완료되었습니다.");
    });
  };
  const getAlarmData = () => {
    axios({
      url: process.env.REACT_APP_API_RESOURCE + "/user/getPushSetting",
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    })
      .then((res) => {
        const resObj = res.data;
        let currentObj = { ...alarmObj };
        currentObj.spReceivePush = YNToBool(resObj.sp_receive_push);
        currentObj.spKeywordPush = YNToBool(resObj.sp_keyword_push);
        currentObj.spBookmarkPush = YNToBool(resObj.sp_bookmark_push);
        currentObj.spRecommentPush = YNToBool(resObj.sp_recomment_push);
        currentObj.spCommentlikePush = YNToBool(resObj.sp_commentlike_push);
        currentObj.spContentCommentPush = YNToBool(
          resObj.sp_content_comment_push
        );
        currentObj.spCommunityCommentlikePush = YNToBool(
          resObj.sp_community_commentlike_push
        );
        currentObj.spCommunityRecommentPush = YNToBool(
          resObj.sp_community_recomment_push
        );
        setAlarmObj(currentObj);
        setAlarmAgree(YNToBool(resObj.marketing_push));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAlarmData();
  }, []);
  useEffect(() => {
    setAllChecked(!Object.values(alarmObj).some((item) => item == false));
  }, [alarmObj]);
  return (
    <div className={styles.MyPageAlarmTab}>
      <div className={styles.modalCont}>
        <p className={styles.notice}>
          마케팅 정보 수신동의 및 Push알림을 설정할 수 있어요.
          <br />
          웹에서 변경한 Push설정을 앱에 동일하게 적용됩니다.
        </p>
        <ul className={styles.commonList}>
          <li className={`${styles.alarmItem} ${styles.agree}`}>
            <p>
              마케팅 정보 수신 동의
              <button
                className={styles.policy}
                onClick={() => {
                  alert("CHECK : 준비중입니다.");
                }}
              >
                약관보기
              </button>
            </p>
            <input
              type="checkbox"
              id="alarmAgree"
              checked={alarmAgree}
              onChange={agreeChange}
            />
            <label htmlFor="alarmAgree">CHECK</label>
          </li>
          <li className={`${styles.alarmItem} ${styles.point}`}>
            <p>전체</p>
            <input
              type="checkbox"
              id="checkAll"
              onChange={checkAllChange}
              checked={allChecked}
            />
            <label htmlFor="checkAll">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>지원사업 안내 알림</p>
            <input
              type="checkbox"
              id="spReceivePush"
              checked={alarmObj.spReceivePush}
              onChange={chkChange}
            />
            <label htmlFor="spReceivePush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>지원사업 키워드 알림</p>
            <input
              type="checkbox"
              id="spKeywordPush"
              checked={alarmObj.spKeywordPush}
              onChange={chkChange}
            />
            <label htmlFor="spKeywordPush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>지원사업 대댓글 알림</p>
            <input
              type="checkbox"
              id="spBookmarkPush"
              checked={alarmObj.spBookmarkPush}
              onChange={chkChange}
            />
            <label htmlFor="spBookmarkPush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>지원사업 댓글 좋아요 알림</p>
            <input
              type="checkbox"
              id="spRecommentPush"
              checked={alarmObj.spRecommentPush}
              onChange={chkChange}
            />
            <label htmlFor="spRecommentPush">CHECK</label>
          </li>
          <li className={`${styles.alarmItem} ${styles.point}`}>
            <p>찜한 지원사업 마감임박 알림</p>
            <input
              type="checkbox"
              id="spCommentlikePush"
              checked={alarmObj.spCommentlikePush}
              onChange={chkChange}
            />
            <label htmlFor="spCommentlikePush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>커뮤니티 컨텐츠 댓글 알림</p>
            <input
              type="checkbox"
              id="spContentCommentPush"
              checked={alarmObj.spContentCommentPush}
              onChange={chkChange}
            />
            <label htmlFor="spContentCommentPush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>커뮤니티 댓글 좋아요 알림</p>
            <input
              type="checkbox"
              id="spCommunityCommentlikePush"
              checked={alarmObj.spCommunityCommentlikePush}
              onChange={chkChange}
            />
            <label htmlFor="spCommunityCommentlikePush">CHECK</label>
          </li>
          <li className={styles.alarmItem}>
            <p>커뮤니티 대댓글 알림</p>
            <input
              type="checkbox"
              id="spCommunityRecommentPush"
              checked={alarmObj.spCommunityRecommentPush}
              onChange={chkChange}
            />
            <label htmlFor="spCommunityRecommentPush">CHECK</label>
          </li>
        </ul>
        <div className={styles.btns}></div>
      </div>
      <div className={styles.alarmSubmit}>
        <button type="button" onClick={submitAlarm}>
          설정완료
        </button>
      </div>
    </div>
  );
};
export default MyPageAlarmTab;
