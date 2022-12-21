import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { setLoginCheck } from "redux/store";
import FilterModal from "components/home/FilterModal";

const SupportFilter = ({ styles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportItemReady = useSelector((state) => state.supportItemReady);
  const [filterModal, setFilterModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const filterModalOpen = (bool, idx) => {
    if (!isLoggedIn) {
      dispatch(setLoginCheck(true));
    } else {
      setFilterModal(bool);
      setModalStep(idx);
    }
  };
  const filterBtnClick = (item, e) => {
    !isLoggedIn
      ? dispatch(setLoginCheck(true))
      : dispatch(setSupportInfo(item));
  };
  return (
    <>
      {supportItemReady && (
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
      )}

      {filterModal && (
        <FilterModal
          supportItem={supportItem}
          supportInfo={supportInfo}
          filterModalOpen={filterModalOpen}
          modalStep={modalStep}
          setModalStep={setModalStep}
        />
      )}
    </>
  );
};
export default SupportFilter;
