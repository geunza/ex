import React, { useState, useEffect } from "react";
import Editor from "components/community/Editor";
import FileUpload from "components/community/FileUpload";
import styles from "scss/pages/CommunityWrite.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const CommunityModify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInfo);
  const [cate, setCate] = useState("정보공유"); //category
  const [openCate, setOpenCate] = useState(false);
  const [title, setTitle] = useState(""); //title
  const [editorTxt, setEditorTxt] = useState(""); //content
  const [fileData, setFileData] = useState([]);
  const [defaultTxt, setDefaultTxt] = useState("");
  const btnSubmit = () => {
    // console.log("CATEGORY :" + cate);
    // console.log("title :" + title);
    // console.log("content :" + editorTxt);
    if (title == "" && editorTxt == "") {
      alert("필수 입력사항을 입력해 주세요.");
      return;
    } else if (title == "") {
      alert("제목은 필수 입력사항입니다.");
      return;
    } else if (editorTxt == "") {
      alert("내용은 필수 입력사항입니다.");
      return;
    }
    // axios({
    //   method: "POST",
    //   url: "/mobile/community/",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: {
    //     category: cate,
    //     userId: userInfo.id,
    //     title: title,
    //     content: editorTxt,
    //     files: "",
    //   },
    // }).then((res) => {
    //   if (fileData.length > 0) {
    //     const formData = new FormData(); // formData 객체를 생성한다.
    //     formData.append("content_id", res.data);
    //     for (let i = 0; i < fileData.length; i++) {
    //       formData.append("files", fileData[i]);
    //     }
    //     axios
    //       .post("/mobile/community/uploadFile", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       })
    //       .then(() => {
    //         navigate(`/community/communityView/${res.data}`);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   } else {
    //     navigate(`/community/communityView/${res.data}`);
    //   }
    //   return res.data;
    // });
  };
  const selectCate = (e) => {
    const {
      target: { value },
    } = e;
    setCate(value);
    setOpenCate((prev) => !prev);
  };
  const titleChange = (e) => {
    const iptValue = e.currentTarget.value;
    setTitle(iptValue);
  };
  const getCommunityData = () => {
    dispatch(loadingStart());
    axios({
      method: "GET",
      url: `/mobile/community/one?id=${id}`,
    }).then((res) => {
      const data = res.data;
      const userId = data.user_id;
      const currentId = userInfo.id;
      if (userId != currentId) {
        alert("잘못된 접근입니다.");
        navigate(-1);
      }
      const category = data.category;
      const title = data.title;
      const cont = data.content;
      setCate(category);
      setTitle(title);
      setDefaultTxt(cont);
      dispatch(loadingEnd());
    });
  };
  const getCommunityFiles = () => {
    axios({
      url: "/mobile/community/getFile",
      method: "POST",
      data: { content_id: parseInt(id) },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCommunityData();
    getCommunityFiles();
  }, []);
  return (
    <>
      <div className={styles.CommunityWrite}>
        <div className="commonTitleWrap">
          <div className={`inner ${styles.titleFlex}`}>
            <div className={``}>
              <h3 className={`title`}>게시글 작성</h3>
              <p>주제에 맞는 카테고리 선택후 글을 작성해 주세요.</p>
            </div>
            <button
              type="button"
              onClick={btnSubmit}
              className={styles.btnSubmit}
            >
              등록
            </button>
          </div>
        </div>
        <div className="inner">
          <div className={styles.writeArea}>
            <div className={styles.cateArea}>
              <p className={styles.cateTit}>카테고리</p>
              <div className={styles.cateItems}>
                <p
                  className={styles.currentCate}
                  onClick={() => {
                    setOpenCate((prev) => !prev);
                  }}
                >
                  {cate}
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/public_assets/img/global/btn/btn_arr_bottom_thick.png"
                    }
                    alt="카테고리 선택"
                  />
                </p>
                {openCate && (
                  <ul className={styles.cateItems}>
                    <li className={styles.cateItem}>
                      <button onClick={selectCate} value="정보공유">
                        정보공유
                      </button>
                    </li>
                    <li className={styles.cateItem}>
                      <button onClick={selectCate} value="QnA">
                        QnA
                      </button>
                    </li>
                    <li className={styles.cateItem}>
                      <button onClick={selectCate} value="기업매칭">
                        기업매칭
                      </button>
                    </li>
                    <li className={styles.cateItem}>
                      <button onClick={selectCate} value="자유게시판">
                        자유게시판
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className={styles.txtArea}>
              <div className={styles.titleArea}>
                <input
                  type="text"
                  value={title}
                  onChange={titleChange}
                  placeholder="제목을 입력해 주세요."
                />
              </div>
              <div className={styles.editorArea}>
                <Editor
                  styles={styles}
                  editorTxt={editorTxt}
                  setEditorTxt={setEditorTxt}
                  defaultValue={defaultTxt}
                />
              </div>
            </div>
            <div className={styles.fileArea}>
              <FileUpload
                fileData={fileData}
                setFileData={setFileData}
                styles={styles}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityModify;
