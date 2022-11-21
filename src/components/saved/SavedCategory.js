import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "scss/components/saved/SavedCategory.module.scss";
import { useSelector } from "react-redux";
const SavedCategory = () => {
  const [totalCount, setTotalCount] = useState({});
  const userInfo = useSelector((state) => state.userInfo);
  const getTotalCount = () => {
    axios({
      headers: {
        user_id: userInfo.userCode,
      },
      method: "POST",
      url: "/saved/getTotalCountList",
    }).then((res) => {
      setTotalCount(res.data);
    });
  };
  useEffect(() => {
    getTotalCount();
  }, []);
  return (
    <ul className={styles.SavedCategory}>
      <li className={styles.cateItem}>
        <Link to="/saved/savedRecent">
          <span className={styles.cate}>최근본 사업</span>
          <span className={styles.numb}>{totalCount.view_cnt}</span>
        </Link>
      </li>
      <li className={styles.cateItem}>
        <Link to="/saved/savedMy">
          <span className={styles.cate}>찜한 사업</span>
          <span className={styles.numb}>{totalCount.save_cnt}</span>
        </Link>
      </li>
      <li className={styles.cateItem}>
        <Link to="/saved/savedApply">
          <span className={styles.cate}>지원한 사업</span>
          <span className={styles.numb}>{totalCount.done_cnt}</span>
        </Link>
      </li>
    </ul>
  );
};
export default SavedCategory;
