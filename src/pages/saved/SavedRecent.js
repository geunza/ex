import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import SavedTitle from "components/saved/SavedTitle";
import SavedCategory from "components/saved/SavedCategory";
import SavedItem from "components/saved/SavedItem";
import SavedChart from "components/saved/SavedChart";
import styles from "scss/pages/SavedRecent.module.scss";
const SavedRecent = () => {
  const [recentItems, setRecentItems] = useState([]);
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const getRecentItems = () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: {
        ord: "인기순",
      },
      method: "POST",
      url: "/saved/getRecentlyMySavedBook",
    }).then((res) => {
      setRecentItems(res.data);
    });
  };
  useEffect(() => {
    getRecentItems();
  }, [userInfo]);
  return (
    <div className={styles.SavedRecent}>
      <SavedTitle />
      <div className={`inner ${styles.savedCont}`}>
        <div className={styles.leftArea}>
          <SavedCategory />
          <div className="savedRecent">
            <div className="ordArea">
              <ul>
                <li>전체</li>
                <li>인기순</li>
                <li>금액높은순</li>
                <li>마감임박순</li>
              </ul>
              <p>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_inform.png"
                  }
                  alt="정보"
                />
                <span>관심사업을 ‘찜’하시면 마감일 임박 시 알림해 드려요!</span>
              </p>
            </div>
            <ul className="savedItemsWrap">
              {recentItems.map((item, idx) => {
                return <SavedItem item={item} key={item.si_idx} />;
              })}
            </ul>
          </div>
        </div>
        <div className={styles.rightArea}>
          <SavedChart />
        </div>
      </div>
    </div>
  );
};
export default SavedRecent;
