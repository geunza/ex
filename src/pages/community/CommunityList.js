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
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "store";
const CommunityList = ({}) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [postData, setPostData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [cate, setCate] = useState(category);
  const [ord, setOrd] = useState("전체");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingStart());

    axios(`/mobile/community/all?select_cat=전체&ord=최신순&cnt_sql=0`)
      .then((res) => {
        const data = res.data;
        return setPostData(data);
      })
      .then(() => {
        dispatch(loadingEnd());
      });
    if (sessionStorage.ord != undefined) {
      setOrd(sessionStorage.ord);
    }
  }, []);

  const postSort = () => {
    let copy = [];
    category === "전체"
      ? (copy = [...postData])
      : (copy = [...postData].filter((e) => e.category === category));

    if (ord === "전체") {
    } else if (ord === "인기순") {
      copy.sort((a, b) => b.view_count - a.view_count);
    } else if (ord === "최신순") {
      copy.sort((a, b) => {
        let date1 = new Date(a.cret_dt).getTime();
        let date2 = new Date(b.cret_dt).getTime();
        return date2 - date1;
      });
    } else if (ord === "댓글") {
      copy.sort((a, b) => b.comment_cnt - a.comment_cnt);
    }
    setPosts(copy);
  };

  useEffect(() => {
    sessionStorage.setItem("category", category);
    sessionStorage.setItem("ord", ord);
    postSort();
  }, [category, ord]);

  useEffect(() => {
    setPosts(postData);
  }, [postData]);
  const btnSorting = (e) => {
    const {
      target: { value },
    } = e;
    navigate("?page=1");
    setOrd(value);
  };
  useEffect(() => {
    let currentPage = searchParams.get("page");
    if (currentPage == null) {
      currentPage = 1;
    }
    setPage(parseInt(currentPage));
  }, [searchParams]);
  return (
    <div className={styles.CommunityList}>
      <div className={`${styles.inner} inner`}>
        <button
          onClick={() => {
            searchParams.set("ord", "2");
            navigate("?" + searchParams.toString());
          }}
        >
          TESTBTN
        </button>
        <div className={styles.titleArea}>
          <div className={styles.leftArea}>
            <h3>커뮤니티</h3>
            <p>창업에 필요한 정보를 공유하고 얻어가세요.</p>
          </div>
          <div className={styles.rightArea}>
            <Link to="###">내가 작성한 게시글/댓글</Link>
            <Link to="###">차단 회원 관리</Link>
          </div>
        </div>
        <div className={styles.listTop}>
          <div className={styles.popular}>
            <h4>인기 글</h4>
            <ul>
              <li>글 입니다.</li>
              <li>글 입니다.</li>
              <li>글 입니다.</li>
            </ul>
          </div>
          <div className={styles.banner}>
            <Banner />
          </div>
        </div>
        <div className={styles.listCategory}>
          <Link
            to="/community/communityList/전체"
            name="cate"
            value="전체"
            data-selected={category === "전체" ? "selected" : null}
          >
            전체
          </Link>
          <Link
            to="/community/communityList/정보공유"
            name="cate"
            value="정보공유"
            data-selected={category === "정보공유" ? "selected" : null}
          >
            정보공유
          </Link>
          <Link
            to="/community/communityList/QnA"
            name="cate"
            value="QnA"
            data-selected={category === "QnA" ? "selected" : null}
          >
            QnA
          </Link>
          <Link
            to="/community/communityList/기업매칭"
            name="cate"
            value="기업매칭"
            data-selected={category === "기업매칭" ? "selected" : null}
          >
            기업 매칭
          </Link>
          <Link
            to="/community/communityList/자유게시판"
            name="cate"
            value="자유게시판"
            data-selected={category === "자유게시판" ? "selected" : null}
          >
            자유 게시판
          </Link>
        </div>
        <div className={styles.listSorting}>
          <button
            type="button"
            data-selected={ord === "전체" ? "selected" : null}
            onClick={btnSorting}
            value="전체"
          >
            전체
          </button>
          <button
            type="button"
            data-selected={ord === "인기순" ? "selected" : null}
            onClick={btnSorting}
            value="인기순"
          >
            인기순
          </button>
          <button
            type="button"
            data-selected={ord === "최신순" ? "selected" : null}
            onClick={btnSorting}
            value="최신순"
          >
            최신순
          </button>
          <button
            type="button"
            data-selected={ord === "댓글" ? "selected" : null}
            onClick={btnSorting}
            value="댓글"
          >
            댓글 많은 순
          </button>
        </div>
        <div className={styles.listCont}>
          <ul>
            {posts.length > 0 ? (
              posts.slice(offset, offset + limit).map((post, i) => {
                return (
                  <CommunityListItem post={post} key={i} styles={styles} />
                );
              })
            ) : (
              <div>없어용</div>
            )}
          </ul>
          {posts.length > 0 && (
            <Pagination
              total={posts.length}
              postLimit={limit}
              numLimit={10}
              page={page}
              searchParams={searchParams}
              cate={cate}
              ord={ord}
            />
          )}
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
      </div>
    </div>
  );
};
export default CommunityList;
