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
      target: { value },
    } = e;
    navigate(`?page=${value}`);
  };
  const changeCurrentPages = () => {
    let countArr = [];
    let count = parseInt((page - 1) / numLimit);
    let countStart = count * numLimit;
    let countEnd = count * numLimit + numLimit;
    if (countEnd > numPages) {
      countEnd = numPages;
    }
    for (let i = countStart; i < countEnd; i++) {
      countArr.push(i);
    }
    setCurrentPages(countArr);
  };

  useEffect(() => {
    changeCurrentPages();
  }, [searchParams]);
  return (
    <>
      <div className={styles.Pagination}>
        <button onClick={btnPage} value={1} disabled={page === 1}>
          &lt;&lt;
        </button>
        <button onClick={btnPage} value={page - 1} disabled={page === 1}>
          &lt;
        </button>
        {currentPages.map((pageValue, i) => {
          return (
            <button
              key={pageValue + 1}
              onClick={btnPage}
              value={pageValue + 1}
              data-current={page == pageValue + 1 ? "current" : null}
            >
              {pageValue + 1}
            </button>
          );
        })}
        <button onClick={btnPage} value={page + 1} disabled={page === numPages}>
          &gt;
        </button>
        <button onClick={btnPage} value={numPages} disabled={page === numPages}>
          &gt;&gt;
        </button>
      </div>
    </>
  );
};
export default Pagination2;
