import React, { useEffect, useState } from "react";
import CountArea from "components/Home/CountArea";
import SnsLogin from "components/Home/LoginArea";
import Banner from "components/Home/Banner";
import Event from "components/Home/Event";
import Filter from "components/Home/Filter";
import styles from "scss/pages/Home.module.scss";
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
      </div>
    </>
  );
};
export default Home;
