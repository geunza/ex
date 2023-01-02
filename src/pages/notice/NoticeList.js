import React, { useState, useEffect } from "react";
import axios from "axios";
import NoticeListItem from "components/notice/NoticeListItem";
import styles from "scss/pages/Notice.module.scss";
import { loadingStart, loadingEnd } from "redux/store";
import { useDispatch } from "react-redux";
import MobileTitle from "components/MobileTitle";
const NoticeList = () => {
  const dispatch = useDispatch();
  const [noticeData, setNoticeData] = useState([]);
  const getNoticeData = () => {
    // dispatch(loadingStart());
    axios({
      url: "/cms/notice/api",
      method: "GET",
    }).then((res) => {
      setNoticeData(res.data);
      // dispatch(loadingEnd());
    });
  };

  useEffect(() => {
    getNoticeData();
  }, []);
  return (
    <div className="NoticeList">
      <MobileTitle title={"공지사항"} />
      <div className={`commonTitleWrap`}>
        <div className={` inner`}>
          <div>
            <h3 className={`title`}>공지사항</h3>
            <p>공지사항을 확인해 주세요.</p>
          </div>
        </div>
      </div>
      <div className={`cont ${styles.NoticeListCont}`}>
        <div className="inner">
          <ul className={`commonListItemWrap ${styles.noticeListWrap}`}>
            {noticeData.map((item, idx) => {
              return <NoticeListItem item={item} key={item.id} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NoticeList;
