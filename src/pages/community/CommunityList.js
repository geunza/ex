import React from "react";
import { useState, useEffect } from "react";
import { Link, match, useParams } from "react-router-dom";
import styles from "scss/pages/CommunityList.module.scss";
import Banner from "components/MainBanner";
import axios from "axios";
const CommunityList = ({}) => {
  const { category } = useParams();
  const [communityList, setCommunityList] = useState([]);
  useEffect(() => {
    axios(
      `/mobile/community/all?select_cat=${category}&ord=최신순&cnt_sql=0`
    ).then((res) => {
      return setCommunityList(res.data);
    });
  }, [category]);

  useEffect(() => {
    console.log(communityList);
  }, [communityList]);
  return (
    <div className={styles.CommunityList}>
      <div className={styles.titleArea}>
        <div className={styles.leftArea}>
          <h3>커뮤니티</h3>
          <p>창업에 필요한 정보를 공유하고 얻어가세요.</p>
        </div>
        <div className={styles.rightArea}>
          <Link to="###">내가 작성한 게시글/댓글</Link>
          <Link to="###">차단 회원 관리</Link>
        </div>
      </div>
      <div className={styles.listTop}>
        <div className={styles.popular}>
          <h4>인기 글</h4>
          <ul>
            <li>글 입니다.</li>
            <li>글 입니다.</li>
            <li>글 입니다.</li>
          </ul>
        </div>
        <div className={styles.banner}>
          <Banner />
        </div>
      </div>
      <div className={styles.listCategory}>
        <Link to="/community/communityList/전체">전체</Link>
        <Link to="/community/communityList/정보공유">정보공유</Link>
        <Link to="/community/communityList/QnA">QnA</Link>
        <Link to="/community/communityList/기업매칭">기업 매칭</Link>
        <Link to="/community/communityList/자유게시판">자유 게시판</Link>
      </div>
    </div>
  );
};
export default CommunityList;
