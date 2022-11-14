import React from "react";
import styles from "scss/components/support/SupportFilter.module.scss";
import { useSelector } from "react-redux";
import { setSupportInfo } from "store/supportInfoSlice";
import { useEffect, useState } from "react";
const SupportFilter = ({}) => {
  const supportInfo = useSelector((state) => state.supportInfo);
  const [supportInfoArr, setSupportInfoArr] = useState([]);
  useEffect(() => {
    let arr = [];
    for (let data in supportInfo) {
      arr.push({
        name: data,
        data: supportInfo[data],
      });
    }
    setSupportInfoArr(arr);
  }, [supportInfo]);
  return (
    <>
      <div className={styles.SupportFilter}>
        <h4>조회 필터 </h4>
        <div className={styles.chkArea}>
          <input type="checkbox" id="chkAll" />
          <label htmlFor="chkAll">전체 지원사업 보기</label>
        </div>
        <div className={styles.filterBox}>
          <ul className={styles.filterList}>
            {supportInfoArr.map((item, idx) => {
              return (
                <li className={styles.filterItem} key={idx}>
                  <div className={styles.itemTit}>
                    <span>{item.name}</span>
                    <button type="button">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/public_assets/img/global/btn/btn_arr.png"
                        }
                        alt="Select"
                      />
                    </button>
                  </div>
                  <p>
                    {Array.isArray(item.data)
                      ? item.data.length > 1
                        ? `${item.data[0].text} 외 ${item.data.length - 1}건`
                        : item.data.length == 1
                        ? item.data[0].text
                        : "없어용"
                      : item.data.text}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className={styles.submitArea}>
            <button type="button">
              <span>조회</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SupportFilter;
