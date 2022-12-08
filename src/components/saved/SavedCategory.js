import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "scss/components/saved/SavedCategory.module.scss";
import { useSelector } from "react-redux";
const SavedCategory = ({ cate, ord }) => {
  const [totalCount, setTotalCount] = useState({});
  const userInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cateClick = (e) => {
    const {
      currentTarget: { value },
    } = e;
    console.log(e);
    navigate(`?cate=${value}`);
  };
  const getTotalCount = () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      method: "POST",
      url: "/saved/getTotalCountList",
    }).then((res) => {
      setTotalCount(res.data);
    });
  };
  useEffect(() => {
    getTotalCount();
  }, [userInfo]);
  useEffect(() => {
    console.log(cate);
  }, [cate]);
  return (
    <ul className={styles.SavedCategory}>
      <li
        className={
          `${styles.cateItem} ` + (cate == "recent" ? styles.current : "")
        }
      >
        <button onClick={cateClick} value="recent">
          <span className={styles.cate}>최근 본 사업</span>
          <span className={styles.numb}>
            {totalCount.view_cnt > 1000
              ? "1,000+"
              : totalCount.view_cnt > 100
              ? "100+"
              : totalCount.view_cnt}
          </span>
        </button>
      </li>

      <li
        className={
          `${styles.cateItem} ` + (cate == "save" ? styles.current : "")
        }
      >
        <button onClick={cateClick} value="save">
          <span className={styles.cate}>찜한 사업</span>
          <span className={styles.numb}>
            {totalCount.save_cnt > 1000
              ? "1,000+"
              : totalCount.save_cnt > 100
              ? "100+"
              : totalCount.save_cnt}
          </span>
        </button>
      </li>

      <li
        className={
          `${styles.cateItem} ` + (cate == "apply" ? styles.current : "")
        }
      >
        <button onClick={cateClick} value="apply">
          <span className={styles.cate}>지원한 사업</span>
          <span className={styles.numb}>
            {totalCount.done_cnt > 1000
              ? "1,000+"
              : totalCount.done_cnt > 100
              ? "100+"
              : totalCount.done_cnt}
          </span>
        </button>
      </li>
    </ul>
  );
};
export default SavedCategory;
