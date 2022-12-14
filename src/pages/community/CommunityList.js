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
import styles from "scss/pages/CommunityList.module.scss";
import Banner from "components/ImageBanner";
import axios from "axios";
import CommunityListItem from "components/community/CommunityListItem";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd, setLoginCheck } from "redux/store";
import BoxListItemCommunity from "components/community/BoxListItemCommunity";
import CommunityModalBlockUser from "components/community/CommunityModalBlockUser";

const CommunityList = ({}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(window.location);
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
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
  const [popular, setPopular] = useState([]);
  const [count, setCount] = useState(30);
  const [modalOn, setModalOn] = useState({ current: false, type: "", id: "" });
  const [blockedModalOn, setBlockedModalOn] = useState(false);

  const moveScrollStorage = () => {
    window.scrollTo({
      top: parseInt(sessionStorage.getItem("cOffset")),
    });
    sessionStorage.setItem("cOffset", 0);
  };
  const setScrollStorage = (value) => {
    console.log(value);
    sessionStorage.setItem("cOffset", value);
  };
  const getCommunityLength = () => {
    axios({
      url: "/mobile/community/totalCnt",
      method: "POST",
    }).then((res) => {
      setTotalCount(res.data.total_cnt);
    });
  };
  const getCommunityList = (stringParams) => {
    dispatch(loadingStart());
    axios({
      method: "GET",
      // url: "/mobile/community/all?select_cat=전체&ord=최신순&cnt_sql=0&search_array=스타트업, 뉴스",
      url: "/mobile/community/all" + stringParams,
    })
      .then((res) => {
        const data = res.data;
        setPosts(data);
        moveScrollStorage();
        dispatch(loadingEnd());
      })
      .catch((err) => {
        alert(err);
        dispatch(loadingEnd());
      });
  };
  const getCommunityPopular = () => {
    // dispatch(loadingStart());
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
        // dispatch(loadingEnd());
      });
  };
  useEffect(() => {
    getCommunityLength();
    getCommunityPopular();
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
    const searchTxt = location.search;
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    let cateDummy = "";
    let ordDummy = "";
    let pageDummy = "";
    let viewDummy = "";
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.cate == undefined) {
      setCate("전체");
      cateDummy = "전체";
    } else {
      setCate(searchObj.cate);
      cateDummy = searchObj.cate;
    }
    if (searchObj.ord == undefined) {
      setOrd("전체");
      ordDummy = "전체";
    } else {
      setOrd(searchObj.ord);
      ordDummy = searchObj.ord;
    }
    if (searchObj.page == undefined) {
      setPage(1);
      pageDummy = 1;
    } else {
      setPage(parseInt(searchObj.page));
      pageDummy = parseInt(searchObj.page);
    }
    if (searchObj.view == undefined) {
      setCount(30);
      viewDummy = 30;
    } else {
      setCount(searchObj.view);
      viewDummy = searchObj.view;
    }
    const stringParams = `?select_cat=${cateDummy}&ord=${ordDummy}&cnt_sql=${viewDummy}&page=${
      (pageDummy - 1) * viewDummy
    }`;
    getCommunityList(stringParams);
  }, [location]);
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
    let newSearchTxt = "";
    for (let key in searchObj) {
      if (searchObj[key] == "undefined") {
        continue;
      }
      if (key == "page") {
        newSearchTxt += `page=1&`;
      } else if (key == name) {
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
    if (true) {
      //검색 기준에 부합하면
      setComSearchText("");
    }
  };
  const btnNavigateWrite = () => {
    isLoggedIn
      ? navigate("/community/communityWrite")
      : dispatch(setLoginCheck(true));
  };

  return (
    <>
      <div className={styles.CommunityList} id="communityList">
        <div className={`commonTitleWrap ${styles.titleArea}`}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.leftArea}>
              <h3 className={`title ${styles.title}`}>커뮤니티</h3>
              <p>창업에 필요한 정보를 공유하고 얻어가세요.</p>
            </div>
            <div className="rightArea">
              <button type="button">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_bubble.png"
                  }
                  alt="내가 작성한 게시글, 댓글"
                />
                <span>내가 작성한 게시글/댓글</span>
              </button>

              <button
                type="button"
                name="blockedUser"
                value={true}
                onClick={() => {
                  setBlockedModalOn(true);
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/public_assets/img/global/ico/ico_blocked.png"
                  }
                  alt="차단 회원 관리"
                />
                <span>차단 회원 관리</span>
              </button>
            </div>
            {blockedModalOn && (
              <CommunityModalBlockUser setBlockedModalOn={setBlockedModalOn} />
            )}
          </div>
        </div>

        <div className={styles.CommunityListContent}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.listTop}>
              <h4>인기 글</h4>
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
            <div className={styles.listCategory}>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="전체"
                data-selected={cate === "전체" ? "selected" : null}
              >
                전체
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="정보공유"
                data-selected={cate === "정보공유" ? "selected" : null}
              >
                정보공유
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
                value="기업매칭"
                data-selected={cate === "기업매칭" ? "selected" : null}
              >
                기업 매칭
              </button>
              <button
                type="button"
                name="cate"
                onClick={ordCateClick}
                value="자유게시판"
                data-selected={cate === "자유게시판" ? "selected" : null}
              >
                자유 게시판
              </button>
            </div>
            <div className={styles.contTop}>
              <p className={styles.total}>전체 {totalCount}개</p>
              <div className={styles.countWrap}>
                <p
                  onClick={() => {
                    setSltView((prev) => !prev);
                  }}
                  className={styles.count}
                >
                  <span>{count}개씩 보기</span>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_arr_bottom.png"
                    }
                    alt="열기"
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
                        30개씩 보기
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={countClick}
                        value={50}
                        name="view"
                      >
                        50개씩 보기
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={countClick}
                        value={100}
                        name="view"
                      >
                        100개씩 보기
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
                    data-selected={ord === "전체" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="전체"
                  >
                    <span>전체</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "인기순" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="인기순"
                  >
                    <span>인기순</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "최신순" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="최신순"
                  >
                    <span>최신순</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "댓글" ? "selected" : null}
                    onClick={ordCateClick}
                    name="ord"
                    value="댓글"
                  >
                    <span>댓글 많은 순</span>
                  </button>
                </div>
                <div className={styles.searchAndWrite}>
                  <form action="###" onSubmit={communitySearch}>
                    <input
                      type="text"
                      placeholder="키워드를 검색해 보세요."
                      value={comSearchText}
                      onChange={(e) => {
                        setComSearchText(e.target.value);
                      }}
                    />
                    <button type="submit">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/public_assets/img/global/ico/ico_search_black.png"
                        }
                        alt="SEARCH"
                      ></img>
                    </button>
                  </form>
                  <button
                    onClick={btnNavigateWrite}
                    className={styles.btnWrite}
                  >
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/public_assets/img/global/ico/ico_write.png"
                      }
                      alt="게시글 작성"
                    />
                    <span>게시글 작성</span>
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
                        getCommunityList={getCommunityList}
                      />
                    );
                  })}
                </ul>
              ) : (
                <div className="empty">
                  <p className="empty_tit">커뮤니티 게시글이 없습니다.</p>
                  <p className="empty_para">첫번째 게시글을 작성해보세요!</p>
                </div>
              )}
              <div className={styles.bottomBtns}>
                <button onClick={btnNavigateWrite} className={styles.btnWrite}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/ico/ico_write.png"
                    }
                    alt="게시글 작성"
                  />
                  <span>게시글 작성</span>
                </button>
              </div>
            </div>
            <Pagination
              total={totalCount}
              // total={5000}
              postLimit={count}
              numLimit={5}
              page={parseInt(page)}
              searchParams={searchParams}
              ord={ord}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityList;
