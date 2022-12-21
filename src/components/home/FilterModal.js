import React from "react";
import { useEffect, useState } from "react";
import styles from "scss/components/Modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import FilterButton from "components/home/FilterButton";
import Tooltip from "components/Tooltip";
import { modalOverflow } from "redux/store";
import { setSupportInfoModal } from "redux/store";
const FilterModal = ({
  filterModalOpen,
  supportItem,
  modalStep,
  setModalStep,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const supportItemReady = useSelector((state) => state.supportItemReady);
  const [objDummy, setObjDummy] = useState({ ...supportInfo });
  const filterBtnClick = (item, e) => {
    const cate = item.ctg_cd;
    const name = item.code_nm;
    let copy = JSON.parse(JSON.stringify(objDummy));
    const require = copy[cate].require;
    if (name == "전체" || name == "전국") {
      if (
        copy[cate].datas
          .filter((x) => x.code_nm != "전체")
          .filter((x) => x.code_nm != "전국").length == 0
      ) {
        alert("한가지 이상 선택해주세요.");
      }
      copy[cate].datas = [item];
    } else {
      copy[cate].datas = copy[cate].datas
        .filter((x) => x.code_nm != "전체")
        .filter((x) => x.code_nm != "전국");
      if (someItem(copy[cate].datas, item)) {
        if (require && copy[cate].datas.length == 1) {
          alert("한가지 이상 선택해주세요.");
        } else {
          copy[cate].datas = filterItem(copy[cate].datas, item);
        }
      } else {
        if (cate == "loc_cd") {
          copy[cate].datas = addItemLoc(copy[cate].datas, item);
        } else {
          copy[cate].datas = addItem(copy[cate].datas, item);
        }
      }
    }
    setObjDummy(copy);
    function someItem(target, item) {
      return target.some(
        (x) => Object.entries(x).toString() == Object.entries(item).toString()
      );
    }
    function filterItem(target, item) {
      return target.filter(
        (x) => Object.entries(x).toString() != Object.entries(item).toString()
      );
    }
    function addItem(target, item) {
      const sortArr = [...target, item].sort((a, b) => {
        return a.code - b.code;
      });
      return sortArr;
    }
    function addItemLoc(target, item) {
      const sortArr = [...target, item].sort((a, b) => {
        return a.code.replace("C", "") - b.code.replace("C", "");
      });
      if (sortArr.some((item) => item.code == "C82")) {
        if (sortArr.length == 1) {
          return sortArr;
        } else {
          const tObj = sortArr.find((item) => item.code == "C82");
          const tIdx = sortArr.findIndex((item) => item.code == "C82");
          sortArr.splice(tIdx, 1);
          sortArr.unshift(tObj);
        }
      }
      return sortArr;
    }
  };
  const filterModalSubmit = () => {
    for (let key in objDummy) {
      dispatch(setSupportInfoModal({ name: key, datas: objDummy[key].datas }));
    }
    filterModalOpen(false);
  };
  const tooltipOpen = (e) => {
    e.stopPropagation();
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  useEffect(() => {
    setObjDummy({ ...supportInfo });
  }, [supportInfo]);
  useEffect(() => {
    dispatch(modalOverflow(true));
    return () => {
      dispatch(modalOverflow(false));
    };
  }, []);
  return (
    <div className={`${styles.modalWrap} ${styles.FilterModal}`}>
      {supportItemReady && (
        <div className={styles.modalInner}>
          <ul className={styles.btnStepWrap}>
            <li>
              <button
                type="button"
                onClick={() => {
                  setModalStep(0);
                }}
                className={styles.btnStep}
              >
                <span data-selected={modalStep == 0 ? "selected" : null}>
                  지원분야
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setModalStep(1);
                }}
                className={styles.btnStep}
              >
                <span data-selected={modalStep == 1 ? "selected" : null}>
                  기술분야
                  <i
                    onClick={tooltipOpen}
                    className="btnToolTip"
                    data-text="Hi"
                  >
                    <img
                      src={require("assets/img/global/btn/btn_tooltip.png")}
                      alt="tooltip"
                    />
                    <div className="toolTipBox">
                      <p className="txt">
                        사업공고 출처기관에서 명시한 분야로 분류합니다. 해당되는
                        분야 키워드를 중복 선택하시고 조회/추천되는 지원사업에
                        따라 수정해 보세요!
                      </p>
                      <p className="exTxt">
                        AI를 활용한 수산물 밀키트 판매 커머스
                      </p>
                      <div className="exBox">
                        <img
                          src={require("assets/img/global/ico/ico_ex.png")}
                          alt="ico_example"
                          className="ico_ex"
                        />
                        <span>딥테크</span>
                        <span>커머스</span>
                        <span>푸드/농업</span>
                        <span>기타(수산물</span>
                        선택
                      </div>
                    </div>
                  </i>
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setModalStep(2);
                }}
                className={styles.btnStep}
              >
                <span data-selected={modalStep == 2 ? "selected" : null}>
                  지역
                </span>
              </button>
            </li>
          </ul>
          {objDummy && (
            <div className={styles.contArea}>
              {modalStep == 0 && (
                <div className={styles.modalCont}>
                  <div className={styles.title}>
                    <h5 className={styles.required}>지원분야</h5>
                    <span className={styles.multiply}>(중복가능)</span>
                  </div>
                  <ol className={styles.filterItems}>
                    {supportItem.spt_cd.map((item, idx, arr) => {
                      return (
                        <li className={styles.item} key={item.code}>
                          <FilterButton
                            baseObj={objDummy}
                            idx={idx}
                            item={item}
                            onClick={filterBtnClick}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
              {modalStep == 1 && (
                <div className={styles.modalCont}>
                  <div className={styles.title}>
                    <h5 className={styles.required}>사업분야</h5>
                    <span className={styles.multiply}>(중복가능)</span>
                  </div>
                  <ol className={styles.filterItems}>
                    {supportItem.biz_cd.map((item, idx, arr) => {
                      return (
                        <li className={styles.item} key={item.code}>
                          <FilterButton
                            baseObj={objDummy}
                            idx={idx}
                            item={item}
                            onClick={filterBtnClick}
                          />
                        </li>
                      );
                    })}
                  </ol>
                  <div className={styles.title}>
                    <h5 className={styles.required}>기술분야</h5>
                    <span className={styles.multiply}>(중복가능)</span>
                  </div>
                  <ol className={styles.filterItems}>
                    {supportItem.tech_cd.map((item, idx, arr) => {
                      return (
                        <li className={styles.item} key={item.code}>
                          <FilterButton
                            baseObj={objDummy}
                            idx={idx}
                            item={item}
                            onClick={filterBtnClick}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
              {modalStep == 2 && (
                <div className={styles.modalCont}>
                  <div className={styles.title}>
                    <h5>지역</h5>
                    <span className={styles.multiply}>(중복가능)</span>
                  </div>
                  <ol className={styles.filterItems}>
                    {supportItem.loc_cd.map((item, idx, arr) => {
                      return (
                        <li className={styles.item} key={item.code}>
                          <FilterButton
                            baseObj={objDummy}
                            idx={idx}
                            item={item}
                            onClick={filterBtnClick}
                          />
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          )}

          <div className={`confirmArea ${styles.confirmArea}`}>
            <button
              type="button"
              className={styles.btnClose}
              onClick={() => {
                filterModalOpen(false);
              }}
            >
              닫기
            </button>
            <button
              type="button"
              className={styles.btnSubmit}
              onClick={filterModalSubmit}
            >
              선택 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default FilterModal;
