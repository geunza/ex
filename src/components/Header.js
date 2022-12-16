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
const Header = ({}) => {
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [popularKeyword, setPopularKeyword] = useState([]);
  const [myKeyword, setMyKeyword] = useState([]);
  const getPopluarKeyword = () => {
    setPopularKeyword([
      {
        cnt: 5,
        tl_event: "바우처",
      },
      {
        cnt: 5,
        tl_event: "부산",
      },
      {
        cnt: 5,
        tl_event: "소상공인",
      },
      {
        cnt: 5,
        tl_event: "예비",
      },
      {
        cnt: 4,
        tl_event: "경기",
      },
      {
        cnt: 4,
        tl_event: "대구",
      },
      {
        cnt: 4,
        tl_event: "서울",
      },
      {
        cnt: 4,
        tl_event: "예비창업",
      },
      {
        cnt: 4,
        tl_event: "인천",
      },
      {
        cnt: 4,
        tl_event: "창업",
      },
      {
        cnt: 4,
        tl_event: "콘텐츠",
      },
      {
        cnt: 3,
        tl_event: "경남",
      },
      {
        cnt: 3,
        tl_event: "광주",
      },
      {
        cnt: 3,
        tl_event: "마케팅",
      },
      {
        cnt: 3,
        tl_event: "세종",
      },
      {
        cnt: 3,
        tl_event: "청년",
      },
      {
        cnt: 2,
        tl_event: "경기도",
      },
      {
        cnt: 2,
        tl_event: "공간",
      },
      {
        cnt: 2,
        tl_event: "공방",
      },
      {
        cnt: 2,
        tl_event: "공예",
      },
      {
        cnt: 2,
        tl_event: "김해",
      },
      {
        cnt: 2,
        tl_event: "노원",
      },
      {
        cnt: 2,
        tl_event: "농업",
      },
      {
        cnt: 2,
        tl_event: "디자",
      },
      {
        cnt: 2,
        tl_event: "디자인",
      },
      {
        cnt: 2,
        tl_event: "멘토링",
      },
      {
        cnt: 2,
        tl_event: "브랜드",
      },
      {
        cnt: 2,
        tl_event: "블록체인",
      },
      {
        cnt: 2,
        tl_event: "성남시",
      },
      {
        cnt: 2,
        tl_event: "쇼핑몰",
      },
      {
        cnt: 2,
        tl_event: "여성",
      },
      {
        cnt: 2,
        tl_event: "여행",
      },
      {
        cnt: 2,
        tl_event: "울산",
      },
      {
        cnt: 2,
        tl_event: "인건비",
      },
      {
        cnt: 2,
        tl_event: "진주",
      },
      {
        cnt: 2,
        tl_event: "창원",
      },
      {
        cnt: 2,
        tl_event: "친환",
      },
      {
        cnt: 2,
        tl_event: "플랫폼",
      },
    ]);
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
    navigate(`/support/supportList?keyword=${searchValue}`);
    setSearchVal("");
  };
  const temporarysignIn = () => {
    // dispatch(setUserInfo());
    // dispatch(signIn());
    axios({
      url: "/user/getUserInfo",
      method: "POST",
      headers: {
        userID: 2464295270,
      },
    }).then((res) => {
      const data = res.data;
      if (data == null) {
        alert("로그인에 실패하였습니다.");
        return false;
      }
      dispatch(setUserInfo(data));
      dispatch(signIn());
    });
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
            placeholder="지원사업을 검색해보세요."
            onChange={onChange}
            value={searchVal}
            autoComplete="off"
            className={searchOpen ? styles.searchOpen : null}
          />
          <button type="submit">
            <img
              src={
                process.env.PUBLIC_URL +
                "/public_assets/img/global/ico/ico_search.png"
              }
              alt="SEARCH"
            />
          </button>
          {searchOpen && (
            <SearchBox
              styles={styles}
              popularKeyword={popularKeyword}
              myKeyword={myKeyword}
              getMyKeyword={getMyKeyword}
            />
          )}
        </form>
        <div className={styles.loginArea}>
          {isLoggedIn ? (
            <>
              <Link to="/myPage">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_user.png"
                  }
                  alt=""
                />
              </Link>
              <button onClick={temporarysignOut}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={temporarysignIn}>로그인</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
