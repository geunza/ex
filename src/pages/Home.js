import React, { useEffect, useState } from "react";
import CountArea from "components/home/CountArea";
import SnsLogin from "components/home/LoginArea";
import Banner from "components/ImageBanner";
import Event from "components/home/Event";
import Filter from "components/home/Filter";
import HomeCommunity from "components/home/HomeCommunity";
import HomeSupport from "components/home/HomeSupport";
import EventModal from "components/home/EventModal";
import Loading from "components/Loading";
import styles from "scss/pages/Home.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart, modalOverflow } from "redux/store";
const Home = ({}) => {
  const dispatch = useDispatch();
  const [axiosCount, setAxiosCount] = useState(0);
  const [modalOn, setModalOn] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const modalOpener = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    const isTrue = value == "true";
    // name, value, target
    setModalOn(isTrue);
    if (name === "Modal1") {
      setModal1(isTrue);
    } else if (name === "Modal2") {
      setModal2(isTrue);
    }
  };
  useEffect(() => {
    dispatch(loadingStart());
  }, []);
  useEffect(() => {
    if (axiosCount == 3) {
      dispatch(loadingEnd());
    }
  }, [axiosCount]);
  useEffect(() => {
    dispatch(modalOverflow(modalOn));
  }, [modalOn]);
  return (
    <>
      <div className={styles.Home}>
        <section className={styles.sec01}>
          <div className={`inner ${styles.inner}`}>
            <SnsLogin />
            <Banner />
            <Event
              setModalOn={setModalOn}
              modalOn={modalOn}
              modalOpener={modalOpener}
              Modal2={Modal2}
            />
          </div>
        </section>
        <div className={`inner ${styles.inner}`}>
          <Filter
            modalOpener={modalOpener}
            setModalOn={setModalOn}
            modalOn={modalOn}
            Modal1={Modal1}
          />
          <div className={styles.sec02}>
            <HomeCommunity setAxiosCount={setAxiosCount} />
            <CountArea setAxiosCount={setAxiosCount} />
          </div>
          <HomeSupport setAxiosCount={setAxiosCount} />
        </div>
      </div>
    </>
  );
};
export default Home;
