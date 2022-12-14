import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "scss/components/Modal.module.scss";
import axios from "axios";
const NeedModal = ({ setModalOn }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [userNeed, setUserNeed] = useState({});
  const [needObj, setNeedObj] = useState({
    financing: [],
    team_building: [],
    etc: [],
  });
  const [idx, setIdx] = useState(0);
  const btnClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    let copy = { ...needObj };
    if (copy[name].some((item) => item == value)) {
      copy[name] = copy[name].filter((item) => item != value);
    } else {
      copy[name] = [...copy[name], value].sort((a, b) => {
        if (b > a) return -1;
        else if (a > b) return 1;
        else return 0;
      });
    }
    setNeedObj(copy);
  };
  const getUserNeed = () => {
    axios({
      url: "/saved/getUserNeed",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    })
      .then((res) => {
        const data = res.data;
        let copy = { ...needObj };
        for (let key in data) {
          if (key == "idx") {
            setIdx(data[key]);
          } else {
            const string = data[key].replaceAll(" ", "");
            const arr = string.split(",");
            copy[key] = arr;
            setNeedObj(copy);
          }
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const needSubmit = (e) => {
    if (idx >= 0) {
      axios({
        url: "/saved/updateUserNeed",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: {
          idx: idx,
          financing: needObj.financing.toString(),
          team_building: needObj.team_building.toString(),
          etc: needObj.etc.toString(),
        },
      })
        .then((res) => {
          console.log(res.data);
          setModalOn(false);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    } else {
      axios({
        url: "/saved/updateUserNeed",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: {
          financing: needObj.financing.toString(),
          team_building: needObj.team_building.toString(),
          etc: needObj.etc.toString(),
        },
      })
        .then((res) => {
          setModalOn(false);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  };
  useEffect(() => {
    getUserNeed();
  }, []);
  return (
    <div className={`${styles.modalWrap} ${styles.NeedModal}`}>
      <div className={styles.modalInner} style={{ maxWidth: "500px" }}>
        <div>
          <div className={styles.modalTop}>
            <div className={styles.tit}>
              <img
                priority="true"
                src={require("assets/img/global/ico/ico_need.png")}
                alt="???????????? ????????????"
              />
              <p>?????? ????????? ????????? ??????!</p>
            </div>
            <button
              type="button"
              value={false}
              onClick={() => {
                setModalOn(false);
              }}
              className={styles.btn_close}
            >
              <img
                priority="true"
                src={require("assets/img/global/btn/btn_close_black.png")}
                alt="??????"
              />
            </button>
          </div>
          <div className={styles.modalCont}>
            <p className={styles.subTit}>
              <span>
                ?????? <mark>???????????? ?????? ?????? ??????</mark>??? ????????? ????????? ?????????
                ????????????.
              </span>
            </p>
            <div className={styles.flexList}>
              <div className={styles.flexItem}>
                <h4 className={styles.flexTitle}>????????????</h4>
                <ul className={styles.commonList}>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="financing"
                      value="fin_1"
                      onClick={btnClick}
                      className={
                        needObj.financing.includes("fin_1")
                          ? styles.active
                          : null
                      }
                    >
                      ???????????????/IR??? ??????
                    </button>
                  </li>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="financing"
                      value="fin_2"
                      onClick={btnClick}
                      className={
                        needObj.financing.includes("fin_2")
                          ? styles.active
                          : null
                      }
                    >
                      ????????????
                    </button>
                  </li>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="financing"
                      value="fin_3"
                      onClick={btnClick}
                      className={
                        needObj.financing.includes("fin_3")
                          ? styles.active
                          : null
                      }
                    >
                      ??????/??????
                    </button>
                  </li>
                </ul>
              </div>
              <div className={styles.flexItem}>
                <h4 className={styles.flexTitle}>??? ??????</h4>
                <ul className={styles.commonList}>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="team_building"
                      value="team_1"
                      onClick={btnClick}
                      className={
                        needObj.team_building.includes("team_1")
                          ? styles.active
                          : null
                      }
                    >
                      ?????????/PM
                    </button>
                  </li>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="team_building"
                      value="team_2"
                      onClick={btnClick}
                      className={
                        needObj.team_building.includes("team_2")
                          ? styles.active
                          : null
                      }
                    >
                      ????????????
                    </button>
                  </li>
                  <li className={styles.item}>
                    <button
                      type="button"
                      name="team_building"
                      value="team_3"
                      onClick={btnClick}
                      className={
                        needObj.team_building.includes("team_3")
                          ? styles.active
                          : null
                      }
                    >
                      ?????????
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className={styles.flexTitle}>??????</h4>
              <ul className={`${styles.commonList} ${styles.flexList}`}>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_1"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_1") ? styles.active : null
                    }
                  >
                    ???????????? ??????
                  </button>
                </li>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_2"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_2") ? styles.active : null
                    }
                  >
                    ???????????? ????????????
                  </button>
                </li>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_3"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_3") ? styles.active : null
                    }
                  >
                    ????????? ??????
                  </button>
                </li>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_4"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_4") ? styles.active : null
                    }
                  >
                    ????????? ???????????????
                  </button>
                </li>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_5"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_5") ? styles.active : null
                    }
                  >
                    ?????? ???(SaaS)
                  </button>
                </li>
                <li className={`${styles.item} ${styles.flexItem}`}>
                  <button
                    type="button"
                    name="etc"
                    value="etc_6"
                    onClick={btnClick}
                    className={
                      needObj.etc.includes("etc_6") ? styles.active : null
                    }
                  >
                    ????????? ??????
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.modalSubmit}>
            <button type="button" onClick={needSubmit}>
              ??????
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NeedModal;
