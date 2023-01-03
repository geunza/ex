import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingStart, loadingEnd } from "redux/store";
const FileUpload = ({
  styles,
  file1,
  setFile1,
  file2,
  setFile2,
  file3,
  setFile3,
  file4,
  setFile4,
  file5,
  setFile5,
  allFileLength,
  setAllFileLength,
}) => {
  const dispatch = useDispatch();
  const [fileName1, setFileName1] = useState([]);
  const [fileName2, setFileName2] = useState([]);
  const [fileName3, setFileName3] = useState([]);
  const [fileName4, setFileName4] = useState([]);
  const [fileName5, setFileName5] = useState([]);
  const [fileStep, setFileStep] = useState(1);
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
      if (item.size > fileSizeLimit * 1024 * 1024) {
        alert(`최대 ${fileSizeLimit}MB의 파일만 삽입 가능합니다.`); // CHECK : 메시지 정리
        return resetFile();
      }
      if (fileStep == 1) {
        if (file2.length > 0) {
          for (let i = 0; i < file2.length; i++) {
            if (file2[i].name == item.name) {
            }
          }
        }
        if (file3.length > 0) {
          for (let i = 0; i < file3.length; i++) {
            if (file2[i].name == item.name) {
            }
          }
        }
        if (file4.length > 0) {
          for (let i = 0; i < file4.length; i++) {
            if (file2[i].name == item.name) {
            }
          }
        }
        if (file5.length > 0) {
          for (let i = 0; i < file5.length; i++) {
            if (file2[i].name == item.name) {
            }
          }
        }
      }
    });

    function resetFile() {
      target.value = "";
      if (fileStep == 1) {
        setFile1([]);
      } else if (fileStep == 2) {
        setFile2([]);
      } else if (fileStep == 3) {
        setFile3([]);
      } else if (fileStep == 4) {
        setFile4([]);
      } else if (fileStep == 5) {
        setFile5([]);
      }
      // dispatch(loadingEnd());
      return false;
    }
    // setFileData(files);
    if (fileStep == 1) {
      setFile1(files);
    } else if (fileStep == 2) {
      setFile2(files);
    } else if (fileStep == 3) {
      setFile3(files);
    } else if (fileStep == 4) {
      setFile4(files);
    } else if (fileStep == 5) {
      setFile5(files);
    }
    // dispatch(loadingEnd());
  };
  useEffect(() => {
    if (file1.length == 0) {
      setFileStep(1);
    } else if (file2.length == 0) {
      setFileStep(2);
    } else if (file3.length == 0) {
      setFileStep(3);
    } else if (file4.length == 0) {
      setFileStep(4);
    } else if (file5.length == 0) {
      setFileStep(5);
    }
    setAllFileLength(
      file1.length + file2.length + file3.length + file4.length + file5.length
    );
  }, [file1, file2, file3, file4, file5]);
  useEffect(() => {
    console.log(allFileLength);
  }, [allFileLength]);
  useEffect(() => {
    setFileName1([]);
    for (let i = 0; i < file1.length; i++) {
      setFileName1((prev) => [file1[i].name, ...prev]);
    }
    setFileName1((prev) => prev.reverse());
  }, [file1]);
  useEffect(() => {
    setFileName2([]);
    for (let i = 0; i < file2.length; i++) {
      setFileName2((prev) => [file2[i].name, ...prev]);
    }
    setFileName2((prev) => prev.reverse());
  }, [file2]);
  useEffect(() => {
    setFileName3([]);
    for (let i = 0; i < file3.length; i++) {
      setFileName3((prev) => [file3[i].name, ...prev]);
    }
    setFileName3((prev) => prev.reverse());
  }, [file3]);
  useEffect(() => {
    setFileName4([]);
    for (let i = 0; i < file4.length; i++) {
      setFileName4((prev) => [file4[i].name, ...prev]);
    }
    setFileName4((prev) => prev.reverse());
  }, [file4]);
  useEffect(() => {
    setFileName5([]);
    for (let i = 0; i < file5.length; i++) {
      setFileName5((prev) => [file5[i].name, ...prev]);
    }
    setFileName5((prev) => prev.reverse());
  }, [file5]);
  const deleteFile = (idx, targetStep) => {
    const dataTransfer = new DataTransfer();
    const target = document.getElementById("multipleFiles" + targetStep);
    console.log(target);
    const files = target.files;
    console.log(files);
    let fileArray = Array.from(files);
    fileArray.splice(idx, 1);
    fileArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    target.files = dataTransfer.files;

    if (targetStep == 1) {
      setFile1(dataTransfer.files);
    } else if (targetStep == 2) {
      setFile2(dataTransfer.files);
    } else if (targetStep == 3) {
      setFile3(dataTransfer.files);
    } else if (targetStep == 4) {
      setFile4(dataTransfer.files);
    } else if (targetStep == 5) {
      setFile5(dataTransfer.files);
    }
    // setFileData(dataTransfer.files);
    fileChange();
    // setFileData()
  };
  return (
    <>
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
      {fileStep >= 5 && (
        <label htmlFor="multipleFiles5">
          <img
            src={require("assets/img/global/btn/btn_add.png")}
            alt="첨부파일 추가"
          />
          <span>첨부파일</span>
        </label>
      )}
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
      <input
        type="file"
        id="multipleFiles5"
        accept=".hwp, .word, .ppt, .pdf, .exel, .text"
        multiple="multiple"
        onChange={fileChange}
      />
      <div className={styles.items}>
        {fileName1.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx, 1);
              }}
            />
          </p>
        ))}
        {fileName2.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx, 2);
              }}
            />
          </p>
        ))}
        {fileName3.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx, 3);
              }}
            />
          </p>
        ))}
        {fileName4.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx, 4);
              }}
            />
          </p>
        ))}
        {fileName5.map((name, idx) => (
          <p key={idx} className={styles.item}>
            <span>{name}</span>
            <img
              src={require("assets/img/global/btn/btn_close_blue.png")}
              alt="첨부파일 제거"
              onClick={() => {
                deleteFile(idx, 5);
              }}
            />
          </p>
        ))}
      </div>
    </>
  );
};
export default FileUpload;
