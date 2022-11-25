import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useEffect } from "react";

const CommunityWrite = () => {
  const [editorTxt, setEditorTxt] = useState("");
  useEffect(() => {
    console.log("editorTxt", editorTxt);
  }, [editorTxt]);
  return (
    <>
      <div className="CommunityWrite">
        <div className={`commonTitleWrap`}>
          <div className={` inner`}>
            <div className={``}>
              <h3 className={`title`}>게시글 작성</h3>
              <p>주제에 맞는 카테고리 선택후 글을 작성해 주세요.</p>
            </div>
            <button type="button">등록</button>
          </div>
        </div>
        <div className="writeArea inner">
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
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default CommunityWrite;
