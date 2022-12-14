import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  const location = useLocation();
  useEffect(() => {
    let pathname = location.pathname;
    const communitySessions = [
      "c_keyword",
      "c_mo_page",
      "c_cate",
      "c_ord",
      "c_currentSearch",
    ];
    const supportSessions = ["sOffset", "s_mo_page", "s_currentSearch"];
    if (!pathnameCheck("community")) {
      communitySessions.forEach((v) => sessionStorage.removeItem(v));
    }
    if (!pathnameCheck("support")) {
      supportSessions.forEach((v) => sessionStorage.removeItem(v));
    }
  }, [location]);
  function pathnameCheck(targetPath) {
    if (location.pathname.includes(targetPath)) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
