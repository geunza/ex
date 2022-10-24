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
const AppRouter = ({ isLoggedIn, userImages }) => {
  const [headerOn, setHeaderOn] = useState(true);
  return (
    <div id="wrap">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          headerOn={headerOn}
          setHeaderOn={setHeaderOn}
        />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};
export default AppRouter;
