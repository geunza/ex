import React, { useState, useEffect } from "react";
import Editor from "components/community/Editor";
import FileUpload from "components/community/FileUpload";
import styles from "scss/pages/Community.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MobileTitle from "components/MobileTitle";
const CommunityWrite = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userInfo = useSelector((state) => state.userInfo);
  const [cate, setCate] = useState("정보공유"); //category
  const [openCate, setOpenCate] = useState(false);
  const [title, setTitle] = useState(""); //title
  const [editorTxt, setEditorTxt] = useState(""); //content
  const [editorFileData, setEditorFileData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [allFileLength, setAllFileLength] = useState(0);
  const btnSubmit = () => {
    if (
      title == "" &&
      editorTxt
        .replaceAll(" ", "")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("<br>", "") == ""
    ) {
      alert("필수 입력사항을 입력해 주세요.");
      return false;
    } else if (title == "") {
      alert("제목은 필수 입력사항입니다.");
      return false;
    } else if (
      editorTxt
        .replaceAll(" ", "")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll("<br>", "") == ""
    ) {
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
        v.setAttribute("src", "/img/community/" + newAlt);
      }
    });
    const txtData = doc.querySelector("body").innerHTML;
    const formData1 = new FormData();
    formData1.append("category", cate);
    formData1.append("userId", userInfo.id);
    formData1.append("title", title);
    formData1.append("content", txtData);
    // formData1.append("content", editorTxt);
    for (let i = 0; i < editorFileData.length; i++) {
      formData1.append("files", editorFileData[i]);
    }
    axios
      .post("/mobile/community/", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (allFileLength > 0) {
          const formData2 = new FormData();
          formData2.append("content_id", res.data);
          fileData.forEach((v, i) => {
            formData2.append("files", v);
          });
          axios
            .post("/mobile/community/uploadFile", formData2, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              navigate(`/community/communityView/${res.data}`);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(res.data);
          navigate(`/community/communityView/${res.data}`);
        }
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
  useEffect(() => {
    if (!isLoggedIn) {
      alert("잘못된 접근입니다.");
      navigate(-1);
    }
  }, [userInfo]);
  return (
    <>
      <div className={styles.CommunityWrite}>
        <MobileTitle title={"게시글 작성"} />
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
                    src={require("assets/img/global/btn/btn_arr_bottom_thick.png")}
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
                  editorFileData={editorFileData}
                  setEditorFileData={setEditorFileData}
                  setOpenCate={setOpenCate}
                />
              </div>
            </div>
            <p className={styles.notice}>
              <span className="req">*</span>파일 개당 20MB,최대 5개 업로드 가능
            </p>
            <div className={styles.fileArea}>
              <FileUpload
                styles={styles}
                allFileLength={allFileLength}
                setAllFileLength={setAllFileLength}
                fileData={fileData}
                setFileData={setFileData}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={btnSubmit}
            className={`isMobile ${styles.mobileWrite} ${styles.btnSubmit}`}
          >
            등록
          </button>
        </div>
      </div>
    </>
  );
};
export default CommunityWrite;
