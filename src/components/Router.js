import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "pages/Home";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "scss/components/Router.module.scss";
import CommunityList from "pages/community/CommunityList";
import CommunityView from "pages/community/CommunityView";
import Loading from "components/Loading";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <div id="wrap">
      <Router>
        <Header isLoggedIn={isLoggedIn} />
        <div className={`${styles.inner} inner`}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home isLoggedIn={isLoggedIn} />}
            ></Route>
            <Route
              path="/community/communityList/"
              element={<Navigate replace to="/community/communityList/전체" />}
            ></Route>
            <Route
              path="/community/communityList/:category"
              element={<CommunityList />}
            ></Route>
            <Route
              path="/community/communityView/:id"
              element={<CommunityView />}
            ></Route>
            <Route path="*" element={<Navigate replace to="/" />}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};
export default AppRouter;
