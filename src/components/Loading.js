import React from "react";
import styles from "scss/components/Loading.module.scss";
import { useSelector } from "react-redux";

const Loading = () => {
  const isLoading = useSelector((state) => state.isLoading);
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
