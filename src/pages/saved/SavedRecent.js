import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SavedTitle from "components/saved/SavedTitle";
import SavedCategory from "components/saved/SavedCategory";
import SavedItem from "components/saved/SavedItem";
import SavedChart from "components/saved/SavedChart";
import styles from "scss/pages/SavedRecent.module.scss";
import { loadingStart, loadingEnd } from "redux/store";
const SavedRecent = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [recentItems, setRecentItems] = useState([]);
  const [ord, setOrd] = useState("");

  const getRecentItems = (ord) => {
    dispatch(loadingStart());
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: {
        ord: ord,
      },
      method: "POST",
      url: "/saved/getRecentlyMySavedBook",
    }).then((res) => {
      setRecentItems(res.data);
      dispatch(loadingEnd());
    });
  };

  const ordChange = (e) => {
    const {
      currentTarget: { value },
    } = e;
    searchParams.set("ord", value);
    navigate("?" + searchParams.toString());
  };
  useEffect(() => {
    const urlOrd = searchParams.get("ord");
    if (urlOrd == null) {
      setOrd("전체");
    } else {
      setOrd(urlOrd);
    }
  }, [searchParams]);
  useEffect(() => {
    getRecentItems(ord);
  }, [ord]);
  useEffect(() => {
    getRecentItems("전체");
  }, [userInfo]);
  return (
    <div className={styles.SavedRecent}>
      <SavedTitle />
      <div className={`inner ${styles.savedCont}`}>
        <div className={styles.leftArea}>
          <SavedCategory />
          <div className={styles.savedItemsWrap}>
            <div className={styles.ordArea}>
              <div className="ordBtns">
                <button
                  onClick={ordChange}
                  value={"전체"}
                  data-selected={ord == "전체" && "selected"}
                >
                  <span>전체</span>
                </button>
                <button
                  onClick={ordChange}
                  value={"인기순"}
                  data-selected={ord == "인기순" && "selected"}
                >
                  <span>인기순</span>
                </button>
                <button
                  onClick={ordChange}
                  value={"금액높은순"}
                  data-selected={ord == "금액높은순" && "selected"}
                >
                  <span>금액높은순</span>
                </button>
                <button
                  onClick={ordChange}
                  value={"마감임박순"}
                  data-selected={ord == "마감임박순" && "selected"}
                >
                  <span>마감임박순</span>
                </button>
              </div>
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
            <ul className={styles.savedItemsList}>
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
