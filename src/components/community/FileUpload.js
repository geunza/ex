import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
const FileUpload = ({ styles, fileData, setFileData }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState([]);
  const fileChange = () => {
    // dispatch(loadingStart());
    const target = document.getElementById("multipleFiles");
    const fileLengthLimit = 5;
    const fileSizeLimit = 20;
    const files = target.files;
    const fileArray = Array.from(files);
    if (files.length > fileLengthLimit) {
      // 갯수 체크
      alert(`최대 ${fileLengthLimit}개까지만 삽입 가능합니다.`); // CHECK : 메시지 정리
      resetFile();
    }
    fileArray.forEach((item, idx) => {
      // 확장자 체크
      const passArray = ["hwp", "word", "ppt", "pdf", "exel", "text"];
      const ext = item.name.split(".").pop().toLowerCase();
      if (passArray.indexOf(ext) == -1) {
        alert(
          "지정된 확장자 (.hwp, .word, .ppt, .pdf, .exel, .text)만 삽입할 수 있습니다."
        ); // CHECK : 메시지 정리
        resetFile();
      }
      if (item.size > fileSizeLimit * 1024 * 1024) {
        alert(`최대 ${fileSizeLimit}MB의 파일만 삽입 가능합니다.`); // CHECK : 메시지 정리
        resetFile();
      }
    });

    function resetFile() {
      target.value = "";
      setFileData([]);
      setFileName([]);
      // dispatch(loadingEnd());
      return false;
    }
    setFileData(files);
    setFileName([]);
    for (let i = 0; i < files.length; i++) {
      setFileName((prev) => [files[i].name, ...prev]);
    }
    setFileName((prev) => prev.reverse());
    // dispatch(loadingEnd());
  };
  const deleteFile = (idx) => {
    const dataTransfer = new DataTransfer();
    const target = document.getElementById("multipleFiles");
    const files = target.files;
    let fileArray = Array.from(files);
    fileArray.splice(idx, 1);
    fileArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    document.getElementById("multipleFiles").files = dataTransfer.files;
    // setFileData(dataTransfer.files);
    fileChange();
    // setFileData()
  };
  return (
    <>
      <label htmlFor="multipleFiles">
        <img
          src={require("assets/img/global/btn/btn_add.png")}
          alt="첨부파일 추가"
        />
        <span>첨부파일</span>
      </label>
      <input
        type="file"
        id="multipleFiles"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <div className={styles.items}>
        {fileName.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx);
              }}
            />
          </p>
        ))}
      </div>
    </>
  );
};
export default FileUpload;
