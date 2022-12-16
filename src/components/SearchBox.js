import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SearchBox = ({
  styles,
  popularKeyword,
  myKeyword,
  getMyKeyword,
  setSearchOpen,
}) => {
  const userInfo = useSelector((state) => state.userInfo);

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
        <p className={styles.tit}>최근 검색어</p>
        {myKeyword.length > 0 ? (
          <ul className={styles.keywordMy}>
            {myKeyword.map((word, idx) => {
              return (
                <li key={idx}>
                  <Link to={`/support/supportList?keyword=${word.tl_event}`}>
                    {word.tl_event}
                  </Link>
                  <button type="button">X</button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>최근 검색어가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
export default SearchBox;
