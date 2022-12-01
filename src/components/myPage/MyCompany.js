import React, { useState, useEffect } from "react";
import FilterButton from "components/home/FilterButton";
import styles from "scss/pages/MyPage.module.scss";
import supportData1 from "db/supportData1";
import supportData2 from "db/supportData2";
import { useDispatch, useSelector } from "react-redux";
import { setSupportInfo } from "redux/store/supportInfoSlice";
import axios from "axios";
const MyCompany = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedItems, setSelectedItems] = useState(supportInfo);
  const [modalStep, setModalStep] = useState(0);
  const infoBtnClick = (e, infoName, multiply, order, required) => {
    const {
      target: { value },
    } = e;
    if (!isLoggedIn) {
      alert("로그인X");
      return false;
    }
    dispatch(
      setSupportInfo({
        name: infoName,
        value: value,
        multiply: multiply,
        order: order,
        required: required,
      })
    );
  };
  const getCd = (cate) => {
    axios({
      method: "POST",
      url: `/common/codeDtlList?ctgCd=${cate}`,
    }).then((res) => {
      console.log(res.data);
      return res.data;
    });
  };
  useEffect(() => {
    setData1(supportData1);

    setData2(supportData2);
  }, []);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <ul>
        {data1.map((v, i) => {
          return (
            <li>
              <FilterButton
                key={v.name}
                v={v}
                i={i}
                styles={styles}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                infoBtnClick={infoBtnClick}
              />
            </li>
          );
        })}
        <li className={styles.sltItem}>
          {data2.map((v, i) => {
            return (
              <div key={i}>
                <p>{v.name}</p>
                <ol>
                  <li>
                    <button
                      type="button"
                      name="Modal1"
                      value={true}
                      onClick={(e) => {
                        if (!isLoggedIn) {
                          alert("로그인이 필요합니다.");
                          return false;
                        }
                        setModalStep(i);
                      }}
                    >
                      {selectedItems[v.data[v.data.length - 1].infoName]
                        .length > 1
                        ? `${
                            selectedItems[v.data[v.data.length - 1].infoName][0]
                              .text
                          } 외 ${
                            selectedItems[v.data[v.data.length - 1].infoName]
                              .length - 1
                          }건`
                        : selectedItems[v.data[v.data.length - 1].infoName]
                            .length == 1
                        ? `${
                            selectedItems[v.data[v.data.length - 1].infoName][0]
                              .text
                          }`
                        : "없어용"}
                    </button>
                  </li>
                </ol>
              </div>
            );
          })}
        </li>
      </ul>
    </form>
  );
};
export default MyCompany;
