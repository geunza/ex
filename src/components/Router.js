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

import axios from "axios";
import Home from "pages/Home";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "scss/components/Router.module.scss";
import MobileNavigation from "components/MobileNavigation";
import ScrollToTop from "components/scrollToTop";
import CommunityList from "pages/community/CommunityList";
import CommunityView from "pages/community/CommunityView";
import CommunityWrite from "pages/community/CommunityWrite";
import CommunityModify from "pages/community/CommunityModify";
import SupportList from "pages/support/SupportList";
import SupportView from "pages/support/SupportView";
import Loading from "components/Loading";
import SavedWrap from "pages/saved/SavedWrap";
import NoticeList from "pages/notice/NoticeList";
import NoticeView from "pages/notice/NoticeView";
import MyPage from "pages/myPage/MyPage";
import Written from "pages/myPage/Written";
import LoginModal from "components/LoginModal";
import KakaoLogin from "pages/login/KakaoLogin";
import KakaoLogOut from "pages/login/KakaoLogOut";
const AppRouter = ({}) => {
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const loginCheck = useSelector((state) => state.loginCheck);
  const isMobile = useSelector((state) => state.isMobile);
  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      if (userInfo.usernickname == "" && isLoggedIn) {
        // setLastCheck(true);
      }
    }
  }, [userInfo]);
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
          <Route path="/saved" exact element={<SavedWrap />}></Route>
          <Route path="/notice/noticeList" element={<NoticeList />}></Route>
          <Route path="/notice/noticeView/:id" element={<NoticeView />}></Route>
          <Route path="/myPage" exact element={<MyPage />}></Route>
          <Route path="/myPage/Written" exact element={<Written />}></Route>
          <Route path="/KakaoLogin" exact element={<KakaoLogin />}></Route>
          <Route path="/KakaoLogOut" exact element={<KakaoLogOut />}></Route>
          <Route path="*" element={<Navigate replace to="/" />}></Route>
        </Routes>
        <Footer />
        {isMobile && <MobileNavigation />}
        <Loading />
      </Router>
      {loginCheck && <LoginModal />}
    </div>
  );
};
export default AppRouter;
