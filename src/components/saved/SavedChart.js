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
import styles from "scss/pages/Saved.module.scss";
import EventModal from "components/home/EventModal";
import NeedModal from "components/saved/NeedModal";
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);
const SavedChart = ({
  doughnutList,
  setDoughnutList,
  getDoughnutList,
  barList,
  setBarList,
  getBarList,
}) => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [doughnutTimer, setDoughnutTimer] = useState(false);
  const [doughnutdata, setDoughnutdata] = useState({});
  const [doughnutSum, setDoughnutSum] = useState(0);
  useEffect(() => {
    setDoughnutSum(0);
    doughnutList.forEach((v) => {
      setDoughnutSum((prev) => (prev += v.count));
    });
    setDoughnutdata({
      labels: doughnutList.map((v) => v.target_cat_name),
      datasets: [
        {
          data: doughnutList.map((v) => v.count),
          backgroundColor: doughnutList.map((v) => v.color),
        },
      ],
      borderWidth: 0,
    });
  }, [doughnutList]);
  useEffect(() => {
    setDoughnutTimer(true);
  }, [doughnutdata]);
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

  const [barTimer, setBarTimer] = useState(false);
  const [barData, setBarData] = useState({});

  useEffect(() => {
    setBarData({
      labels: barList.map((v) => v.name),
      datasets: [
        {
          data: barList.map((v) => v.count),
          backgroundColor: barList.map((v) => v.color),
          borderRadius: 5,
          barPercentage: 0.6,
          borderSkipped: false,
        },
      ],
    });
  }, [barList]);
  useEffect(() => {
    setBarTimer(true);
  }, [barData]);
  useEffect(() => {
    getDoughnutList();
    getBarList();
  }, [userInfo]);

  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        stacked: true,
        grid: {
          display: false,
        },
      },

      x: {
        // display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
        position: "bottom",
        labels: {
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
          size: 14,
          weight: 700,
          color: "#222222",
        },
        formatter: function (value, context) {
          if (value == 0) {
            return "";
          }
          return value;
        },
      },
    },
  };

  const [modalTab, setModalTab] = useState(0);
  const modalTabControl = (e) => {
    const {
      currentTarget: {
        dataset: { tab },
      },
    } = e;
    setModalTab(tab);
  };
  const modalOpener = (e) => {
    const {
      target: { value },
    } = e;
    setModalOn(value);
  };
  const [currentModal, setCurrentModal] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  return (
    <div className={styles.ChartWrap}>
      <div className={`${styles.chartArea} ${styles.doughtnut}`}>
        <p className={styles.title}>찜 분류</p>
        {doughnutSum == 0 ? (
          <div className="empty">
            <span>관심사업을 찜하면</span>
            <span>분류가 제공됩니다.</span>
          </div>
        ) : (
          doughnutTimer && (
            <>
              <div className={styles.canvasArea}>
                <Doughnut data={doughnutdata} options={doughnutOpts} />
              </div>
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
                      <span className={styles.name}>
                        {item.target_cat_name}
                      </span>
                    </p>
                  );
                })}
              </div>
            </>
          )
        )}
      </div>
      <div className={`${styles.chartArea} ${styles.bar}`}>
        <p className={styles.title}>찜 현황</p>
        {barTimer && (
          <div className={styles.canvasArea}>
            <Bar data={barData} options={barOpts} />
          </div>
        )}
      </div>
      <div className={`${styles.boxItem}`}>
        <button
          className={styles.openModal}
          type="button"
          name="Modal1"
          value={true}
          onClick={(e) => {
            setCurrentModal(0);
            setModalOn(true);
          }}
        >
          <div className={styles.imgArea}>
            <img
              src={require("assets/img/home/event_modal_01.png")}
              alt="이메일 정기배송 신청"
            />
          </div>
          <div className={styles.txtArea}>
            <p className={styles.subTit}>이메일 정기배송 신청</p>
            <p className={styles.para}>
              <img
                src={require("assets/img/global/ico/ico_mark.png")}
                alt="느낌표"
              />
              <span>주 1회 지원 사업 메일을 전달드려요!</span>
            </p>
          </div>
        </button>
        {modalOn && currentModal == 0 && (
          <EventModal modalTab={0} modalOpener={modalOpener} />
        )}
      </div>
      <div className={`${styles.boxItem}`}>
        <button
          className={styles.openModal}
          type="button"
          name="Modal2"
          value={true}
          data-tab={0}
          onClick={(e) => {
            setCurrentModal(1);
            setModalOn(true);
          }}
        >
          <div className={styles.imgArea}>
            <img
              src={require("assets/img/global/ico/ico_need.png")}
              alt="우리 회사에 필요한 이것"
            />
          </div>
          <div className={styles.txtArea}>
            <p className={styles.subTit}>우리 회사에 필요한 이것!</p>
            <p className={styles.para}>
              <img
                src={require("assets/img/global/ico/ico_mark.png")}
                alt="느낌표"
              />
              <span>엑시토에서 도와드릴게요.</span>
            </p>
          </div>
        </button>
        {modalOn && currentModal == 1 && <NeedModal setModalOn={setModalOn} />}
      </div>
    </div>
  );
};
export default SavedChart;
