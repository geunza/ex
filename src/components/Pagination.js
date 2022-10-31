import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "scss/components/Pagination.module.scss";

const Pagination = ({ total, postLimit, page, setPage }) => {
  const numPages = Math.ceil(total / postLimit);
  const numLimit = 10;
  const [currentPages, setCurrentPages] = useState([]);
  const changeCurrent = () => {
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
  const goFirstPage = () => {
    setPage(1);
  };
  const goLastPage = () => {
    setPage(numPages);
  };
  useEffect(() => {
    changeCurrent();
  }, [page]);
  useEffect(() => {
    setPage(1);
    changeCurrent();
  }, [total]);
  return (
    <nav className={styles.Pagination}>
      <button onClick={goFirstPage} disabled={page === 1}>
        &lt;&lt;
      </button>
      <button
        onClick={() => {
          setPage((prev) => prev - 1);
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      {currentPages.map((v, i) => {
        return (
          <button
            key={v + 1}
            onClick={() => {
              setPage(v + 1);
            }}
            data-current={page == v + 1 ? "current" : null}
          >
            {v + 1}
          </button>
        );
      })}
      <button
        onClick={() => {
          setPage((prev) => prev + 1);
        }}
        disabled={page === numPages}
      >
        &gt;
      </button>
      <button onClick={goLastPage} disabled={page === numPages}>
        &gt;&gt;
      </button>
    </nav>
  );
};
export default Pagination;
