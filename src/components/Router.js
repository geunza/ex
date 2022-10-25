import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "pages/Home";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "scss/components/Router.module.scss";

const AppRouter = ({ isLoggedIn }) => {
  const [headerOn, setHeaderOn] = useState(true);
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
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};
export default AppRouter;
