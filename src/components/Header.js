import React, { useState } from "react";
import styles from "scss/components/Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
const Header = ({ isLoggedIn }) => {
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
    alert("검색 시작");
    setSearchVal("");
  };
  return (
    <>
      <div
        style={{ position: "fixed", left: 0, top: 0, background: "#e6e6e6" }}
      >
        <ul>
          <li>
            <Link
              style={{ padding: "0 10px" }}
              to="/community/communityList/전체"
            >
              전체
            </Link>
            <Link
              style={{ padding: "0 10px" }}
              to="/community/communityList/정보공유"
            >
              정보공유
            </Link>
            <Link
              style={{ padding: "0 10px" }}
              to="/community/communityList/QnA"
            >
              QnA
            </Link>
            <Link
              style={{ padding: "0 10px" }}
              to="/community/communityList/기업매칭"
            >
              기업 매칭
            </Link>
            <Link
              style={{ padding: "0 10px" }}
              to="/community/communityList/자유게시판"
            >
              자유 게시판
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.Header}>
        <div className="inner">
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
                <Link to="###">지원사업</Link>
              </li>
              <li>
                <Link to="###">커뮤니티</Link>
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
      </div>
    </>
  );
};
export default Header;
