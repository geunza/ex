import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecentItem from "components/saved/RecentItem";
import axios from "axios";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/pages/Saved.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ApplyItem from "components/saved/ApplyItem";
import PaginationSupport from "components/PaginationSupport";
const MyCont = ({
  ord,
  getDoughnutList,
  getBarList,
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
  const [applyItems, setApplyItems] = useState([]);
  const getApplyItems = () => {
    axios({
      url: "/saved/getMySavedBook",
      method: "POST",
      headers: { user_id: userInfo.id },
      data: { cat: "지원", ord: ord },
    }).then((res) => {
      setApplyItems(res.data.filter((x) => x.si_title != null));
      // dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getApplyItems();
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
            <mark>선정된 사업은 '선정'을 클릭해 주세요.</mark>
            <mark>다양한 파트너를 만날 수 있어요.</mark>
          </span>
        </p>
      </div>
      {applyItems.length == 0 ? (
        <div className="empty">
          <p className="empty_tit">지원한 사업이 없습니다.</p>
          <p className="empty_para">
            <span>사업에 지원하신 후 지원을 등록하시면</span>
            <span>해당사업에 지원한 회원 통계를 확인할 수 있어요!</span>
          </p>
        </div> //applyItems
      ) : !isMobile ? (
        <>
          <ul className={styles.savedItemsList}>
            {applyItems
              .slice((page - 1) * count, page * count)
              .map((item, idx) => {
                return (
                  <ApplyItem
                    item={item}
                    key={item.si_idx}
                    getApplyItems={getApplyItems}
                    ord={ord}
                    getDoughnutList={getDoughnutList}
                    getBarList={getBarList}
                  />
                );
              })}
          </ul>
          <PaginationSupport
            total={applyItems.length}
            postLimit={10}
            numLimit={5}
            page={parseInt(page)}
            searchParams={searchParams}
            ord={ord}
          />
        </>
      ) : (
        <ul className={styles.savedItemsList}>
          {applyItems.slice(0, count * mobilePage).map((item, idx) => {
            return (
              <ApplyItem
                item={item}
                key={item.si_idx}
                getApplyItems={getApplyItems}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
export default MyCont;
