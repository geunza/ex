import React, { useState, useEffect } from "react";
import FilterButton from "components/home/FilterButton";
import styles from "scss/pages/MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "redux/store/supportInfoSlice";
import axios from "axios";
import FilterModal from "components/home/FilterModal";
const MyCompany = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const [filterModal, setFilterModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [companyInform, setCompanyInform] = useState("");
  const filterModalOpen = (bool, idx) => {
    setFilterModal(bool);
    setModalStep(idx);
  };
  const filterBtnClick = (item, e) => {
    dispatch(setSupportInfo(item));
  };
  useEffect(() => {
    if (userInfo.companyname != null) {
      setCompanyName(userInfo.companyname);
    }
    if (userInfo.username != null) {
      setOwnerName(userInfo.companyname);
    }
    if (userInfo.companyname != null) {
      setCompanyName(userInfo.companyname);
    }
  }, [userInfo]);
  return (
    <div className={styles.myPageForm}>
      <div className={styles.halfItem}>
        <label className={styles.tit} htmlFor="companyName">
          기업명
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          maxLength={30}
          onChange={(e) => {
            setCompanyName(e.currentTarget.value);
          }}
        />
      </div>
      <div className={styles.halfItem}>
        <label className={styles.tit} htmlFor="ownerName">
          대표자명
        </label>
        <input
          type="text"
          id="ownerName"
          value={ownerName}
          maxLength={30}
          onChange={(e) => {
            setOwnerName(e.currentTarget.value);
          }}
        />
      </div>
      <div className={styles.fullItem}>
        <p className={styles.tit}>사업자형태</p>
        <ol className={styles.filterItems}></ol>
      </div>
      <div className={styles.fullItem}>
        <p className={styles.tit}>기업형태</p>
        <ol className={styles.filterItems}></ol>
      </div>
      <div className={styles.fullItem}>
        <p className={styles.tit}>창업기간</p>
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
      </div>
      <div className={styles.halfItem}>
        <p className={styles.tit}>지원분야</p>
        <button
          className={styles.btnModal}
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
      <div className={styles.halfItem}>
        <p className={styles.tit}>기술분야</p>
        <button
          className={styles.btnModal}
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
      <div className={styles.halfItem}>
        <p className={styles.tit}>지역</p>
        <button
          className={styles.btnModal}
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

      <div className={styles.fullItem}>
        <label className={styles.tit} htmlFor="companyInform">
          사업소개
        </label>
        <input
          type="text"
          id="companyInform"
          value={companyInform}
          maxLength={50}
          onChange={(e) => {
            setCompanyInform(e.currentTarget.value);
          }}
        />
      </div>
      <div className={`${styles.fullItem} ${styles.submitArea}`}>
        <button className={styles.btnSubmit}>저장 후 지원사업 조회</button>
      </div>
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
  );
};
export default MyCompany;
