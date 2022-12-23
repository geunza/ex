import React from "react";
import styles from "scss/components/Loading.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  return (
    <>
      {isLoading && (
        <div className={styles.Loading}>
          <svg>
            <circle cx="50" cy="50" r="14" />
          </svg>
        </div>
      )}
    </>
  );
};
export default Loading;
