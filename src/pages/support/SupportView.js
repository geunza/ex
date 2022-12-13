import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
import styles from "scss/pages/SupportView.module.scss";
import SupportItem from "components/support/SupportItem";
const SupportView = ({}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [item, setItem] = useState({});
  const [ready, setReady] = useState(false);
  const getSupportItem = () => {
    dispatch(loadingStart());
    axios({
      url: "/support/getSupportInfoList",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
      data: {
        ord: "전체",
        business_type: "01",
        start_period: "999",
        company_type: "01",
        target_cat_name: "01",
        business_ctg: "01",
        tech_ctg: "01",
        loc_code: "C82",
      },
    }).then((res) => {
      const item = res.data.find((x) => x.si_idx == id);
      if (item == undefined) {
        setItem({});
      } else {
        setItem(item);
        console.log(item);
      }
      dispatch(loadingEnd());
    });
  };
  useEffect(() => {
    if (Object.keys(item).length > 0) {
      setReady(true);
    }
  }, [item]);
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      axios({
        url: "/mainpage/insertTimeLine",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: { support_info: id },
      }).then((res) => {});
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${id}`,
      method: "POST",
    }).then((res) => {});
    getSupportItem();
  }, []);
  useEffect(() => {
    getSupportItem();
  }, [userInfo]);
  const obj = {
    sp_receive_push: "Y",
    sp_recomment_push: "Y",
    sp_community_commentlike_push: "Y",
    sp_community_recomment_push: "Y",
    user_id: "1645737618",
    sp_keyword_push: "N",
    sp_content_comment_push: "Y",
    marketing_push: "Y",
    sp_bookmark_push: "N",
    sp_commentlike_push: "Y",
  };
  return (
    <div className={styles.SupportView}>
      <div className="inner">
        {ready && (
          <>
            <ul className={styles.listWrap}>
              <SupportItem item={item} getSupportCont={getSupportItem} />
            </ul>

            <div className={styles.supportViewCont}>
              <p>loccode : {item.loccode}</p>
              <p>locname : {item.locname}</p>
              <p>mb_save_yn : {item.mb_save_yn}</p>
              <p>mobile_url : {item.mobile_url}</p>
              <p>pc_url : {item.pc_url}</p>
              <p>save_cnt : {item.save_cnt}</p>
              <p>share_cnt : {item.share_cnt}</p>
              <p>si_active_yn : {item.si_active_yn}</p>
              <p>si_cret_dt : {item.si_cret_dt}</p>
              <p>si_end_dt : {item.si_end_dt}</p>
              <p>si_idx : {item.si_idx}</p>
              <p>si_title : {item.si_title}</p>
              <p>target_cat_name : {item.target_cat_name}</p>
              <p>target_cost_value : {item.target_cost_value}</p>
              <p>target_name : {item.target_name}</p>
              <p>totalcnt : {item.totalcnt}</p>
              <p>view_cnt : {item.view_cnt}</p>
            </div>
          </>
        )}
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
    </div>
  );
};

export default SupportView;
