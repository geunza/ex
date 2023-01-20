import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/pages/Saved.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import MyItem from "components/saved/MyItem";
import PaginationSupport from "components/PaginationSupport";
const MyCont = ({
  ord,
  getDoughnutList,
  getBarList,
  getTotalCount,
  count,
  page,
  mobilePage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const isMobile = useSelector((state) => state.isMobile);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [myItems, setMyItems] = useState([]);
  const getMyItems = () => {
    axios({
      url: process.env.REACT_APP_API_URL + "/saved/getMySavedBook",
      method: "POST",
      headers: { user_id: userInfo.id },
      data: { cat: "찜", ord: ord },
    }).then((res) => {
      setMyItems(res.data.filter((x) => x.si_title != null));
      // dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getMyItems();
  }, [ord, userInfo]);

  return (
    <>
      <div className={styles.ordArea}>
        <div className="ordBtns">
          <button
            onClick={(e) => {
              const {
                currentTarget: { value },
              } = e;
              const cate = searchParams.get("cate");
              navigate(`?cate=${cate}&ord=${value}`);
            }}
            value="전체"
            data-selected={ord == "전체" && "selected"}
          >
            <span>전체</span>
          </button>
          <button
            onClick={(e) => {
              const {
                currentTarget: { value },
              } = e;
              const cate = searchParams.get("cate");
              navigate(`?cate=${cate}&ord=${value}`);
            }}
            value="인기순"
            data-selected={ord == "인기순" && "selected"}
          >
            <span>인기순</span>
          </button>
          <button
            onClick={(e) => {
              const {
                currentTarget: { value },
              } = e;
              const cate = searchParams.get("cate");
              navigate(`?cate=${cate}&ord=${value}`);
            }}
            value="금액높은순"
            data-selected={ord == "금액높은순" && "selected"}
          >
            <span>금액높은순</span>
          </button>
          <button
            onClick={(e) => {
              const {
                currentTarget: { value },
              } = e;
              const cate = searchParams.get("cate");
              navigate(`?cate=${cate}&ord=${value}`);
            }}
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
          <span>
            <mark>사업에 지원한 후 '지원'을 클릭해주세요.</mark>
            <mark>해당사업 지원 통계를 확인할 수 있어요.</mark>
          </span>
        </p>
      </div>
      {myItems.length == 0 ? (
        <div className="empty">
          <p className="empty_tit">찜한 사업이 없습니다</p>
          <p className="empty_para">
            관심사업을 찜하시면 쉽고 빠르게 사업을 관리할 수 어요!
          </p>
        </div>
      ) : !isMobile ? (
        <>
          <ul className={styles.savedItemsList}>
            {myItems
              .slice((page - 1) * count, page * count)
              .map((item, idx) => {
                return (
                  <MyItem
                    item={item}
                    key={item.mb_idx}
                    getMyItems={getMyItems}
                    ord={ord}
                    getDoughnutList={getDoughnutList}
                    getBarList={getBarList}
                    getTotalCount={getTotalCount}
                  />
                );
              })}
          </ul>
          <PaginationSupport
            total={myItems.length}
            postLimit={10}
            numLimit={5}
            page={parseInt(page)}
            searchParams={searchParams}
            ord={ord}
          />
        </>
      ) : (
        <ul className={styles.savedItemsList}>
          {myItems.slice(0, count * mobilePage).map((item, idx) => {
            return (
              <MyItem
                item={item}
                key={item.mb_idx}
                getMyItems={getMyItems}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
                getTotalCount={getTotalCount}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
export default MyCont;
