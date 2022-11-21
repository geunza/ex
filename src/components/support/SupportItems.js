import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "scss/components/support/SupportItems.module.scss";
import axios from "axios";
const SupportItems = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [ord, setOrd] = useState("전체");
  const [count, setCount] = useState(30);
  const [sltView, setSltView] = useState(false);
  const countClick = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setCount(value);
    setSltView(false);
  };
  const ordClick = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setOrd(value);
  };
  return (
    <>
      <div className={styles.supportItems}>
        <div className={styles.ordArea}>
          <button
            type="button"
            value="전체"
            onClick={ordClick}
            data-selected={ord == "전체" && "selected"}
          >
            <span>전체</span>
          </button>
          <button
            type="button"
            value="인기순"
            onClick={ordClick}
            data-selected={ord == "인기순" && "selected"}
          >
            <span>인기순</span>
          </button>
          <button
            type="button"
            value="금액높은순"
            onClick={ordClick}
            data-selected={ord == "금액높은순" && "selected"}
          >
            <span>금액높은순</span>
          </button>
          <button
            type="button"
            value="마감임박순"
            onClick={ordClick}
            data-selected={ord == "마감임박순" && "selected"}
          >
            <span>마감임박순</span>
          </button>
        </div>
        <div className={styles.contArea}>
          <div className={styles.contTop}>
            <p className={styles.total}>전체 40개</p>
            <div className={styles.countWrap}>
              <p
                onClick={() => {
                  setSltView((prev) => !prev);
                }}
                className={styles.count}
              >
                <span>{count}개씩 보기</span>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/btn/btn_arr_bottom.png"
                  }
                  alt="열기"
                />
              </p>
              {sltView && (
                <ul className={styles.selectArea}>
                  <li>
                    <button type="button" value={30} onClick={countClick}>
                      30개씩 보기
                    </button>
                  </li>
                  <li>
                    <button type="button" value={50} onClick={countClick}>
                      50개씩 보기
                    </button>
                  </li>
                  <li>
                    <button type="button" value={100} onClick={countClick}>
                      100개씩 보기
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className={styles.itemWrap}>
            <ul>
              {Array(10)
                .fill()
                .map((_, idx) => {
                  return (
                    <li className={styles.item} key={idx}>
                      <div className={styles.leftArea}>
                        <div className={styles.itemTop}>
                          <ol>
                            <li>사업화 지원</li>
                            <li>대전</li>
                            <li>K-startup</li>
                          </ol>
                          <p>09.01 (목) 읽음</p>
                        </div>
                        <div className={styles.itemInfo}>
                          <h4>
                            <Link to="###">
                              2022년 규제자유 특구혁신 사업육성
                              사업화지원(기업지원)(대전) 규제자유특구 사업자
                              사업화 지원사업 1차 모집공고
                            </Link>
                          </h4>
                          <p>
                            <span className={styles.moneyTit}>지원금</span>
                            <span className={styles.moneyAmount}>
                              6,000,000원
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className={styles.rightArea}>
                        <ul>
                          <li>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/public_assets/img/global/ico/ico_date.png"
                              }
                              alt="마감일"
                            />
                            <span className={styles.dueDate}>09.15 (일)</span>
                          </li>
                          <li>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/public_assets/img/global/ico/ico_view_black.png"
                              }
                              alt="조회수"
                            />
                            <span>250 회</span>
                          </li>
                          <li className={styles.btnZzim}>
                            <button
                              type="button"
                              data-selected={idx == 1 ? "selected" : null}
                            >
                              <img
                                src={
                                  idx == 1
                                    ? process.env.PUBLIC_URL +
                                      "/public_assets/img/global/ico/ico_zzim.png"
                                    : process.env.PUBLIC_URL +
                                      "/public_assets/img/global/ico/ico_zzim_black.png"
                                }
                                alt="찜O"
                              />
                              <span>찜</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportItems;
