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
import { loadingStart, loadingEnd } from "store";
import BoxListItemCommunity from "components/community/BoxListItemCommunity";
import CommunityListModal from "components/community/CommunityListModal";

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
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [comSearchText, setComSearchText] = useState("");
  const [modalOn, setModalOn] = useState({ current: false, type: "", id: "" });
  const [axiosLEng, setAxiosLeng] = useState(0);
  const [controlBox, setControlBox] = useState({ id: "" });
  const modalOpener = (e) => {
    const {
      currentTarget: {
        name,
        value,
        dataset: { id },
      },
    } = e;
    const isTrue = value == "true";
    if (isTrue) {
      setModalOn({ current: true, type: name, id: id });
    } else {
      setModalOn({ current: false, type: "", id: "" });
    }
    // dispatch(modalOverflow(false));
  };
  const getCommunityList = () => {
    axios({
      method: "GET",
      url: `/mobile/community/all?select_cat=전체&ord=최신순&cnt_sql=0`,
    }).then((res) => {
      const data = res.data;
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
    axiosLEng == 2 && dispatch(loadingEnd());
  }, [axiosLEng]);
  const btnSorting = (e) => {
    const {
      currentTarget: { name, value },
    } = e;
    searchParams.set(name, value);
    searchParams.set("page", 1);
    navigate("?" + searchParams.toString());
  };

  const getParams = (param) => {
    let current = searchParams.get(param);
    if (current == null) {
      current = "전체";
      if (param == "page") {
        current = 1;
      }
    }
    searchParams.set(param, current);
    navigate("?" + searchParams.toString());
  };
  const setParams = (param, setParam) => {
    let current = searchParams.get(param);
    if (current == null) {
      current = "전체";
      if (param == "page") {
        current = 1;
      }
    }
    setParam(current);
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
    setParams("cate", setCate);
    setParams("ord", setOrd);
    setParams("page", setPage);

    //setParams(...[(cate, setCate), (ord, setOrd), (page, setPage)]);
  }, [searchParams]);

  useEffect(() => {
    getParams("cate");
    getParams("page");
    getParams("ord");
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
            <div className={styles.rightArea}>
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
                onClick={modalOpener}
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
                <>
                  <ul className="commonListItemWrap">
                    {posts.slice(offset, offset + limit).map((post, i) => {
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
                          post={post}
                          key={i}
                          styles={styles}
                          modalOn={modalInform}
                          modalOpener={modalOpener}
                          controlBox={controlBox}
                          setControlBox={setControlBox}
                          controlBoxOpen={controlBoxOpen}
                        />
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div>없어용</div>
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
              {/* {posts.length > 0 && (
          <Pagination
            total={posts.length}
            postLimit={limit}
            page={page}
            searchParams={searchParams}
            setPage={setPage}
            numLimit={10}
          />
        )} */}
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
        {modalOn.current && modalOn.type == "blockedUser" ? (
          <CommunityListModal modalOn={modalOn} modalOpener={modalOpener} />
        ) : null}
      </div>
    </>
  );
};
export default CommunityList;
