import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "scss/components/Pagination.module.scss";

const Pagination = ({ total, postLimit, numLimit, page }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(window.location);
  const navigate = useNavigate();
  const [currentPages, setCurrentPages] = useState([]);
  const numPages = Math.ceil(total / postLimit);
  const btnPage = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    sessionStorage.setItem("cMover", "true");
    sessionStorage.setItem("cOffset", 0);
    navigateSearchTxt(name, value);
  };
  function navigateSearchTxt(name, value) {
    const searchTxt = location.search;
    const searchArr = searchTxt.replace("?", "").split("&");
    let searchObj = {};
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    let newSearchTxt = "";
    for (let key in searchObj) {
      if (searchObj[key] == "undefined") {
        continue;
      }
      if (key == name) {
        continue;
      } else {
        newSearchTxt += `${key}=${searchObj[key]}&`;
      }
    }
    newSearchTxt += `${name}=${value}`;
    navigate("?" + newSearchTxt);
  }
  function decode(txt) {
    return decodeURI(txt);
  }
  const changeCurrentPages = () => {
    // total={totalCount}
    // // total={5000}
    // postLimit={count}
    // numLimit={5}
    // page={parseInt(page)}
    // searchParams={searchParams}
    // ord={ord}
    let countArr = [];
    // page : 현재페이지
    // numLimit : 한페이지
    let count = parseInt((parseInt(page) - 1) / numLimit);
    let countStart = count * numLimit;
    let countEnd = count * numLimit + numLimit;
    if (countEnd > numPages) {
      countEnd = numPages;
    }
    for (let i = countStart; i < countEnd; i++) {
      countArr.push(parseInt(i));
    }
    setCurrentPages(countArr);
  };

  useEffect(() => {
    changeCurrentPages();
  }, [page, location, total, postLimit]);
  return (
    <>
      <div className={styles.Pagination}>
        <button
          onClick={btnPage}
          value={1}
          name="page"
          disabled={page === 1}
          className={styles.first}
        >
          <span>First Page</span>
        </button>
        <button
          onClick={btnPage}
          name="page"
          value={page - 1}
          disabled={page === 1}
          className={styles.prev}
        >
          <img
            src={require("assets/img/global/btn/btn_prev.png")}
            alt="prev button"
          />
        </button>
        {currentPages.map((pageValue, i) => {
          return (
            <button
              key={pageValue + 1}
              onClick={btnPage}
              name="page"
              value={pageValue + 1}
              data-current={page == pageValue + 1 ? "current" : null}
            >
              <span>{pageValue + 1}</span>
            </button>
          );
        })}

        {!currentPages.includes(numPages - 1) ? (
          <>
            <button>...</button>
            <button value={numPages} onClick={btnPage} name="page">
              {numPages}
            </button>
          </>
        ) : null}
        <button
          onClick={btnPage}
          name="page"
          value={page + 1}
          disabled={page === numPages}
          className={styles.next}
        >
          <img
            src={require("assets/img/global/btn/btn_next.png")}
            alt="next button"
          />
        </button>
        <button
          onClick={btnPage}
          name="page"
          value={numPages}
          disabled={page === numPages}
          className={styles.last}
        >
          <span>Last Page</span>
        </button>
      </div>
    </>
  );
};
export default Pagination;
