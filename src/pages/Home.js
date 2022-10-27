import React, { useEffect, useState } from "react";
import CountArea from "components/Home/CountArea";
import SnsLogin from "components/Home/LoginArea";
import Banner from "components/MainBanner";
import Event from "components/Home/Event";
import Filter from "components/Home/Filter";
import HomeCommunity from "components/Home/HomeCommunity";
import HomeSupport from "components/Home/HomeSupport";

import styles from "scss/pages/Home.module.scss";

import axios from "axios";
const Home = ({ isLoggedIn }) => {
  return (
    <>
      <div className={styles.Home}>
        <CountArea />
        <section className={styles.sec01}>
          <SnsLogin isLoggedIn={isLoggedIn} />
          <Banner />
          <Event />
        </section>
        <Filter isLoggedIn={isLoggedIn} />
        <HomeCommunity />
        <HomeSupport />
      </div>
    </>
  );
};
export default Home;
