import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styles from "scss/pages/CommunityList.module.scss";
import Banner from "components/ImageBanner";
import axios from "axios";
import CommunityListItem from "components/community/CommunityListItem";
import Pagination from "components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
import BoxListItemCommunity from "components/community/BoxListItemCommunity";
import CommunityModalBlockUser from "components/community/CommunityModalBlockUser";

const CommunityList = ({}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userInfo = useSelector((state) => state.userInfo);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cate, setCate] = useState("");
  const [ord, setOrd] = useState("");
  const [postData, setPostData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [comSearchText, setComSearchText] = useState("");
  const [modalOn, setModalOn] = useState({ current: false, type: "", id: "" });
  const [axiosLeng, setAxiosLeng] = useState(0);
  const [controlBox, setControlBox] = useState({ id: "" });
  const [blockedModalOn, setBlockedModalOn] = useState(false);
  const getCommunityList = () => {
    const paramCate = searchParams.get("cate");
    const paramOrd = searchParams.get("ord");
    const paramPage = searchParams.get("page");
    console.log(
      `/mobile/community/all?select_cat=${paramCate}&ord=${paramOrd}&cnt_sql=${
        paramPage - 1
      }`
    );
    axios({
      method: "GET",
      // url: "/mobile/community/all?select_cat=전체&ord=최신순&cnt_sql=0&search_array=스타트업, 뉴스",
      url: "/mobile/community/all?select_cat=전체&ord=최신순&cnt_sql=0",
    }).then((res) => {
      const data = res.data;
      console.log(data);
      setPostData(data);
      setAxiosLeng((prev) => prev + 1);
    });
  };
  const getCommunityPopular = () => {
    axios({
      headers: {
        user_id: userInfo.id,
      },
      method: "POST",
      url: `/mobile/community/popularAll`,
    }).then((res) => {
      setPopular(res.data);
      setAxiosLeng((prev) => prev + 1);
    });
  };
  useEffect(() => {
    dispatch(loadingStart());
    getCommunityList();
    getCommunityPopular();
  }, []);

  useEffect(() => {
    axiosLeng == 2 && dispatch(loadingEnd());
  }, [axiosLeng]);

  const btnSorting = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    searchParams.set(name, value);
    searchParams.set("page", 1);
    navigate("?" + searchParams.toString());
  };

  const getParams = () => {
    let currentCate = searchParams.get("cate");
    let currentPage = searchParams.get("page");
    let currentOrd = searchParams.get("ord");
    if (searchParams.get("cate") == null) {
      currentCate = "전체";
    }
    if (searchParams.get("page") == null) {
      currentPage = 1;
    }
    if (searchParams.get("ord") == null) {
      currentOrd = "전체";
    }
    const paramString = `cate=${currentCate}&ord=${currentOrd}&page=${currentPage}`;
    navigate("?" + searchParams.toString());
  };

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
      : alert("로그인이 필요합니다.");
  };
  useEffect(() => {
    setPosts(postData);
  }, [postData]);

  useEffect(() => {
    setCate(searchParams.get("cate"));
    setOrd(searchParams.get("ord"));
    setPage(searchParams.get("page"));
    //setParams(...[(cate, setCate), (ord, setOrd), (page, setPage)]);
  }, [searchParams]);

  useEffect(() => {
    getParams();
  }, []);

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
                onClick={btnSorting}
                name="cate"
                value="전체"
                data-selected={cate === "전체" ? "selected" : null}
              >
                전체
              </button>
              <button
                type="button"
                onClick={btnSorting}
                name="cate"
                value="정보공유"
                data-selected={cate === "정보공유" ? "selected" : null}
              >
                정보공유
              </button>
              <button
                type="button"
                onClick={btnSorting}
                name="cate"
                value="QnA"
                data-selected={cate === "QnA" ? "selected" : null}
              >
                QnA
              </button>
              <button
                type="button"
                onClick={btnSorting}
                name="cate"
                value="기업매칭"
                data-selected={cate === "기업매칭" ? "selected" : null}
              >
                기업 매칭
              </button>
              <button
                type="button"
                onClick={btnSorting}
                name="cate"
                value="자유게시판"
                data-selected={cate === "자유게시판" ? "selected" : null}
              >
                자유 게시판
              </button>
            </div>
            <div className={styles.listCont}>
              <div className={styles.listSorting}>
                <div className="ordBtns">
                  <button
                    type="button"
                    data-selected={ord === "전체" ? "selected" : null}
                    onClick={btnSorting}
                    name="ord"
                    value="전체"
                  >
                    <span>전체</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "인기순" ? "selected" : null}
                    onClick={btnSorting}
                    name="ord"
                    value="인기순"
                  >
                    <span>인기순</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "최신순" ? "selected" : null}
                    onClick={btnSorting}
                    name="ord"
                    value="최신순"
                  >
                    <span>최신순</span>
                  </button>
                  <button
                    type="button"
                    data-selected={ord === "댓글" ? "selected" : null}
                    onClick={btnSorting}
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
              total={posts.length}
              postLimit={limit}
              numLimit={5}
              page={parseInt(page)}
              searchParams={searchParams}
              cate={cate}
              ord={ord}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityList;
