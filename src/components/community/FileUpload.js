import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
const FileUpload = ({
  styles,
  allFileLength,
  setAllFileLength,
  fileData,
  setFileData,
}) => {
  const dispatch = useDispatch();
  const fileLengthLimit = 5;
  const fileSizeLimit = 20;
  const target = document.getElementById("multipleFiles");

  const fileChange = () => {
    // dispatch(loadingStart());

    const files = target.files;
    const fileArray = Array.from(files);
    let state = true;
    if (allFileLength + files.length > fileLengthLimit) {
      // 갯수 체크
      alert(`최대 ${fileLengthLimit}개까지만 삽입 가능합니다.`); // CHECK : 메시지 정리
      return resetFile();
    }
    fileArray.forEach((item, idx) => {
      // 확장자 체크
      const passArray = ["hwp", "word", "ppt", "pdf", "exel", "text"];
      const ext = item.name.split(".").pop().toLowerCase();
      if (passArray.indexOf(ext) == -1) {
        alert(
          "지정된 확장자 (.hwp, .word, .ppt, .pdf, .exel, .text)만 삽입할 수 있습니다."
        ); // CHECK : 메시지 정리
        return resetFile();
      }
      if (fileData.some((x) => x.name == item.name)) {
        if (fileData.find((x) => x.name == item.name).size == item.size) {
          alert("동일한 파일은 업로드 할 수 없습니다.");
          return resetFile();
        }
      }
      if (item.size > fileSizeLimit * 1024 * 1024) {
        alert(`최대 ${fileSizeLimit}MB의 파일만 삽입 가능합니다.`); // CHECK : 메시지 정리
        return resetFile();
      }
    });

    function resetFile() {
      state = false;
      return false;
    }
    if (state) {
      const newArr = Array.from(fileData).concat(Array.from(fileArray));
      // arr[fileStep].datas = files;
      setFileData((prev) => newArr);
    }
    target.value = "";
  };
  useEffect(() => {
    const leng = fileData.length;
    setAllFileLength(leng);
  }, [fileData]);
  const deleteFile = (idx) => {
    const currentFile = [...fileData];
    currentFile.splice(idx, 1);
    setFileData(currentFile);
    // setFileData()
  };
  return (
    <>
      <label
        htmlFor="multipleFiles"
        onClick={(e) => {
          if (allFileLength >= 5) {
            e.preventDefault();
            alert(`최대 ${fileLengthLimit}개까지만 삽입 가능합니다.`);
          }
        }}
      >
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
        {fileData.map((item, idx) => {
          return (
            <p key={idx} className={styles.item}>
              <span>{item.name}</span>
              <img
                src={require("assets/img/global/btn/btn_close_blue.png")}
                alt="첨부파일 제거"
                onClick={() => {
                  deleteFile(idx);
                }}
              />
            </p>
          );
        })}
      </div>
    </>
  );
};
export default FileUpload;
