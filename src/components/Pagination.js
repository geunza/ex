import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "scss/components/Pagination.module.scss";

const Pagination2 = ({ total, postLimit, numLimit, page, searchParams }) => {
  const navigate = useNavigate();
  const [currentPages, setCurrentPages] = useState([]);
  const numPages = Math.ceil(total / postLimit);
  const btnPage = (e) => {
    const {
      currentTarget: { value },
    } = e;
    searchParams.set("page", parseInt(value));
    navigate("?" + searchParams.toString());
  };
  const changeCurrentPages = () => {
    let countArr = [];
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
  }, [searchParams]);
  return (
    <>
      <div className={styles.Pagination}>
        <button
          onClick={btnPage}
          value={1}
          disabled={page === 1}
          className={styles.first}
        >
          <span>First Page</span>
        </button>
        <button
          onClick={btnPage}
          value={page - 1}
          disabled={page === 1}
          className={styles.prev}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/btn/btn_prev.png"
            }
            alt="prev button"
          />
        </button>
        {currentPages.map((pageValue, i) => {
          return (
            <button
              key={pageValue + 1}
              onClick={btnPage}
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
            <button value={numPages} onClick={btnPage}>
              {numPages}
            </button>
          </>
        ) : null}
        <button
          onClick={btnPage}
          value={page + 1}
          disabled={page === numPages}
          className={styles.next}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              "/public_assets/img/global/btn/btn_next.png"
            }
            alt="next button"
          />
        </button>
        <button
          onClick={btnPage}
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
export default Pagination2;
