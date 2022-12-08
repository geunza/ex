import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SavedTitle from "components/saved/SavedTitle";
import SavedCategory from "components/saved/SavedCategory";
import RecentCont from "components/saved/RecentCont";
import ApplyCont from "components/saved/ApplyCont";
import MyCont from "components/saved/MyCont";
import SavedChart from "components/saved/SavedChart";
import styles from "scss/pages/SavedWrap.module.scss";
import axios from "axios";
const SavedWrap = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [ord, setOrd] = useState("");
  const [cate, setCate] = useState("");
  useEffect(() => {
    if (searchParams.get("ord") == null) {
      setOrd("전체");
    } else {
      setOrd(searchParams.get("ord"));
    }
    if (searchParams.get("cate") == null) {
      setCate("save");
    } else {
      setCate(searchParams.get("cate"));
    }
  }, [searchParams]);

  const [doughnutList, setDoughnutList] = useState([]);
  const [barList, setBarList] = useState([
    { name: "찜", count: 0, color: "#30d6c2" },
    { name: "지원", count: 0, color: "#c0cbd5" },
    { name: "선정", count: 0, color: "#c0cbd5" },
  ]);
  const getDoughnutList = () => {
    axios({
      url: "/saved/getCatList",
      method: "POST",
      headers: {
        user_id: userInfo.id,
        // user_id: 2379586568,
      },
    })
      .then((res) => {
        setDoughnutList(dataOrder(res.data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getBarList = () => {
    barList.forEach((v, i) => {
      const name = v.name;
      axios({
        url: "/saved/getMySavedBook",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
        data: {
          cat: name,
        },
      }).then((res) => {
        const data = res.data;
        const count = data.length;
        let copy = [...barList];
        copy.filter((item) => item.name == name)[0].count = count;
        setBarList(copy);
      });
    });
  };
  function dataOrder(arr) {
    let newArr = [...arr].map((v, i) => {
      const name = v.target_cat_name;
      if (name == "사업화지원") {
        v.order = 1;
        v.color = "#00d9a6";
      }
      if (name == "인건비지원") {
        v.order = 2;
        v.color = "#7790fa";
      }
      if (name == "행사") {
        v.order = 3;
        v.color = "#fed51f";
      }
      if (name == "마케팅홍보") {
        v.order = 4;
        v.color = "#ff6565";
      }
      if (name == "시설공간") {
        v.order = 5;
        v.color = "#c0cbd5";
      }
      if (name == "기타") {
        v.order = 6;
        v.color = "#c777fa";
      }
      return v;
    });
    newArr = newArr.sort((a, b) => {
      return a.order - b.order;
    });
    return newArr;
  }
  return (
    <div className={styles.SavedRecent}>
      <SavedTitle />
      <div className={`inner ${styles.savedCont}`}>
        <div className={styles.leftArea}>
          <SavedCategory cate={cate} />
          <div className={styles.savedItemsWrap}>
            {cate == "recent" && (
              <RecentCont
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
              />
            )}
            {cate == "save" && (
              <MyCont
                cate={cate}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
              />
            )}
            {cate == "apply" && (
              <ApplyCont
                cate={cate}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
              />
            )}
          </div>
        </div>
        <div className={styles.rightArea}>
          <SavedChart
            doughnutList={doughnutList}
            setDoughnutList={setDoughnutList}
            getDoughnutList={getDoughnutList}
            barList={barList}
            setBarList={setBarList}
            getBarList={getBarList}
          />
        </div>
      </div>
    </div>
  );
};
export default SavedWrap;