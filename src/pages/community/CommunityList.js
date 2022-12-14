import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "scss/pages/Community.module.scss";
import Banner from "components/ImageBanner";
import axios from "axios";
import CommunityListItem from "components/community/CommunityListItem";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  loadingStart,
  loadingEnd,
  setLoginCheck,
  modalOverflow,
} from "redux/store";
import BoxListItemCommunity from "components/community/BoxListItemCommunity";
import CommunityModalBlockUser from "components/community/CommunityModalBlockUser";
import { useMediaQuery } from "react-responsive";
import MobileTitle from "components/MobileTitle";
const CommunityList = ({}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sltView, setSltView] = useState(false);
  const [comSearchText, setComSearchText] = useState("");
  const [controlBox, setControlBox] = useState({ id: "" });
  const [totalCount, setTotalCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [cate, setCate] = useState("");
  const [ord, setOrd] = useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [popular, setPopular] = useState([]);
  const [count, setCount] = useState(30);
  const [modalOn, setModalOn] = useState({ current: false, type: "", id: "" });
  const [blockedModalOn, setBlockedModalOn] = useState(false);
  const [lastCheckTarget, setLastCheckTarget] = useState(null);
  const [mobileMore, setMobileMore] = useState(true);
  const moveScrollStorage = () => {
    window.scrollTo({
      top: parseInt(sessionStorage.getItem("cOffset")),
    });
    sessionStorage.removeItem("cMover");
  };
  const setScrollStorage = (value) => {
    sessionStorage.setItem("cOffset", value);
  };
  const getCommunityList = (stringParams) => {
    // dispatch(loadingStart());
    axios({
      method: "GET",
      // url: "/mobile/community/all?select_cat=??????&ord=?????????&cnt_sql=0&search_array=????????????, ??????",
      url: "/mobile/community/all" + stringParams,
    })
      .then((res) => {
        const data = res.data;
        setPosts(data);
        if (sessionStorage.getItem("cMover") == "true") {
          moveScrollStorage();
        }
        // dispatch(loadingEnd());
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getCommunityListMobile = (stringParams) => {
    // dispatch(loadingStart());
    axios({
      method: "GET",
      // url: "/mobile/community/all?select_cat=??????&ord=?????????&cnt_sql=0&search_array=????????????, ??????",
      url: "/mobile/community/all" + stringParams,
    })
      .then((res) => {
        const data = res.data;
        setPosts(data);
        if (sessionStorage.getItem("cMover") == "true") {
          moveScrollStorage();
        }
        // dispatch(loadingEnd());
      })
      .catch((err) => {
        alert(err);
      });
  };
  const getCommunityPopular = async () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      method: "POST",
      url: `/mobile/community/popularAll`,
    })
      .then((res) => {
        setPopular(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    getCommunityPopular();
    return () => {
      sessionStorage.removeItem("c_currentSearch");
    };
  }, []);

  const ordCateClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    navigateSearchTxt(name, value);
  };
  const countClick = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    setSltView(false);
    navigateSearchTxt(name, value);
  };
  useEffect(() => {
    if (isMobile) {
      sessionStorage.setItem("c_currentSearch", location.search);
      getParamMobile();
    } else {
      getParamPC();
    }
  }, [location]);
  function getParamPC() {
    const searchTxt = location.search;
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    let cateDummy = "";
    let ordDummy = "";
    let pageDummy = "";
    let viewDummy = "";
    let KeywordDummy = "";
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.cate == undefined) {
      cateDummy = "??????";
    } else {
      cateDummy = searchObj.cate;
    }
    if (searchObj.ord == undefined) {
      ordDummy = "??????";
    } else {
      ordDummy = searchObj.ord;
    }
    if (searchObj.page == undefined) {
      pageDummy = 1;
    } else {
      pageDummy = parseInt(searchObj.page);
    }
    if (searchObj.view == undefined) {
      viewDummy = 30;
    } else {
      viewDummy = searchObj.view;
    }
    if (searchObj.keyword == undefined) {
      KeywordDummy = "";
    } else {
      KeywordDummy = searchObj.keyword;
    }
    setCate(cateDummy);
    setOrd(ordDummy);
    setPage(pageDummy);
    setCount(viewDummy);
    setKeyword(KeywordDummy);
    let totalData = {};
    let stringParams = `?select_cat=${cateDummy}&ord=${ordDummy}&cnt_sql=${viewDummy}&page=${
      (pageDummy - 1) * viewDummy
    }&`;
    if (KeywordDummy != "") {
      stringParams += `search_array=${KeywordDummy}`;
      totalData = { search_array: KeywordDummy };
    } else {
      totalData = { category: cateDummy };
    }
    axios({
      url: "/mobile/community/totalCnt",
      method: "POST",
      data: totalData,
    }).then((res) => {
      setTotalCount(res.data.total_cnt);
    });
    getCommunityList(stringParams);
    setComSearchText("");
  }
  useEffect(() => {
    sessionStorage.setItem("c_cate", cate);
    sessionStorage.setItem("c_ord", ord);
    sessionStorage.setItem("c_keyword", keyword);
  }, [cate, ord, keyword]);
  function getParamMobile() {
    let searchTxt = sessionStorage.getItem("c_currentSearch");
    let searchObj = {};
    if (searchTxt == null) {
      searchTxt = "";
    }
    const searchArr = searchTxt.replace("?", "").split("&");
    let cateDummy = "";
    let ordDummy = "";
    let pageDummy = "";
    let viewDummy = "";
    let KeywordDummy = "";
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.cate == undefined) {
      cateDummy = "??????";
    } else {
      cateDummy = searchObj.cate;
    }
    if (searchObj.ord == undefined) {
      ordDummy = "??????";
    } else {
      ordDummy = searchObj.ord;
    }
    if (searchObj.keyword == undefined) {
      KeywordDummy = "";
    } else {
      KeywordDummy = searchObj.keyword;
    }
    if (
      sessionStorage.getItem("c_cate") != cateDummy ||
      sessionStorage.getItem("c_ord") != ordDummy ||
      sessionStorage.getItem("c_keyword") != KeywordDummy
    ) {
      sessionStorage.removeItem("c_mo_page");
    }

    let mobilePage = sessionStorage.getItem("c_mo_page");
    if (mobilePage == null) {
      pageDummy = 1;
    } else {
      pageDummy = parseInt(mobilePage);
    }
    if (searchObj.view == undefined) {
      if (isMobile) {
        viewDummy = 30 * pageDummy;
      } else {
        viewDummy = 30;
      }
    }

    pageDummy = 1;
    setCate(cateDummy); // ????????????
    setOrd(ordDummy); // ??????
    setPage(pageDummy); // ?????????
    setCount(viewDummy); // ?????????
    setKeyword(KeywordDummy); // ?????????
    let totalData = {};
    let stringParams = `?select_cat=${cateDummy}&ord=${ordDummy}&cnt_sql=${viewDummy}&page=${
      (pageDummy - 1) * viewDummy
    }&`;
    if (KeywordDummy != "") {
      stringParams += `search_array=${KeywordDummy}`;
      totalData = { search_array: KeywordDummy };
    } else {
      totalData = { category: cateDummy };
    }
    console.log(totalData);
    axios({
      url: "/mobile/community/totalCnt",
      method: "POST",
      data: totalData,
    })
      .then((res) => {
        setTotalCount(res.data.total_cnt);
        if (viewDummy > res.data.total_cnt) {
          setMobileMore(false);
        } else {
          setMobileMore(true);
        }
      })
      .catch((err) => console.log(err));
    getCommunityListMobile(stringParams);
    setComSearchText("");
  }
  function decode(txt) {
    return decodeURI(txt);
  }
  function navigateSearchTxt(name, value) {
    const searchTxt = location.search;
    const searchArr = searchTxt.replace("?", "").split("&");
    let searchObj = {};
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (name == "cate") {
      delete searchObj.ord;
    }
    let newSearchTxt = "";
    for (let key in searchObj) {
      if (searchObj[key] == "undefined") {
        continue;
      }
      if (key == "page") {
        newSearchTxt += `page=1&`;
      } else if (key == name) {
        continue;
      } else if (key == "keyword" && name == "cate") {
        continue;
      } else {
        newSearchTxt += `${key}=${searchObj[key]}&`;
      }
    }
    newSearchTxt += `${name}=${value}`;
    navigate("?" + newSearchTxt);
  }
  const communitySearch = (e) => {
    e.preventDefault();
    const value = comSearchText;

    if (value.replaceAll(" ", "") == "") {
      alert("???????????? ????????? ?????????.");
    } else {
      navigate(`?keyword=${value}`);
      setComSearchText("");
    }
  };
  const btnNavigateWrite = () => {
    isLoggedIn
      ? navigate("/community/communityWrite")
      : dispatch(setLoginCheck(true));
  };

  let infiniteState = true;
  const listener = () => {
    if (lastCheckTarget) {
      if (infiniteState) {
        const yPos = window.scrollY;
        const yHeight = window.innerHeight;
        const targetPos = lastCheckTarget.getBoundingClientRect().top;
        const trigger = targetPos - yHeight + 100;
        if (trigger < 0) {
          infiniteState = false;
          let mobilePage = sessionStorage.getItem("c_mo_page");
          console.log(mobilePage);
          if (mobilePage == null) {
            console.log("A");
            sessionStorage.setItem("c_mo_page", 2);
          } else {
            console.log("B");
            sessionStorage.setItem("c_mo_page", parseInt(mobilePage) + 1);
          }
          console.log(sessionStorage.getItem("c_mo_page"));
          getParamMobile();
          setTimeout(() => {
            infiniteState = true;
          }, 1500);
        }
      }
    }
  };
  useEffect(() => {
    if (isMobile) {
      if (count > totalCount) {
        setMobileMore(false);
      } else {
        setMobileMore(true);
      }
    }
  }, [totalCount]);
  useEffect(() => {
    if (lastCheckTarget) {
      window.addEventListener("scroll", listener);
    }
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [lastCheckTarget]);
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <div className={styles.CommunityList} id="communityList">
        <MobileTitle title={"????????????"} />
        <div className={`commonTitleWrap ${styles.titleArea}`}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.leftArea}>
              <h3 className={`title ${styles.title}`}>????????????</h3>
              <p>????????? ????????? ????????? ???????????? ???????????????.</p>
            </div>
            <div className="rightArea">
              <button
                type="button"
                onClick={() => {
                  if (!isLoggedIn) {
                    dispatch(setLoginCheck(true));
                    return false;
                  }
                  navigate("/myPage/Written");
                }}
              >
                <img
                  src={require("assets/img/global/ico/ico_bubble.png")}
                  alt="?????? ????????? ?????????, ??????"
                />
                <span>?????? ????????? ?????????/??????</span>
              </button>
              <button
                type="button"
                name="blockedUser"
                value={true}
                onClick={() => {
                  if (!isLoggedIn) {
                    dispatch(setLoginCheck(true));
                    return false;
                  }
                  setBlockedModalOn(true);
                }}
              >
                <img
                  src={require("assets/img/global/ico/ico_blocked.png")}
                  alt="?????? ?????? ??????"
                />
                <span>?????? ?????? ??????</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.CommunityListContent}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.listTop}>
              <h4>?????? ???</h4>
              <div className={styles.topCont}>
                <div className={styles.popular}>
                  <div className={styles.listWrap}>
                    {popular.map((item, idx) => {
                      return (
                        <BoxListItemCommunity
                          item={item}
                          writerShow={true}
                          commentShow={true}
                          viewShow={true}
                          likeShow={true}
                          url={"/community/communityView/"}
                          key={idx}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className={styles.banner}>
                  <Banner />
                </div>
              </div>
            </div>
            {isMobile && (
              <div className={styles.m_written}>
                <button
                  type="button"
                  onClick={() => {
                    if (!isLoggedIn) {
                      dispatch(setLoginCheck(true));
                      return false;
                    }
                    navigate("/myPage/Written");
                  }}
                >
                  <img
                    src={require("assets/img/global/ico/ico_bubble.png")}
                    alt="?????? ????????? ?????????, ??????"
                  />
                  <span>?????? ????????? ?????????{!isMobile && "/??????"}</span>
                </button>
                <button
                  type="button"
                  name="blockedUser"
                  value={true}
                  onClick={() => {
                    if (!isLoggedIn) {
                      dispatch(setLoginCheck(true));
                      return false;
                    }
                    setBlockedModalOn(true);
                  }}
                >
                  <img
                    src={require("assets/img/global/ico/ico_blocked.png")}
                    alt="?????? ?????? ??????"
                  />
                  <span>?????? ?????? ??????</span>
                </button>
              </div>
            )}
            <div className={styles.listCategory}>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="??????"
                data-selected={cate === "??????" ? "selected" : null}
              >
                ??????
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="????????????"
                data-selected={cate === "????????????" ? "selected" : null}
              >
                ????????????
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="QnA"
                data-selected={cate === "QnA" ? "selected" : null}
              >
                QnA
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="????????????"
                data-selected={cate === "????????????" ? "selected" : null}
              >
                ?????? ??????
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="???????????????"
                data-selected={cate === "???????????????" ? "selected" : null}
              >
                ?????? ?????????
              </button>
            </div>
            {keyword != "" && (
              <p className={styles.searchKeyword}>
                <mark>'{keyword}'</mark> ?????? ???????????????.
              </p>
            )}
            <div className={styles.contTop}>
              <p className={styles.total}>?????? {totalCount}???</p>
              <div className={styles.countWrap}>
                <p
                  onClick={() => {
                    setSltView((prev) => !prev);
                  }}
                  className={styles.count}
                >
                  <span>{count}?????? ??????</span>
                  <img
                    src={require("assets/img/global/btn/btn_arr_bottom.png")}
                    alt="??????"
                  />
                </p>
                {sltView && (
                  <ul className={styles.selectArea}>
                    <li>
                      <button
                        type="button"
                        onClick={countClick}
                        value={30}
                        name="view"
                      >
                        30?????? ??????
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={countClick}
                        value={50}
                        name="view"
                      >
                        50?????? ??????
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={countClick}
                        value={100}
                        name="view"
                      >
                        100?????? ??????
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.listCont}>
              <div className={styles.listSorting}>
                <div className="ordBtns">
                  <button
                    type="button"
                    data-selected={ord === "??????" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="??????"
                  >
                    <span>??????</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "?????????" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="?????????"
                  >
                    <span>?????????</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "?????????" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="?????????"
                  >
                    <span>?????????</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "???????????????" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="???????????????"
                  >
                    <span>?????? ?????? ???</span>
                  </button>
                </div>
                <div className={styles.searchAndWrite}>
                  <form action="###" onSubmit={communitySearch}>
                    <input
                      type="text"
                      placeholder="???????????? ????????? ?????????."
                      value={comSearchText}
                      onChange={(e) => {
                        setComSearchText(e.target.value);
                      }}
                    />
                    <button type="submit">
                      <img
                        src={require("assets/img/global/ico/ico_search_black.png")}
                        alt="SEARCH"
                      ></img>
                    </button>
                  </form>
                  <button
                    onClick={btnNavigateWrite}
                    className={styles.btnWrite}
                  >
                    <img
                      src={require("assets/img/global/ico/ico_write.png")}
                      alt="????????? ??????"
                    />
                    <span>????????? ??????</span>
                  </button>
                </div>
              </div>

              {posts.length > 0 ? (
                <ul className="commonListItemWrap">
                  {posts.map((post, i) => {
                    let modalInform;
                    modalOn.id == post.id
                      ? (modalInform = modalOn)
                      : (modalInform = {});
                    let controlBoxOpen;
                    controlBox.id == post.id
                      ? (controlBoxOpen = true)
                      : (controlBoxOpen = false);
                    return (
                      <CommunityListItem
                        key={i}
                        setScrollStorage={setScrollStorage}
                        post={post}
                        controlBox={controlBox}
                        setControlBox={setControlBox}
                        controlBoxOpen={controlBoxOpen}
                        getParamPC={getParamPC}
                        getParamMobile={getParamMobile}
                        isMobile={isMobile}
                      />
                    );
                  })}
                </ul>
              ) : (
                <div className="empty">
                  <p className="empty_tit">???????????? ???????????? ????????????.</p>
                  <p className="empty_para">????????? ???????????? ??????????????????!</p>
                </div>
              )}
              <div className={styles.bottomBtns}>
                <button onClick={btnNavigateWrite} className={styles.btnWrite}>
                  <img
                    src={require("assets/img/global/ico/ico_write.png")}
                    alt="????????? ??????"
                  />
                  <span>????????? ??????</span>
                </button>
              </div>
            </div>
            {!isMobile && (
              <Pagination
                total={totalCount}
                // total={5000}
                postLimit={count}
                numLimit={5}
                page={parseInt(page)}
                ord={ord}
              />
            )}
            {isMobile && mobileMore ? (
              <div
                ref={setLastCheckTarget}
                className="lastCheckDiv"
                style={{
                  display: isMobile ? "block" : "none",
                  width: "50px",
                  height: "50px",
                  padding: "50px",
                  background: "blue",
                  color: "#fff",
                  fontSize: 0,
                  opacity: 0,
                  background: "red",
                }}
              >
                LOADMORE TRIGGER
              </div>
            ) : null}

            {blockedModalOn && (
              <CommunityModalBlockUser setBlockedModalOn={setBlockedModalOn} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityList;
