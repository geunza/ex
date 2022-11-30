import React, { useState } from "react";
import styles from "scss/components/Modal.module.scss";
import supportData1 from "db/supportData1";
import supportData2 from "db/supportData2";
const FilterModal = ({
  currentModal,
  dummyInfo,
  infoBtnClick,
  modalClose,
  modalSubmit,
}) => {
  return (
    <div className={`${styles.FilterModal} ${styles.modalWrap}`}>
      <div className={styles.modalInner}>
        <ul>
          {supportData1
            .filter((item) => item.infoName == currentModal)
            .map((v, i) => {
              return (
                <li className={styles.itemWrap}>
                  <h5 className={v.required ? styles.required : null}>
                    {v.name}
                    {v.multiply && (
                      <span className={styles.multiply}>(중복선택가능)</span>
                    )}
                  </h5>
                  <ol>
                    {v.btns.map((v2, i2) => {
                      const infoName = v.infoName;

                      const multiply = v.multiply;
                      const order = v2.order;
                      const required = v.required;
                      let clicked;
                      const target = dummyInfo[v.infoName];
                      if (Array.isArray(target)) {
                        if (target.some((item) => item.text == v2.value)) {
                          clicked = true;
                        }
                      } else {
                        console.log(target.text);
                        clicked = target.text == v2.value;
                      }
                      return (
                        <li key={v2.text}>
                          <button
                            data-clicked={clicked}
                            value={v2.value}
                            onClick={(e) => {
                              infoBtnClick(
                                e,
                                infoName,
                                multiply,
                                order,
                                required
                              );
                            }}
                          >
                            {v2.text}
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              );
            })}
          {supportData2
            .filter((item) => item.name == currentModal)
            .map((v, i) => {
              return v.data.map((v2, i2) => {
                return (
                  <li className={styles.itemWrap}>
                    <h5>{v2.name}</h5>
                    <ol>
                      {v2.btns.map((v3, i3) => {
                        const infoName = v2.infoName;
                        const multiply = v2.multiply;
                        const order = v3.order;
                        const required = v2.required;
                        let clicked;
                        const target = dummyInfo[v2.infoName];
                        if (Array.isArray(target)) {
                          if (target.some((item) => item.text == v3.value)) {
                            clicked = true;
                          }
                        } else {
                          console.log(target.text);
                          clicked = target.text == v3.value;
                        }
                        return (
                          <li key={v3.text}>
                            <button
                              data-clicked={clicked}
                              value={v3.value}
                              onClick={(e) => {
                                infoBtnClick(
                                  e,
                                  infoName,
                                  multiply,
                                  order,
                                  required
                                );
                              }}
                            >
                              {v3.text}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </li>
                );
              });
            })}
        </ul>

        <div className={`confirmArea ${styles.confirmArea}`}>
          <button
            type="button"
            className={styles.btnClose}
            onClick={() => {
              modalClose();
            }}
          >
            닫기
          </button>
          <button
            type="button"
            className={styles.btnSubmit}
            onClick={() => {
              modalSubmit();
            }}
          >
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
