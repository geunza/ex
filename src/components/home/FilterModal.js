import React from "react";
import { useEffect, useState } from "react";
import styles from "scss/components/home/HomeModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfoModal } from "store/supportInfoSlice";
import Tooltip from "components/Tooltip";
const FilterModal = ({
  modalOpener,
  modalStep,
  setModalStep,
  data2,
  selectedItems,
}) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const btnStep = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setModalStep(value);
  };
  const tooltipOpen = (e) => {
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  const [modalData, setModalData] = useState({
    지원분야: [],
    사업분야: [],
    기술분야: [],
    지역: [],
  });
  const modalDataSubmit = (e) => {
    dispatch(setSupportInfoModal(modalData));
    modalOpener({ currentTarget: { name: "Modal1", value: "false" } });
  };
  const modalBtnClick = (e, infoName, order, required) => {
    console.log("required", required);
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
    let copy = { ...modalData };
    if (copy[infoName].some((item) => item.text == value)) {
      copy[infoName] = copy[infoName].filter((item) => item.text != value);
    } else {
      copy[infoName].push({ text: value, order: order });
      copy[infoName].sort((a, b) => {
        return a.order - b.order;
      });
    }
    setModalData(copy);
  };
  useEffect(() => {
    setModalData({
      지원분야: [...selectedItems.지원분야],
      사업분야: [...selectedItems.사업분야],
      기술분야: [...selectedItems.기술분야],
      지역: [...selectedItems.지역],
    });
  }, []);
  return (
    <div className={`modalWrap ${styles.FilterModal}`}>
      <div className="modalInner">
        <ul className={styles.btnStepWrap}>
          <li>
            <button
              type="button"
              value={0}
              onClick={btnStep}
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
              value={1}
              onClick={btnStep}
              className={styles.btnStep}
            >
              <span data-selected={modalStep == 1 ? "selected" : null}>
                기술분야
                <i onClick={tooltipOpen} className="btnToolTip" data-text="Hi">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_tooltip.png"
                    }
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
                        src={
                          process.env.PUBLIC_URL +
                          "/public_assets/img/global/ico/ico_ex.png"
                        }
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
              value={2}
              onClick={btnStep}
              className={styles.btnStep}
            >
              <span data-selected={modalStep == 2 ? "selected" : null}>
                지역
              </span>
            </button>
          </li>
        </ul>
        <div className={styles.contArea}>
          <ul>
            {data2[modalStep].data.map((cate, idx) => {
              return (
                <li className={styles.tabCont} key={cate.name}>
                  <div className={styles.title}>
                    <h5 className={cate.required ? styles.required : null}>
                      {cate.name}
                    </h5>
                    {cate.multiply && (
                      <span className={styles.multiply}>(중복가능)</span>
                    )}
                  </div>
                  <ol className={styles.itemWrap}>
                    {cate.btns.map((btn, idx2) => {
                      const infoName = cate.infoName;
                      let clicked;
                      // console.log(selectedItems[infoName].some((item)=>item.text ));
                      cate.multiply
                        ? (clicked = modalData[infoName].some(
                            (item) => item.text == btn.value
                          ))
                        : (clicked = modalData[infoName].text == btn.value);
                      return (
                        <li
                          className={styles.item}
                          key={btn.value}
                          data-hasTooltip={btn.hasTooltip ? true : null}
                        >
                          <button
                            type="button"
                            name={cate.name}
                            value={btn.value}
                            data-clicked={clicked}
                            data-disabled={
                              !isLoggedIn && idx2 != 0 ? "disabled" : null
                            }
                            onClick={(e) => {
                              modalBtnClick(
                                e,
                                infoName,
                                btn.order,
                                cate.required
                              );
                            }}
                          >
                            {btn.text}
                          </button>
                          {btn.hasTooltip && (
                            <i className="btnToolTip" onClick={tooltipOpen}>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/public_assets/img/global/btn/btn_tooltip.png"
                                }
                                alt="tooltip"
                              />
                              <Tooltip cont={btn.tooltipCont} />
                            </i>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`confirmArea ${styles.confirmArea}`}>
          <button
            type="button"
            name="Modal1"
            className={styles.btnClose}
            value={false}
            onClick={modalOpener}
          >
            닫기
          </button>
          <button
            type="button"
            className={styles.btnSubmit}
            onClick={modalDataSubmit}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
