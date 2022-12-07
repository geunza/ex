import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setUserInfo } from "redux/store";
import axios from "axios";
import Home from "pages/Home";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "scss/components/Router.module.scss";
import ScrollToTop from "components/scrollToTop";
import CommunityList from "pages/community/CommunityList";
import CommunityView from "pages/community/CommunityView";
import CommunityWrite from "pages/community/CommunityWrite";
import CommunityModify from "pages/community/CommunityModify";
import SupportList from "pages/support/SupportList";
import SupportView from "pages/support/SupportView";
import Loading from "components/Loading";
import SavedRecent from "pages/saved/SavedRecent";
import NoticeList from "pages/notice/NoticeList";
import NoticeView from "pages/notice/NoticeView";
import MyPage from "pages/myPage/MyPage";

const AppRouter = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn")) {
      const userId = JSON.parse(sessionStorage.getItem("userId"));
      defaultSignIn(userId);
      dispatch(signIn());
    }
  }, []);
  const defaultSignIn = (id) => {
    axios({
      url: "/user/getUserInfo",
      method: "POST",
      headers: { userId: parseInt(id) },
    }).then((res) => {
      const data = res.data;
      const id = data.id;
      sessionStorage.setItem("userId", id);
      dispatch(setUserInfo(data));
    });
  };
  return (
    <div id="wrap">
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            path="/community/communityList"
            element={<CommunityList />}
          ></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            path="/community/communityView/:id"
            element={<CommunityView />}
          ></Route>
          <Route
            path="/community/communityWrite"
            element={<CommunityWrite />}
          ></Route>
          <Route
            path="/community/CommunityModify/:id"
            element={<CommunityModify />}
          ></Route>
          <Route path="/support/supportList" element={<SupportList />}></Route>
          <Route
            path="/support/supportView/:id"
            element={<SupportView />}
          ></Route>
          <Route
            path="/saved/savedRecent"
            exact
            element={<SavedRecent />}
          ></Route>
          <Route path="/notice/noticeList" element={<NoticeList />}></Route>
          <Route path="/notice/noticeView/:id" element={<NoticeView />}></Route>
          <Route path="/myPage" exact element={<MyPage />}></Route>
          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Routes>
        <Footer />
        <Loading />
      </Router>
    </div>
  );
};
export default AppRouter;
