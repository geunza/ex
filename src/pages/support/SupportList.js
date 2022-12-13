import React, { useState, useEffect } from "react";
import styles from "scss/pages/SupportList.module.scss";
import SupportFilter from "components/support/SupportFilter";
import SupportContent from "components/support/SupportContent";
import SupportRecent from "components/support/SupportRecent";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadingStart, loadingEnd } from "redux/store";
import { useLocation, useNavigate } from "react-router-dom";
import { setSupportData } from "redux/store";
const SupportList = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userInfo = useSelector((state) => state.userInfo);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItem = useSelector((state) => state.supportItem);
  const supportData = useSelector((state) => state.supportData);
  const [ord, setOrd] = useState("");
  const [page, setPage] = useState("");
  const getSupportCont = () => {
    dispatch(loadingStart());
    axios({
      url: "/support/getSupportInfoList",
      method: "POST",
      headers: {
        user_id: parseInt(userInfo.id),
      },
      data: {
        ord: ord,
        business_type: supportInfo.bizp_type_cd.datas
          .map((v) => v.code)
          .toString(),
        start_period: supportInfo.prd_cd.datas.map((v) => v.code).toString(),
        company_type: supportInfo.biz_type_cd.datas
          .map((v) => v.code)
          .toString(),
        target_cat_name: supportInfo.spt_cd.datas.map((v) => v.code).toString(),
        business_ctg: supportInfo.biz_cd.datas.map((v) => v.code).toString(),
        tech_ctg: supportInfo.tech_cd.datas.map((v) => v.code).toString(),
        loc_code: supportInfo.loc_cd.datas.map((v) => v.code).toString(),
      },
    }).then((res) => {
      dispatch(setSupportData(res.data));
      dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    getSupportCont();
  }, [userInfo]);
  return (
    <>
      <div className={styles.SupportList}>
        <div className={`inner`}>
          <div className={styles.tit}>
            <h4>신청 가능한 지원사업 찾기</h4>
            <p>
              좌측 <mark>필터 설정</mark> 후 내 기업에 맞는 지원사업만
              확인하세요.
            </p>
          </div>
          <div className={styles.contArea}>
            <div className={styles.filterArea}>
              <SupportFilter
                supportInfo={supportInfo}
                getSupportCont={getSupportCont}
              />
            </div>
            <div className={styles.listArea}>
              <SupportContent getSupportCont={getSupportCont} />
            </div>
            <div className={styles.recentArea}>
              <SupportRecent userInfo={userInfo} />
            </div>
          </div>
        </div>
      </div>
      <style>
        {
          "\
        body{\
          background-color:#fff;\
        }\
      "
        }
      </style>
    </>
  );
};

export default SupportList;
