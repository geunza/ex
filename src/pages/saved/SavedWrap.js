import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SavedTitle from "components/saved/SavedTitle";
import SavedCategory from "components/saved/SavedCategory";
import RecentCont from "components/saved/RecentCont";
import ApplyCont from "components/saved/ApplyCont";
import MyCont from "components/saved/MyCont";
import SavedChart from "components/saved/SavedChart";
import styles from "scss/pages/Saved.module.scss";
import axios from "axios";
import { loadingEnd } from "redux/store";
import MobileTitle from "components/MobileTitle";
const SavedWrap = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [ord, setOrd] = useState("");
  const [cate, setCate] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState({});
  const [mobilePage, setMobilePage] = useState(1);
  const [mobileMore, setMobileMore] = useState(true);
  const [lastCheckTarget, setLastCheckTarget] = useState(null);
  let count = 10;
  useEffect(() => {
    let baseCount = 0;
    cate == "recent"
      ? (baseCount = totalCount.view_cnt)
      : cate == "save"
      ? (baseCount = totalCount.save_cnt)
      : (baseCount = totalCount.done_cnt);
    if (isMobile) {
      if (count * mobilePage > baseCount) {
        setMobileMore(false);
      } else {
        setMobileMore(true);
      }
    }
  }, [mobilePage, cate]);
  function handleMobilePage() {
    setMobilePage(parseInt(sessionStorage.getItem("saved_mo_page")));
  }
  let infiniteState = true;
  const listener = () => {
    if (lastCheckTarget) {
      if (infiniteState) {
        const yPos = window.scrollY;
        const yHeight = window.innerHeight;
        const targetPos = lastCheckTarget.getBoundingClientRect().top;
        const trigger = targetPos - yHeight + 100;
        if (trigger < 0) {
          infiniteState = false;
          let mobilePage = sessionStorage.getItem("saved_mo_page");
          if (mobilePage == null) {
            sessionStorage.setItem("saved_mo_page", 2);
          } else {
            sessionStorage.setItem("saved_mo_page", parseInt(mobilePage) + 1);
          }
          handleMobilePage();
          setTimeout(() => {
            infiniteState = true;
          }, 500);
        }
      }
    }
  };
  useEffect(() => {
    if (lastCheckTarget) {
      window.addEventListener("scroll", listener);
    }
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [lastCheckTarget]);

  function decode(txt) {
    return decodeURI(txt);
  }

  const getTotalCount = () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      method: "POST",
      url: "/saved/getTotalCountList",
    }).then((res) => {
      setTotalCount(res.data);
    });
  };
  const [doughnutList, setDoughnutList] = useState([]);
  const [barList, setBarList] = useState([
    { cate: "save_cnt", name: "찜", count: 0, color: "#30d6c2" },
    { cate: "req_cnt", name: "지원", count: 0, color: "#c0cbd5" },
    { cate: "done_cnt", name: "선정", count: 0, color: "#c0cbd5" },
  ]);

  let baseCatName = [
    { code: "01", name: "전체", order: 1, color: "#00d9a6" },
    { code: "02", name: "사업화 지원", order: 2, color: "#7790fa" },
    { code: "03", name: "시설공간", order: 3, color: "#fed51f" },
    { code: "04", name: "인건비 지원", order: 4, color: "#ff6565" },
    { code: "05", name: "마케팅 홍보", order: 5, color: "#c0cbd5" },
    { code: "06", name: "멘토링・교육", order: 6, color: "#6633ff" },
    { code: "07", name: "R&D", order: 7, color: "#0066cc" },
    { code: "08", name: "행사", order: 8, color: "#cc6600" },
    { code: "09", name: "기타", order: 9, color: "#c777fa" },
  ];
  const getDoughnutList = () => {
    axios({
      url: "/saved/getCatList",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    })
      .then((res) => {
        const data = res.data;
        let target = data.find((x) => x.target_cat_name == "기타");
        if (target == undefined) {
          data.push({
            target_cat_name: "기타",
            count: 0,
          });
          target = data.find((x) => x.target_cat_name == "기타");
        }
        for (let i = data.length - 1; i >= 0; i--) {
          if (!baseCatName.some((x) => x.code == data[i].target_cat_name)) {
            target.count += data[i].count;
            data.splice(i, 1);
          }
        }
        setDoughnutList(dataOrder(data));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const getBarList = () => {
    barList.forEach((v, i) => {
      const name = v.name;
      axios({
        url: "/saved/getSavedTotalCount",
        method: "POST",
        headers: {
          user_id: userInfo.id,
        },
      }).then((res) => {
        const data = res.data;
        const count = data.length;
        let copy = [...barList];
        for (let key in data) {
          copy.find((item) => item.cate == key).count = data[key];
        }
        setBarList(copy);
      });
    });
  };
  function dataOrder(arr) {
    let newArr = [...arr].map((v, i) => {
      const name = v.target_cat_name;
      let obj = baseCatName.find((x) => x.code == name);
      v.order = obj.order;
      v.color = obj.color;
      v.name = obj.name;
      return v;
    });
    newArr = newArr.sort((a, b) => {
      return a.order - b.order;
    });
    return newArr;
  }

  useEffect(() => {
    const searchTxt = location.search;
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.cate == undefined) {
      setCate("save");
    } else {
      setCate(searchObj.cate);
    }
    if (searchObj.ord == undefined) {
      setOrd("전체");
    } else {
      setOrd(searchObj.ord);
    }
    if (searchObj.page == undefined) {
      setPage(1);
    } else {
      setPage(parseInt(searchObj.page));
    }
    setMobilePage(1);
    sessionStorage.removeItem("saved_mo_page");
  }, [location]);

  const [compoMount, setCompoMount] = useState(false);
  useEffect(() => {
    if (compoMount) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);
  useEffect(() => {
    setCompoMount(true);
  }, []);
  return (
    <div className={styles.SavedRecent}>
      <MobileTitle title={"찜"} />
      <SavedTitle />
      <div className={`inner ${styles.savedCont}`}>
        <div className={styles.leftArea}>
          <SavedCategory
            cate={cate}
            getTotalCount={getTotalCount}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
          />
          <div className={styles.savedItemsWrap}>
            {cate == "recent" && (
              <RecentCont
                ord={ord}
                setOrd={setOrd}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
                getTotalCount={getTotalCount}
                count={count}
                page={page}
                mobilePage={mobilePage}
              />
            )}
            {cate == "save" && (
              <MyCont
                cate={cate}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
                getTotalCount={getTotalCount}
                count={count}
                page={page}
                mobilePage={mobilePage}
              />
            )}
            {cate == "apply" && (
              <ApplyCont
                cate={cate}
                ord={ord}
                getDoughnutList={getDoughnutList}
                getBarList={getBarList}
                count={count}
                page={page}
                mobilePage={mobilePage}
              />
            )}
          </div>
          {isMobile && mobileMore ? (
            <div
              ref={setLastCheckTarget}
              className="lastCheckDiv"
              style={{
                display: isMobile ? "block" : "none",
                width: "50px",
                height: "50px",
                padding: "50px",
                background: "blue",
                color: "#fff",
                fontSize: 0,
                opacity: 0,
              }}
            >
              LOADMORE TRIGGER
            </div>
          ) : null}
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
