import React, { useState, useEffect } from "react";
import axios from "axios";
import NoticeListItem from "components/notice/NoticeListItem";
import styles from "scss/notice/NoticeList.module.scss";
import { loadingStart, loadingEnd } from "store";
import { useDispatch } from "react-redux";
const NoticeList = () => {
  const dispatch = useDispatch();
  const [noticeData, setNoticeData] = useState([]);
  const getNoticeData = () => {
    dispatch(loadingStart());
    axios({
      url: "/cms/notice/api",
      method: "GET",
    }).then((res) => {
      setNoticeData(res.data);
      dispatch(loadingEnd());
    });
  };

  useEffect(() => {
    getNoticeData();
  }, []);
  return (
    <div className="NoticeList">
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
              return (
                <>
                  <NoticeListItem item={item} key={idx} />
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NoticeList;
