import React, { useState } from "react";
import styles from "scss/components/Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = ({}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchVal(value);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchText.value;
    if (searchValue == "") {
      alert("검색어를 입력하세요.");
      return false;
    }
    alert("검색 시작");
    setSearchVal("");
  };
  return (
    <>
      <div className={styles.Header}>
        <h1 className={styles.headerLogo}>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/public_assets/img/LOGO.png"}
              alt="HEYSOME LOGO"
            />
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="###">찜</Link>
            </li>
            <li>
              <Link to="/support/supportList">지원사업</Link>
            </li>
            <li>
              <Link to="/community/communityList/">커뮤니티</Link>
            </li>
            <li>
              <Link to="###">공지사항</Link>
            </li>
          </ul>
        </nav>
        <form className={styles.searchForm} onSubmit={searchSubmit}>
          <input
            type="text"
            name="searchText"
            placeholder="지원사업을 검색해보세요."
            onChange={onChange}
            value={searchVal}
          />
          <button type="submit">SEARCH</button>
        </form>
        <div className={styles.loginArea}>
          {isLoggedIn ? (
            <>
              <span>유저아이콘</span>
              <button>로그아웃</button>
            </>
          ) : (
            <>
              <button>로그인</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
