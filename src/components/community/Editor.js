import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ styles, editorTxt, setEditorTxt }) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={editorTxt}
        placeholder="내용을 입력해 주세요."
        onReady={(editor) => {
          // console.log("Editor is ready to use!", editor);
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
              욕설/바방, 저작권 침해, 음란, 청소년 유해물, 기타 위법자료 등을
              게시할경우 경고 없이 삭제됩니다.{" "}
            </span>
          </p>
        </div>
      )}
    </>
  );
};
export default Editor;
