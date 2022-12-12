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
      }).then((res) => {
        console.log("TIMELINE", res.data);
      });
    }
    axios({
      url: `/mainpage/upViewCnt?si_idx=${id}`,
      method: "POST",
    }).then((res) => {
      console.log("COUNT", res.data);
    });
    getSupportItem();
  }, []);
  useEffect(() => {
    getSupportItem();
  }, [userInfo]);
  return (
    <div className={styles.SupportView}>
      <div className="inner">
        {ready && (
          <>
            <ul className={styles.listWrap}>
              <SupportItem item={item} getSupportCont={getSupportItem} />
            </ul>

            <div className={styles.supportViewCont}>supportViewCont</div>
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
