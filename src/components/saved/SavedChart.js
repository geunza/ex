import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "scss/components/saved/SavedChart.module.scss";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);
const SavedChart = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [doughnutTimer, setDoughnutTimer] = useState(0);
  const [doughnutList, setDoughnutList] = useState([]);
  const [doughnutColors, setDoughnutColors] = useState([]);
  const [doughnutLabels, setDoughnutLabels] = useState([]);
  const [doughnutCounts, setDoughnutCounts] = useState([]);
  const [makeDoughnut, setMakeDoughnut] = useState(false);
  const [doughnutdata, setDoughnutdata] = useState({});
  const getDoughnutList = () => {
    axios({
      url: "/saved/getCatList",
      method: "POST",
      headers: {
        user_id: userInfo.id,
      },
    }).then((res) => {
      setDoughnutList(dataOrder(res.data));
    });
  };

  useEffect(() => {
    setDoughnutColors(() => doughnutList.map((v) => v.color));
    setDoughnutCounts(() => doughnutList.map((v) => v.count));
    setDoughnutLabels(() => doughnutList.map((v) => v.target_cat_name));
  }, [doughnutList]);
  useEffect(() => {
    setDoughnutdata({
      labels: doughnutLabels,
      datasets: [
        {
          data: doughnutCounts,
          backgroundColor: doughnutColors,
        },
      ],
      borderWidth: 0,
    });
    setDoughnutTimer((prev) => prev + 1);
  }, [doughnutColors, doughnutCounts, doughnutLabels]);
  useEffect(() => {
    doughnutTimer == 3 && setMakeDoughnut(true);
  }, [doughnutTimer]);
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
  const doughnutOpts = {
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          boxWidth: 20,
          boxHeight: 20,
          padding: 10,
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      datalabels: {
        anchor: "center", //start , end
        align: "center", //top bottom middle 데이터 라벨 표시 위치
        color: "#fff",
        font: {
          size: 16,
          weight: 700,
        },
        formatter: function (value, context) {
          return value;
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const [barTimer, setBarTimer] = useState(0);
  const [barList, setBarList] = useState([
    { name: "찜", count: 0, color: "#30d6c2" },
    { name: "지원", count: 0, color: "#c0cbd5" },
    { name: "선정", count: 0, color: "#c0cbd5" },
  ]);

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
  useEffect(() => {
    console.log(barList);
  }, [barList]);

  useEffect(() => {
    getDoughnutList();
    getBarList();
  }, [isLoggedIn]);

  const barOpts = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const barData = {
    labels: ["라벨1", "라벨2", "라벨3"],
    datasets: [
      {
        data: [1, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className={styles.chartWrap}>
      <div className={`${styles.chartArea} ${styles.doughtnut}`}>
        <p className={styles.title}>찜 분류</p>
        {makeDoughnut && (
          <div className={styles.canvasArea}>
            <Doughnut data={doughnutdata} options={doughnutOpts} />
          </div>
        )}
        <div className={styles.legendArea}>
          {doughnutList.map((item, idx) => {
            return (
              <p key={item.target_cat_name}>
                <span
                  className={styles.circle}
                  style={{
                    backgroundColor: item.color,
                  }}
                ></span>
                <span className={styles.name}>{item.target_cat_name}</span>
              </p>
            );
          })}
        </div>
      </div>
      <div className={`${styles.chartArea} ${styles.bar}`}>
        <p className={styles.title}>찜 현황</p>
        {makeDoughnut && (
          <div className={styles.canvasArea}>
            <Bar data={barData} options={barOpts} />
          </div>
        )}
        {/* <div className={styles.legendArea}>
          {doughnutList.map((item, idx) => {
            return (
              <p key={item.target_cat_name}>
                <span
                  className={styles.circle}
                  style={{
                    backgroundColor: item.color,
                  }}
                ></span>
                <span className={styles.name}>{item.target_cat_name}</span>
              </p>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};
export default SavedChart;
