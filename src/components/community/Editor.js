import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

import "@toast-ui/editor/dist/i18n/ko-kr";
import "scss/components/community/Editor.scss";
import { useEffect } from "react";
import { useState } from "react";

const Editor2 = ({
  styles,
  editorTxt,
  setEditorTxt,
  defaultValue,
  setEditorFileData,
}) => {
  const [defaultTxt, setDefaultTxt] = useState(defaultValue);
  const [files, setFiles] = useState([]);
  const editorRef = useRef();
  useEffect(() => {}, []);
  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setEditorTxt(data);
  };
  const onLoad = () => {
    const htmlString = defaultValue;
    editorRef.current?.getInstance().setHTML(htmlString);
  };

  useEffect(() => {
    onLoad();
  }, [defaultValue]);
  useEffect(() => {
    setEditorFileData(files);
  }, [files]);
  return (
    <>
      <Editor
        id="testEditor"
        placeholder="내용을 입력해주세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        hideModeSwitch="true"
        plugins={[colorSyntax]}
        language="ko-KR"
        ref={editorRef}
        onLoad={onLoad}
        onChange={onChange}
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
        ]}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            setFiles((prev) => [...prev, blob]);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              var base64data = reader.result;
              var data = editorRef.current.getInstance().getHTML();
              var newData =
                data +
                `<p><img src="${base64data}" alt="${blob.name}_NEW" /></p>`;
              console.log(newData);
              editorRef.current?.getInstance().setHTML(newData);
              setEditorTxt(newData);
              // editorRef.current?.getInstance().setHTML(newTxt);
              document.querySelector(
                ".toastui-editor-popup-add-image"
              ).style.display = "none";
            };
          },
        }}
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
