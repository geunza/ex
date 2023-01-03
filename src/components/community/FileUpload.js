import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
const FileUpload = ({
  styles,
  file0,
  setFile0,
  file1,
  setFile1,
  file2,
  setFile2,
  file3,
  setFile3,
  file4,
  setFile4,
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
  const [fileName0, setFileName0] = useState([]);
  const [fileName1, setFileName1] = useState([]);
  const [fileName2, setFileName2] = useState([]);
  const [fileName3, setFileName3] = useState([]);
  const [fileName4, setFileName4] = useState([]);
  const [fileStep, setFileStep] = useState(0);
  const fileChange = () => {
    // dispatch(loadingStart());
    console.log("A");
    const target = document.getElementById("multipleFiles" + fileStep);
    // console.log("multipleFiles" + fileStep);
    const fileLengthLimit = 5;
    const fileSizeLimit = 20;
    const files = target.files;
    const fileArray = Array.from(files);
    if (allFileLength + files.length > fileLengthLimit) {
      // 갯수 체크
      alert(`최대 ${fileLengthLimit}개까지만 삽입 가능합니다.`); // CHECK : 메시지 정리
      return resetFile();
    }
    console.log("B");
    fileArray.forEach((item, idx) => {
      // 확장자 체크
      // const passArray = ["hwp", "word", "ppt", "pdf", "exel", "text"];
      // const ext = item.name.split(".").pop().toLowerCase();
      // if (passArray.indexOf(ext) == -1) {
      //   alert(
      //     "지정된 확장자 (.hwp, .word, .ppt, .pdf, .exel, .text)만 삽입할 수 있습니다."
      //   ); // CHECK : 메시지 정리
      //   return resetFile();
      // }
      // for (let i = 0; i < fileData.length; i++) {
      //   if (i == fileStep) continue;
      //   for (let i2 = 0; i2 < fileData[i].datas.length; i2++) {
      //     const thisData = fileData[i].datas;
      //     if (thisData[i2].name == item.name) {
      //       if (thisData[i2].size == item.size) {
      //         alert("동일한 파일은 업로드 할 수 없습니다.");
      //         return resetFile();
      //       }
      //     }
      //   }
      // }
      // if (item.size > fileSizeLimit * 1024 * 1024) {
      //   alert(`최대 ${fileSizeLimit}MB의 파일만 삽입 가능합니다.`); // CHECK : 메시지 정리
      //   return resetFile();
      // }
    });

    function resetFile() {
      console.log("C");
      target.value = "";
      setFileData((prev) => (prev[fileStep].datas = []));
      // dispatch(loadingEnd());
      console.log("D");
      return false;
    }
    // setFileData(files);
    console.log("E");
    const arr = [...fileData];
    arr[fileStep].datas = files;
    setFileData((prev) => arr);
    console.log("F");
    // dispatch(loadingEnd());
  };
  useEffect(() => {
    console.log(fileData);
    console.log("G");
    let arr = [];
    let leng = 0;
    console.log("H");
    fileData.forEach((v, i) => {
      leng += v.datas.length;
      console.log("v.datas", v.datas);
      console.log("leng", leng);
      if (v.datas.length == 0) {
        arr.push(i);
      }
    });
    console.log("I");
    let first = arr[0];
    console.log("first", first);
    if (first != undefined) {
      setFileStep(first);
    }
    setAllFileLength(leng);
  }, [fileData]);
  const deleteFile = (idx, targetStep) => {
    console.log("J");
    const dataTransfer = new DataTransfer();
    const target = document.getElementById("multipleFiles" + targetStep);
    const files = target.files;
    let fileArray = Array.from(files);
    console.log("K");
    fileArray.splice(idx, 1);
    fileArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    console.log("L");
    target.files = dataTransfer.files;
    setFileData((prev) => (prev[targetStep].datas = dataTransfer.files));
    console.log("M");
    // setFileData(dataTransfer.files);
    fileChange();
    console.log("N");
    // setFileData()
  };
  useEffect(() => {
    console.log(fileStep);
  }, [fileStep]);
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
      {/*
  const [fileNames, setFileNames] = useState([
    { name: "file0Name", datas: [] },
    { name: "file1Name", datas: [] },
    { name: "file2Name", datas: [] },
    { name: "file3Name", datas: [] },
    { name: "file4Name", datas: [] },
  ]); 
  */}
      <div className={styles.items}>
        {allFileLength}
        {fileNames.map((obj, idx) => {
          obj.datas.map((fName, fIdx) => {
            return (
              <p key={idx} className={styles.item}>
                <span>{fName}</span>
                <img
                  src={require("assets/img/global/btn/btn_close_blue.png")}
                  alt="첨부파일 제거"
                  onClick={() => {
                    deleteFile(idx, 0);
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
