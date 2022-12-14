import React, { useState, useEffect } from "react";
import styles from "scss/components/home/Filter.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { redirect, useNavigate } from "react-router-dom";
import FilterModal from "components/home/FilterModal";
import SupportFilter from "components/SupportFilter";
import { setLoginCheck } from "redux/store";
const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      <div className={styles.Filter}>
        <h3>맞춤 지원사업 조회</h3>
        <div className={styles.custom}>
          <div className={styles.topArea}>
            <SupportFilter styles={styles} />
          </div>
          <div className={styles.bottomArea}>
            <button
              name="login"
              onClick={() => {
                if (!isLoggedIn) {
                  dispatch(setLoginCheck(true));
                  return false;
                }
                navigate("/support/supportList");
              }}
            >
              {!isLoggedIn
                ? "로그인하고 맞춤 지원사업 조회하기"
                : "맞춤 지원사업 조회하기"}
            </button>
            {!isLoggedIn && (
              <button
                name="noLogin"
                onClick={() => {
                  navigate("/support/supportList");
                }}
              >
                비회원으로 조회하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Filter;
