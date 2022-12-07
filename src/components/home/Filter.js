import React, { useState, useEffect } from "react";
import styles from "scss/components/home/Filter.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { redirect, useNavigate } from "react-router-dom";
import FilterModal from "components/home/FilterModal";
const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const [filterModal, setFilterModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);

  const filterModalOpen = (bool, idx) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
    } else {
      setFilterModal(bool);
      setModalStep(idx);
    }
  };
  const filterBtnClick = (item, e) => {
    !isLoggedIn
      ? alert("로그인이 필요합니다.")
      : dispatch(setSupportInfo(item));
  };
  return (
    <>
      <div className={styles.Filter}>
        <h3>맞춤 지원사업 조회</h3>
        <div className={styles.custom}>
          <div className={styles.topArea}>
            <ul className={styles.filterListWrap}>
              <li className={styles.filterList}>
                <p className={styles.filterTit}>사업자형태</p>
                <ol className={styles.filterItems}>
                  {supportItem.bizp_type_cd.map((item, idx, arr) => {
                    return (
                      <li key={item.code}>
                        <FilterButton
                          baseObj={supportInfo}
                          idx={idx}
                          item={item}
                          onClick={filterBtnClick}
                        />
                      </li>
                    );
                  })}
                </ol>
              </li>
              <li className={styles.filterList}>
                <p className={styles.filterTit}>창업기간</p>
                <ol className={styles.filterItems}>
                  {supportItem.prd_cd.map((item, idx, arr) => {
                    return (
                      <li key={item.code}>
                        <FilterButton
                          baseObj={supportInfo}
                          idx={idx}
                          item={item}
                          onClick={filterBtnClick}
                        />
                      </li>
                    );
                  })}
                </ol>
              </li>
              <li className={styles.filterList}>
                <p className={styles.filterTit}>
                  기업형태
                  <span className={styles.multiply}>(중복가능)</span>
                </p>
                <ol className={styles.filterItems}>
                  {supportItem.biz_type_cd.map((item, idx, arr) => {
                    return (
                      <li key={item.code}>
                        <FilterButton
                          baseObj={supportInfo}
                          idx={idx}
                          item={item}
                          onClick={filterBtnClick}
                        />
                      </li>
                    );
                  })}
                </ol>
              </li>
              <li className={styles.filterList}>
                <div className={styles.filterModalBtnWrap}>
                  <div>
                    <p className={styles.filterTit}>지원분야</p>
                    <button
                      onClick={() => {
                        filterModalOpen(true, 0);
                      }}
                    >
                      {supportInfo.spt_cd.datas.length > 1
                        ? `${supportInfo.spt_cd.datas[0].code_nm}외 ${
                            supportInfo.spt_cd.datas.length - 1
                          }건`
                        : supportInfo.spt_cd.datas.length == 1
                        ? supportInfo.spt_cd.datas[0].code_nm
                        : "선택"}
                    </button>
                  </div>
                  <div>
                    <p className={styles.filterTit}>기술분야</p>
                    <button
                      onClick={() => {
                        filterModalOpen(true, 1);
                      }}
                    >
                      {supportInfo.tech_cd.datas.length > 1
                        ? `${supportInfo.tech_cd.datas[0].code_nm}외 ${
                            supportInfo.tech_cd.datas.length - 1
                          }건`
                        : supportInfo.tech_cd.datas.length == 1
                        ? supportInfo.tech_cd.datas[0].code_nm
                        : "선택"}
                    </button>
                  </div>
                  <div>
                    <p className={styles.filterTit}>지역</p>
                    <button
                      onClick={() => {
                        filterModalOpen(true, 2);
                      }}
                    >
                      {supportInfo.loc_cd.datas.length > 1
                        ? `${supportInfo.loc_cd.datas[0].code_nm}외 ${
                            supportInfo.loc_cd.datas.length - 1
                          }건`
                        : supportInfo.loc_cd.datas.length == 1
                        ? supportInfo.loc_cd.datas[0].code_nm
                        : "선택"}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            {filterModal && (
              <FilterModal
                supportItem={supportItem}
                supportInfo={supportInfo}
                filterModalOpen={filterModalOpen}
                modalStep={modalStep}
                setModalStep={setModalStep}
              />
            )}
          </div>
          <div className={styles.bottomArea}>
            <button
              name="login"
              onClick={() => {
                if (!isLoggedIn) {
                  alert("로그인이 필요합니다.");
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
