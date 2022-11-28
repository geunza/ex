import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "scss/components/community/Editor.scss";
import { useEffect } from "react";

const Editor2 = ({ styles, editorTxt, setEditorTxt }) => {
  const editorRef = useRef();
  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setEditorTxt(data);
  };
  return (
    <>
      <Editor
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="600px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        hideModeSwitch="true"
        plugins={[
          [
            colorSyntax,
            // 기본 색상 preset 적용
            {
              preset: ["#ff0000", "#4c5864", "#ED7675"],
            },
          ],
        ]}
        language="ko-KR"
        ref={editorRef}
        onLoad={() => {
          console.log("LOADED");
        }}
        onChange={onChange}
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
      ></Editor>
      {(editorTxt == "" || editorTxt == "<p><br></p>") && (
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
export default Editor2;
