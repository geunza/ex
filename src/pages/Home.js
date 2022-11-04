import React, { useEffect, useState } from "react";
import CountArea from "components/Home/CountArea";
import SnsLogin from "components/Home/LoginArea";
import Banner from "components/ImageBanner";
import Event from "components/Home/Event";
import Filter from "components/Home/Filter";
import HomeCommunity from "components/Home/HomeCommunity";
import HomeSupport from "components/Home/HomeSupport";
import EventModal from "components/Home/EventModal";
import styles from "scss/pages/Home.module.scss";
import axios from "axios";
const Home = ({}) => {
  const [modalOn, setModalOn] = useState(false);
  const [Modal1, setModal1] = useState(false);
  const [Modal2, setModal2] = useState(false);
  const [homeSelect, setHomeSelect] = useState([]);
  const modalOpener = (e) => {
    const {
      target: { name, value },
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
        <CountArea />
        <section className={styles.sec01}>
          <SnsLogin />
          <Banner />
          <Event />
        </section>
        <Filter
          modalOpener={modalOpener}
          setModalOn={setModalOn}
          modalOn={modalOn}
          Modal1={Modal1}
        />
        <HomeCommunity />
        <HomeSupport />
        {modalOn && Modal2 ? (
          <EventModal
            setModalOn={setModalOn}
            modalOn={modalOn}
            modalOpener={modalOpener}
            Modal2={Modal2}
          />
        ) : null}
      </div>
    </>
  );
};
export default Home;
