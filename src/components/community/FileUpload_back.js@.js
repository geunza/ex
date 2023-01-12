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
  const [fileNames, setFileNames] = useState([
    { name: "file0Name", datas: [] },
    { name: "file1Name", datas: [] },
    { name: "file2Name", datas: [] },
    { name: "file3Name", datas: [] },
    { name: "file4Name", datas: [] },
  ]);
  const [fileStep, setFileStep] = useState(0);
  const fileChange = () => {
    // dispatch(loadingStart());

    const target = document.getElementById("multipleFiles" + fileStep);
    const fileLengthLimit = 5;
    const fileSizeLimit = 20;
    const files = target.files;
    const fileArray = Array.from(files);
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
      for (let i = 0; i < fileData.length; i++) {
        if (i == fileStep) continue;
        for (let i2 = 0; i2 < fileData[i].datas.length; i2++) {
          const thisData = fileData[i].datas;
          if (thisData[i2].name == item.name) {
            if (thisData[i2].size == item.size) {
              alert("동일한 파일은 업로드 할 수 없습니다.");
              return resetFile();
            }
          }
        }
      }
      if (item.size > fileSizeLimit * 1024 * 1024) {
        alert(`최대 ${fileSizeLimit}MB의 파일만 삽입 가능합니다.`); // CHECK : 메시지 정리
        return resetFile();
      }
    });

    function resetFile() {
      target.value = "";
      const arr = [...fileData];
      arr[fileStep].datas = [];
      setFileData((prev) => arr);
      // dispatch(loadingEnd());

      return false;
    }
    // setFileData(files);

    const arr = [...fileData];
    arr[fileStep].datas = files;
    setFileData((prev) => arr);

    // dispatch(loadingEnd());
  };
  useEffect(() => {
    let arr = [];
    const nameDummy = [...fileNames];
    let leng = 0;
    fileData.forEach((v, i) => {
      leng += v.datas.length;
      nameDummy[i].datas = [];
      for (let idx = 0; idx < v.datas.length; idx++) {
        nameDummy[i].datas.push(v.datas[idx].name);
      }
      if (v.datas.length == 0) {
        arr.push(i);
      }
    });
    setFileNames(nameDummy);
    let first = arr[0];
    if (first != undefined) {
      setFileStep(first);
    }
    setAllFileLength(leng);
  }, [fileData]);
  const deleteFile = (idx, targetStep) => {
    const dataTransfer = new DataTransfer();
    const target = document.getElementById("multipleFiles" + targetStep);
    const files = target.files;
    let fileArray = Array.from(files);

    fileArray.splice(idx, 1);
    fileArray.forEach((file) => {
      dataTransfer.items.add(file);
    });

    target.files = dataTransfer.files;

    const arr = [...fileData];
    arr[targetStep].datas = dataTransfer.files;
    setFileData((prev) => arr);
    // setFileData(dataTransfer.files);
    fileChange();

    // setFileData()
  };
  return (
    <>
      {fileStep == 0 && (
        <label htmlFor="multipleFiles0">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
      {fileStep == 1 && (
        <label htmlFor="multipleFiles1">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
      {fileStep == 2 && (
        <label htmlFor="multipleFiles2">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
      {fileStep == 3 && (
        <label htmlFor="multipleFiles3">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
      {fileStep == 4 && (
        <label htmlFor="multipleFiles4">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
      <input
        type="file"
        id="multipleFiles0"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <input
        type="file"
        id="multipleFiles1"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <input
        type="file"
        id="multipleFiles2"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <input
        type="file"
        id="multipleFiles3"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <input
        type="file"
        id="multipleFiles4"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <div className={styles.items}>
        {fileNames.map((obj, idx) => {
          return obj.datas.map((fName, fIdx) => {
            return (
              <p key={fIdx} className={styles.item}>
                <span>{fName}</span>
                <img
                  src={require("assets/img/global/btn/btn_close_blue.png")}
                  alt="첨부파일 제거"
                  onClick={() => {
                    deleteFile(fIdx, idx);
                  }}
                />
              </p>
            );
          });
        })}
      </div>
    </>
  );
};
export default FileUpload;
