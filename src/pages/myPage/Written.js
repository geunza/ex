import React, { useEffect } from "react";
import MyPost from "components/myPage/MyPost";
import MyReply from "components/myPage/MyReply";
import styles from "scss/pages/CommunityList.module.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Written = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cate, setCate] = useState("");
  const [page, setPage] = useState(1);
  const postLimit = 30;
  const cateClick = (e) => {
    const {
      target: { name, value },
    } = e;
    navigate(`?${name}=${value}`);
  };
  useEffect(() => {
    const searchTxt = location.search;
    let searchObj = {};
    const searchArr = searchTxt.replace("?", "").split("&");
    let cateDummy = "";
    let pageDummy = "";
    searchArr.forEach((v) => {
      const arrObj = v.split("=");
      searchObj[arrObj[0]] = decode(arrObj[1]);
    });
    if (searchObj.cate == undefined) {
      setCate("게시글");
      cateDummy = "게시글";
    } else {
      setCate(searchObj.cate);
      cateDummy = searchObj.cate;
    }
    if (searchObj.page == undefined) {
      setPage(1);
      pageDummy = 1;
    } else {
      setPage(parseInt(searchObj.page));
      pageDummy = parseInt(searchObj.page);
    }
    window.scrollTo(0, 0);
  }, [location]);

  function decode(txt) {
    return decodeURI(txt);
  }
  return (
    <>
      <div className={styles.CommunityList} id="communityList">
        <div className={`commonTitleWrap ${styles.titleArea}`}>
          <div className={`${styles.inner} inner`}>
            <div className={styles.leftArea}>
              <h3 className={`title ${styles.title}`}>내가 작성한 글</h3>
              <p>올바른 커뮤니티 문화를 지향합시다.</p>
            </div>
          </div>
        </div>
        <div className={styles.CommunityListContent}>
          <div className="inner">
            <div className={styles.listCategory}>
              <button
                type="button"
                name="cate"
                value="게시글"
                onClick={cateClick}
                data-selected={cate === "게시글" ? "selected" : null}
              >
                게시글
              </button>

              <button
                type="button"
                name="cate"
                value="댓글"
                onClick={cateClick}
                data-selected={cate === "댓글" ? "selected" : null}
              >
                댓글
              </button>
            </div>
            {cate == "게시글" && <MyPost page={page} postLimit={postLimit} />}
            {cate == "댓글" && <MyReply page={page} postLimit={postLimit} />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Written;
