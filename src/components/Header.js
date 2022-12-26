import React, { useCallback, useState } from "react";
import styles from "scss/components/Header.module.scss";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signIn,
  signOut,
  setUserInfo,
  removeUserInfo,
  setLoginCheck,
} from "redux/store";
import axios from "axios";
import { useEffect } from "react";
import SearchBox from "components/SearchBox";
import {
  REST_API_KEY,
  REDIRECT_URI,
  LOGOUT_REDIRECT_URI,
} from "pages/login/KakaoLoginData";
const Header = ({}) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [popularKeyword, setPopularKeyword] = useState([]);
  const [myKeyword, setMyKeyword] = useState([]);
  const [sessionKeyword, setSessionKeyword] = useState([]);
  const getPopluarKeyword = () => {
    axios({
      url: "/mainpage/getSearchHotKeyWord",
      method: "POST",
    }).then((res) => {
      setPopularKeyword(res.data);
    });
  };
  const getMyKeyword = () => {
    axios({
      url: "/mainpage/getMyRecentKeyword",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      setMyKeyword(res.data);
      // setMyKeyword([]);
    });
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearchVal(value);
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.searchText.value;
    if (searchValue.replaceAll(" ", "") == "") {
      alert("검색어를 입력하세요.");
      return false;
    }
    if (isLoggedIn) {
      axios({
        url: "/mainpage/insertTimeLine",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: { search_text: searchVal },
      }).then((res) => {
        navigate(`/support/supportList?keyword=${searchValue}`);
        setSearchOpen(false);
        setSearchVal("");
        getMyKeyword();
        document.querySelector("#searchText").blur();
      });
    } else {
      setSessionKeyword([searchValue, ...sessionKeyword]);
      navigate(`/support/supportList?keyword=${searchValue}`);
      setSearchOpen(false);
      setSearchVal("");
      document.querySelector("#searchText").blur();
    }
  };
  const handleLogin = () => {
    dispatch(setLoginCheck(true));
  };
  const temporarysignOut = () => {
    dispatch(removeUserInfo());
    dispatch(signOut());
  };
  useEffect(() => {
    setSearchVal("");
    setSearchOpen(false);
  }, [location]);
  useEffect(() => {
    getPopluarKeyword();
    getMyKeyword();
  }, [userInfo]);
  useEffect(() => {
    if (!isLoggedIn) {
      let sessionItem = sessionStorage.getItem("sessionKeyword");
      if (sessionItem == null) {
        setSessionKeyword([]);
      } else {
        setSessionKeyword(JSON.parse(sessionItem));
      }
    }
  }, [isLoggedIn]);
  useEffect(() => {
    sessionStorage.setItem(
      "sessionKeyword",
      JSON.stringify([...sessionKeyword].filter((x) => x != ""))
    );
  }, [sessionKeyword]);
  const handleBlur = (e) => {
    const currentTarget = e.currentTarget;
    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setSearchOpen(false);
      }
    });
  };
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      if (userInfo.id.length == 10) {
        //카카오
        const token = localStorage.getItem("kakaoToken");
        console.log(token);
        window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
      }
    }
  };
  return (
    <>
      <div className={styles.Header}>
        <h1 className={styles.headerLogo}>
          <Link to="/">
            <img src={require("assets/img/LOGO.png")} alt="EXITO LOGO" />
          </Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link
                to="/saved?cate=save"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    dispatch(setLoginCheck(true));
                    return false;
                  }
                  navigate(e.currentTarget.getAttribute("to"));
                }}
              >
                찜
              </Link>
            </li>
            <li>
              <Link to="/support/supportList">지원사업</Link>
            </li>
            <li>
              <Link to="/community/communityList">커뮤니티</Link>
            </li>
            <li>
              <Link to="/notice/noticeList">공지사항</Link>
            </li>
          </ul>
        </nav>
        {!isMobile ? (
          <form
            className={styles.searchForm}
            onSubmit={searchSubmit}
            onFocus={() => {
              setSearchOpen(true);
            }}
            onBlur={handleBlur}
          >
            <input
              type="text"
              name="searchText"
              id="searchText"
              placeholder="지원사업을 검색해보세요."
              onChange={onChange}
              value={searchVal}
              autoComplete="off"
              className={searchOpen ? styles.searchOpen : null}
            />
            <button type="submit">
              <img
                src={require("assets/img/global/ico/ico_search.png")}
                alt="SEARCH"
              />
            </button>
            {searchOpen && (
              <SearchBox
                styles={styles}
                popularKeyword={popularKeyword}
                myKeyword={myKeyword}
                getMyKeyword={getMyKeyword}
                sessionKeyword={sessionKeyword}
                setSessionKeyword={setSessionKeyword}
              />
            )}
          </form>
        ) : null}
        <div className={styles.loginArea}>
          {isLoggedIn ? (
            <>
              <Link to="/myPage">
                {isMobile ? (
                  <img
                    src={require("assets/img/global/ico/ico_user_black.png")}
                    alt="myPage"
                    className={styles.myPageImg}
                  />
                ) : (
                  <img
                    src={require("assets/img/global/ico/ico_user.png")}
                    alt="myPage"
                    className={styles.myPageImg}
                  />
                )}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.btnLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button onClick={handleLogin} className={styles.btnLogIn}>
                로그인
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
