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
const Home = ({}) => {
  const [modalOn, setModalOn] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const [homeSelect, setHomeSelect] = useState([]);
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
    if (modalOn) {
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;
      `;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
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
            <HomeCommunity />
            <CountArea />
          </div>
          <HomeSupport />
        </div>
      </div>
    </>
  );
};
export default Home;
