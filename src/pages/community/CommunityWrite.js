import React, { useState, useEffect } from "react";
import Editor from "components/community/Editor";
import Editor2 from "components/community/Editor2";
import FileUpload from "components/community/FileUpload";
import styles from "scss/pages/CommunityWrite.module.scss";
const CommunityWrite = () => {
  const [cate, setCate] = useState("정보공유"); //category
  const [openCate, setOpenCate] = useState(false);
  const [title, setTitle] = useState(""); //title
  const [editorTxt, setEditorTxt] = useState(""); //content
  const [fileData, setFileData] = useState([]);
  const btnSubmit = () => {
    // console.log("CATEGORY :" + cate);
    // console.log("title :" + title);
    // console.log("content :" + editorTxt);
    if (title == "" && editorTxt == "") {
      alert("필수 입력사항을 입력해 주세요.");
    } else if (title == "") {
      alert("제목은 필수 입력사항입니다.");
    } else if (editorTxt == "") {
      alert("내용은 필수 입력사항입니다.");
    }
    // axios({
    //   method:"POST",
    //   url:"/mobile/community/",
    //   headers:"multipart/form-data",
    // })
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
                />
                <div className="editor2">
                  <Editor2 />
                </div>
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
export default CommunityWrite;
