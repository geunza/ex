import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecentItem from "components/saved/RecentItem";
import axios from "axios";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/pages/Saved.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PaginationSupport from "components/PaginationSupport";
const RecentCont = ({
  ord,
  getDoughnutList,
  getBarList,
  getTotalCount,
  page,
  count,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [recentItems, setRecentItems] = useState([]);
  const getRecentItems = () => {
    // dispatch(loadingStart());
    axios({
      headers: {
        user_id: userInfo.id,
      },
      data: { ord: ord },
      method: "POST",
      url: "/saved/getRecentlyMySavedBook",
    }).then((res) => {
      setRecentItems(res.data.filter((x) => x.si_title != null));
      // dispatch(loadingEnd());
    });
  };
  function decode(txt) {
    return decodeURI(txt);
  }
  useEffect(() => {
    getRecentItems();
  }, [ord, userInfo]);
  const ordClick = (e) => {
    const {
      currentTarget: { value },
    } = e;
    const cate = searchParams.get("cate");
    navigate(`?cate=${cate}&ord=${value}`);
  };
  return (
    <>
      <div className={styles.ordArea}>
        <div className="ordBtns">
          <button
            onClick={ordClick}
            value="전체"
            data-selected={ord == "전체" && "selected"}
          >
            <span>전체</span>
          </button>
          <button
            onClick={ordClick}
            value="인기순"
            data-selected={ord == "인기순" && "selected"}
          >
            <span>인기순</span>
          </button>
          <button
            onClick={ordClick}
            value="금액높은순"
            data-selected={ord == "금액높은순" && "selected"}
          >
            <span>금액높은순</span>
          </button>
          <button
            onClick={ordClick}
            value="마감임박순"
            data-selected={ord == "마감임박순" && "selected"}
          >
            <span>마감임박순</span>
          </button>
        </div>
        <p>
          <img
            src={require("assets/img/global/ico/ico_inform.png")}
            alt="정보"
          />
          <span>관심사업을 ‘찜’하시면 마감일 임박 시 알림해 드려요!</span>
        </p>
      </div>
      {recentItems.length == 0 ? (
        <div className="empty">
          <p className="empty_tit">최근 본 사업이 없습니다.</p>
          <p className="empty_para">
            엑시토에서 사업 성공에 필요한
            <Link to="/support/supportList"> 지원사업</Link>을 확인하세요.
          </p>
        </div>
      ) : (
        <>
          <ul className={styles.savedItemsList}>
            {recentItems
              .slice((page - 1) * count, page * count)
              .map((item, idx) => {
                return (
                  <RecentItem
                    item={item}
                    // key={item.si_idx}
                    key={idx}
                    getRecentItems={getRecentItems}
                    ord={ord}
                    getDoughnutList={getDoughnutList}
                    getBarList={getBarList}
                    getTotalCount={getTotalCount}
                  />
                );
              })}
          </ul>
          <PaginationSupport
            total={recentItems.length}
            postLimit={10}
            numLimit={5}
            page={parseInt(page)}
            searchParams={searchParams}
            ord={ord}
          />
        </>
      )}
    </>
  );
};
export default RecentCont;
