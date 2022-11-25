import React, { useState, useEffect } from "react";
import axios from "axios";
const NoticeList = () => {
  const [noticeData, setNoticeData] = useState([]);
  const getNoticeData = () => {
    axios({
      url: "/cms/notice/api",
      method: "GET",
    }).then((res) => {
      setNoticeData(res.data);
    });
  };

  useEffect(() => {
    getNoticeData();
  }, [getNoticeData]);
  return (
    <div className="NoticeList">
      <div className={`commonTitleWrap`}>
        <div className={` inner`}>
          <div className={``}>
            <h3 className={`title`}>게시글 작성</h3>
            <p>주제에 맞는 카테고리 선택후 글을 작성해 주세요.</p>
          </div>
        </div>
      </div>
      <div className="cont">
        <div className="inner">
          <ul>
            {noticeData.map((item, idx) => {
              return (
                <li key={item.id}>
                  <p
                    className={`type ` + (item.mustYn == "Y" ? "must" : "")}
                  ></p>
                  <p>{item.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NoticeList;
