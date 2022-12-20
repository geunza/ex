import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const SearchBox = ({
  styles,
  popularKeyword,
  myKeyword,
  getMyKeyword,
  setSearchOpen,
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const removeMyKeyword = (word) => {
    dispatch(loadingStart());
    axios({
      url: "/mainpage/delMyRecentKeyword",
      method: "POST",
      headers: { user_id: userInfo.id },
      data: { tl_event: word },
    })
      .then((res) => {
        dispatch(loadingEnd());
        getMyKeyword();
      })
      .catch((err) => {
        alert(err);
        dispatch(loadingEnd());
      });
  };
  const removeAll = () => {
    axios({
      url: "/mainpage/delMyAllRecentKeyword",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      getMyKeyword();
    });
  };
  return (
    <div className={styles.searchBox}>
      <div className={styles.box}>
        <p className={styles.tit}>인기 검색어</p>
        {popularKeyword.length > 0 ? (
          <ul className={styles.keywordPopular}>
            {popularKeyword.map((word, idx) => (
              <li>
                <Link to={`/support/supportList?keyword=${word.tl_event}`}>
                  #{word.tl_event}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>인기 검색어가 없습니다.</p>
        )}
      </div>
      <div className={styles.box}>
        <p className={styles.tit}>
          최근 검색어
          {myKeyword.length > 0 && (
            <button
              className={styles.removeAll}
              onClick={removeAll}
              type="button"
            >
              전체삭제
            </button>
          )}
        </p>
        {myKeyword.length > 0 ? (
          <ul className={styles.keywordMy}>
            {myKeyword.map((word, idx) => {
              return (
                <li key={idx}>
                  <Link to={`/support/supportList?keyword=${word.tl_event}`}>
                    {word.tl_event}
                  </Link>
                  <button
                    type="button"
                    className={styles.removeMyKeyword}
                    onClick={() => {
                      removeMyKeyword(word.tl_event);
                    }}
                  >
                    <img
                      src={require("assets/img/global/btn/btn_close_black_small.png")}
                      alt="삭제"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>검색어를 입력하세요.</p>
        )}
      </div>
    </div>
  );
};
export default SearchBox;
