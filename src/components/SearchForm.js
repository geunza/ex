import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBox from "components/SearchBox";
const SearchForm = ({ styles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
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
    getPopluarKeyword();
    getMyKeyword();
  }, [userInfo]);
  useEffect(() => {
    sessionStorage.setItem(
      "sessionKeyword",
      JSON.stringify([...sessionKeyword].filter((x) => x != ""))
    );
  }, [sessionKeyword]);
  useEffect(() => {
    setSearchVal("");
    setSearchOpen(false);
  }, [location]);
  return (
    <form
      className={styles.SearchForm}
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
  );
};
export default SearchForm;
