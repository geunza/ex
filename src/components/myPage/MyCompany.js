import React, { useState, useEffect } from "react";
import FilterButton from "components/home/FilterButton";
import styles from "scss/pages/MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "redux/store";
import axios from "axios";
import FilterModal from "components/home/FilterModal";
import HomeSupportFilter from "components/HomeSupportFilter";
import { loadingStart, loadingEnd, setCompanyInfo } from "redux/store";
import { useNavigate } from "react-router-dom";
const MyCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const userCompany = useSelector((state) => state.userCompany);
  const [filterModal, setFilterModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [companyName, setCompanyName] = useState(""); // 기업명
  const [ownerName, setOwnerName] = useState(""); // 대표자명
  const [companyIntro, setCompanyIntro] = useState(""); //사업소개
  const filterModalOpen = (bool, idx) => {
    setFilterModal(bool);
    setModalStep(idx);
  };
  const filterBtnClick = (item, e) => {
    dispatch(setSupportInfo(item));
  };
  const companySubmit = () => {
    // dispatch(loadingStart());
    let paramUrl = "";
    const obj = {
      companyName: companyName,
      repName: ownerName,
      intro: companyIntro,
      supportTarget: "", //지원대상 ?
      startPeriod: supportInfo.prd_cd.datas.map((v) => v.code).toString(), //창업기간 prd_cd
      locCtg: supportInfo.loc_cd.datas.map((v) => v.code).toString(), // 지역 loc_cd
      companyType: supportInfo.biz_type_cd.datas.map((v) => v.code).toString(), //기업형태 biz_type_cd
      businessType: supportInfo.bizp_type_cd.datas
        .map((v) => v.code)
        .toString(), //사업자형태 bizp_type_cd
      supportType: supportInfo.spt_cd.datas.map((v) => v.code).toString(), //지원분야 spt_cd
      businessCtg: supportInfo.biz_cd.datas.map((v) => v.code).toString(), //사업분야 biz_cd
      techCtg: supportInfo.tech_cd.datas.map((v) => v.code).toString(), //기술분야 tech_cd
    };
    for (let key in obj) {
      if (obj[key] == "" || obj[key] == undefined || obj[key] == null) {
        continue;
      }
      paramUrl += `${key}=${obj[key]}&`;
    }
    axios({
      url:
        process.env.REACT_APP_API_URL + "/user/updateCompanyInfo?" + paramUrl,
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    }).then((res) => {
      // dispatch(loadingEnd());
      getUserCompany();
      navigate("/support/supportList");
    });
  };
  const getUserCompany = (id) => {
    axios({
      url: process.env.REACT_APP_API_URL + "/user/getCompanyInfo",
      method: "POST",
      headers: {
        userId: userInfo.id,
      },
    }).then((res) => {
      if (res.data == null) return false;
      dispatch(setCompanyInfo(res.data));
    });
  };
  useEffect(() => {
    setCompanyName(userCompany.company_name);
    setOwnerName(userCompany.rep_name);
    setCompanyIntro(userCompany.intro);
  }, [userCompany]);
  return (
    <div className={styles.myPageForm}>
      <div className={styles.halfItem}>
        <label className={styles.tit} htmlFor="companyName">
          기업명
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName || ""}
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
          value={ownerName || ""}
          maxLength={30}
          onChange={(e) => {
            setOwnerName(e.currentTarget.value);
          }}
        />
      </div>
      <HomeSupportFilter styles={styles} />

      <div className={styles.fullItem}>
        <label className={styles.tit} htmlFor="companyIntro">
          사업소개
        </label>
        <input
          type="text"
          id="companyIntro"
          value={companyIntro || ""}
          maxLength={50}
          onChange={(e) => {
            setCompanyIntro(e.currentTarget.value);
          }}
        />
      </div>
      <div className={`${styles.fullItem} ${styles.submitArea}`}>
        <button className={styles.btnSubmit} onClick={companySubmit}>
          저장 후 지원사업 조회
        </button>
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
