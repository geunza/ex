import React, { useState, useEffect } from "react";
import Editor from "components/community/Editor";
import FileUpload from "components/community/FileUpload";
import styles from "scss/pages/Community.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { loadingStart, loadingEnd } from "redux/store";
const CommunityModify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const [cate, setCate] = useState("정보공유"); //category
  const [title, setTitle] = useState(""); //title
  const [editorTxt, setEditorTxt] = useState(""); //content
  const [editorFileData, setEditorFileData] = useState([]);
  const [fileName, setFileName] = useState([]);
  const [defaultTxt, setDefaultTxt] = useState("");
  const btnSubmit = () => {
    if (title == "" && editorTxt == "") {
      alert("필수 입력사항을 입력해 주세요.");
      return false;
    } else if (title == "") {
      alert("제목은 필수 입력사항입니다.");
      return false;
    } else if (editorTxt == "") {
      alert("내용은 필수 입력사항입니다.");
      return false;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorTxt, "text/html");
    doc.querySelectorAll("img").forEach((v) => {
      const alt = v.getAttribute("alt");
      if (alt.slice(-4, alt.length) == "_NEW") {
        const newAlt = alt.slice(0, alt.length - 4);
        v.setAttribute("alt", newAlt);
        v.setAttribute("src", newAlt);
      }
    });
    const txtData = doc.querySelector("body").innerHTML;
    const formData1 = new FormData();
    formData1.append("category", cate);
    formData1.append("userId", userInfo.id);
    formData1.append("title", title);
    formData1.append("content", txtData);
    formData1.append("id", id);
    // formData1.append("content", editorTxt);
    for (let i = 0; i < editorFileData.length; i++) {
      formData1.append("files", editorFileData[i]);
    }
    axios
      .put("/mobile/community/edit", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate(`/community/communityView/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
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
        setFileName(res.data.map((v) => v.file_name));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCommunityData();
    getCommunityFiles();
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, [userInfo]);
  return (
    <>
      <div className={`${styles.CommunityModify} ${styles.CommunityWrite}`}>
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
                <p className={styles.currentCate}>
                  {cate}
                  <img
                    src={require("assets/img/global/btn/btn_arr_bottom_thick.png")}
                    alt="카테고리 선택"
                  />
                </p>
              </div>
              <p className={styles.modifyInform}>
                <img
                  src={require("assets/img/global/ico/ico_warning.png")}
                  alt="제목과 내용만 수정 가능합니다."
                />
                <span>제목과 내용만 수정 가능합니다.</span>
              </p>
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
                  editorFileData={editorFileData}
                  setEditorFileData={setEditorFileData}
                />
              </div>
            </div>
            <div className={styles.fileArea}>
              <label
                htmlFor="multipleFiles"
                onClick={(e) => {
                  e.preventDefault();
                  alert("제목과 내용만 수정 가능합니다.");
                }}
              >
                <img
                  src={require("assets/img/global/btn/btn_add.png")}
                  alt="첨부파일 추가"
                />
                <span>첨부파일</span>
              </label>
              <div className={styles.items}>
                {fileName.map((name, idx) => (
                  <p key={idx} className={styles.item}>
                    <span>{name}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityModify;
