import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "scss/components/home/Filter.module.scss";

const Filter = () => {
  return (
    <>
      <div className={styles.Filter}>
        <h3>맞춤 지원사업 조회</h3>
        <div className={styles.custom}>
          <div className={styles.topArea}></div>
        </div>
      </div>
    </>
  );
};
export default Filter;
