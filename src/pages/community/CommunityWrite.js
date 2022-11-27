import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import styles from "scss/pages/CommunityWrite.module.scss";
const CommunityWrite = () => {
  const [cate, setCate] = useState("정보공유"); //category
  const [openCate, setOpenCate] = useState(false);
  const [title, setTitle] = useState(""); //title
  const [editorTxt, setEditorTxt] = useState(""); //content
  const btnSubmit = () => {
    console.log("CATEGORY :" + cate);
    console.log("title :" + title);
    console.log("content :" + editorTxt);
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
                <CKEditor
                  editor={ClassicEditor}
                  data={editorTxt}
                  placeholder="내용을 입력해 주세요."
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorTxt(data);
                  }}
                  onBlur={(event, editor) => {
                    // console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    // console.log("Focus.", editor);
                  }}
                />
                {editorTxt == "" && (
                  <div className={styles.editInform}>
                    <p className={styles.tit}>내용을 입력해주세요.</p>
                    <p className={styles.para}>
                      <span>카테고리에 맞는 주세로 입력해 주세요.</span>
                      <span>게시글 수정/삭제는 마이페이지에서 가능합니다.</span>
                      <span>
                        욕설/바방, 저작권 침해, 음란, 청소년 유해물, 기타
                        위법자료 등을 게시할경우 경고 없이 삭제됩니다.{" "}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CommunityWrite;
