import React from "react";
import styles from "scss/components/support/SupportFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo, setSupportInfoModal } from "store/supportInfoSlice";
import { useEffect, useState } from "react";
import supportData1 from "db/supportData1";
import supportData2 from "db/supportData2";
import { current } from "@reduxjs/toolkit";
import { modalOverflow } from "store";
const SupportFilter = ({ supportInfo }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [supportInfoArr, setSupportInfoArr] = useState([]);
  const [currentModal, setCurrentModal] = useState("지원분야");
  const [modalOn, setModalOn] = useState(false);
  const [dummyInfo, setDummyInfo] = useState({ ...supportInfo });
  const modalControl = (boo, name = "") => {
    setCurrentModal(name);
    setModalOn(boo);
    dispatch(modalOverflow(boo));
  };
  const infoBtnClick = (e, infoName, multiply, order, required) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return false;
    }
    const obj = { ...dummyInfo };
    if (multiply) {
      if (obj[infoName].some((item) => item.text == value)) {
        if (multiply && obj[infoName].length == 1 && required) {
          alert("한가지 이상 선택해주세요.");
        } else {
          obj[infoName] = obj[infoName].filter((item) => item.text != value);
        }
      } else {
        obj[infoName] = [...obj[infoName], { text: value, order: order }].sort(
          (a, b) => a.order - b.order
        );
      }
    } else {
      obj[infoName] = { text: value, order: order };
    }
    setDummyInfo(obj);

    /*
        dispatch(
          setSupportInfo({
            name: infoName,
            value: value,
            multiply: multiply,
            order: order,
          })
        );*/
  };

  const modalClose = () => {
    setDummyInfo({ ...supportInfo });
    modalControl(false);
  };
  const modalSubmit = () => {
    dispatch(setSupportInfoModal({ ...dummyInfo }));
    modalControl(false);
  };
  useEffect(() => {
    let arr = [];
    for (let data in supportInfo) {
      if (data == "사업분야") continue;
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
                  <button
                    type="button"
                    onClick={() => {
                      isLoggedIn
                        ? modalControl(true, item.name)
                        : alert("로그인이 필요합니다.");
                    }}
                  >
                    <div className={styles.itemTit}>
                      <span>{item.name}</span>
                      <div className={styles.arr}>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/public_assets/img/global/btn/btn_arr.png"
                          }
                          alt="Select"
                        />
                      </div>
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
                  </button>
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
      {modalOn && (
        <div className={`${styles.supportModal} modalWrap`}>
          <div className="modalInner">
            <ul>
              {supportData1
                .filter((item) => item.infoName == currentModal)
                .map((v, i) => {
                  return (
                    <li className={styles.itemWrap}>
                      <h5 className={v.required ? styles.required : null}>
                        {v.name}
                        {v.multiply && (
                          <span className={styles.multiply}>
                            (중복선택가능)
                          </span>
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
                              if (
                                target.some((item) => item.text == v3.value)
                              ) {
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
      )}
    </>
  );
};
export default SupportFilter;
