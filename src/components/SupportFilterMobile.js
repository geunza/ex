import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSupportItem, setSupportInfo } from "redux/store";
import FilterButton from "components/home/FilterButton";
import { setLoginCheck } from "redux/store";
import FilterModal from "components/home/FilterModal";
import styles from "scss/components/SupportFilterMobile.module.scss";
const SupportFilterMobile = () => {
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
            <p className={styles.filterTit}>
              사업자형태
              {supportInfo.bizp_type_cd.multiply ? (
                <span className={styles.multiply}>(중복가능)</span>
              ) : null}
            </p>
            <div className={styles.filterModalBtnWrap}>
              <button
                onClick={() => {
                  filterModalOpen(true, 3);
                }}
              >
                {supportInfo.bizp_type_cd.datas.length > 1
                  ? `${supportInfo.bizp_type_cd.datas[0].code_nm}외 ${
                      supportInfo.bizp_type_cd.datas.length - 1
                    }건`
                  : supportInfo.bizp_type_cd.datas.length == 1
                  ? supportInfo.bizp_type_cd.datas[0].code_nm
                  : "선택"}
              </button>
            </div>
          </li>
          <li className={styles.filterList}>
            <p className={styles.filterTit}>
              창업기간
              {supportInfo.prd_cd.multiply ? (
                <span className={styles.multiply}>(중복가능)</span>
              ) : null}
            </p>
            <div className={styles.filterModalBtnWrap}>
              <button
                style={{
                  opacity:
                    supportInfo.bizp_type_cd.datas[0].code == "02" ? 0.5 : null,
                  color:
                    supportInfo.bizp_type_cd.datas[0].code == "02"
                      ? "#555"
                      : null,
                  borderColor:
                    supportInfo.bizp_type_cd.datas[0].code == "02"
                      ? "#555"
                      : null,
                }}
                onClick={() => {
                  supportInfo.bizp_type_cd.datas[0].code == "02"
                    ? alert("예비창업자는 선택할 수 없습니다.")
                    : filterModalOpen(true, 4);
                }}
              >
                {supportInfo.prd_cd.datas.length > 1
                  ? `${supportInfo.prd_cd.datas[0].code_nm}외 ${
                      supportInfo.prd_cd.datas.length - 1
                    }건`
                  : supportInfo.prd_cd.datas.length == 1
                  ? supportInfo.prd_cd.datas[0].code_nm
                  : "선택"}
              </button>
            </div>
          </li>
          <li className={styles.filterList}>
            <p className={styles.filterTit}>
              기업형태
              {supportInfo.biz_type_cd.multiply ? (
                <span className={styles.multiply}>(중복가능)</span>
              ) : null}
            </p>
            <div className={styles.filterModalBtnWrap}>
              <button
                style={{
                  opacity:
                    supportInfo.bizp_type_cd.datas[0].code == "02" ? 0.5 : null,
                  color:
                    supportInfo.bizp_type_cd.datas[0].code == "02"
                      ? "#555"
                      : null,
                  borderColor:
                    supportInfo.bizp_type_cd.datas[0].code == "02"
                      ? "#555"
                      : null,
                }}
                onClick={() => {
                  supportInfo.bizp_type_cd.datas[0].code == "02"
                    ? alert("예비창업자는 선택할 수 없습니다.")
                    : filterModalOpen(true, 5);
                }}
              >
                {supportInfo.biz_type_cd.datas.length > 1
                  ? `${supportInfo.biz_type_cd.datas[0].code_nm}외 ${
                      supportInfo.biz_type_cd.datas.length - 1
                    }건`
                  : supportInfo.biz_type_cd.datas.length == 1
                  ? supportInfo.biz_type_cd.datas[0].code_nm
                  : "선택"}
              </button>
            </div>
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
export default SupportFilterMobile;
