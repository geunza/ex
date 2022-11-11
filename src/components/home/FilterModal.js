import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "scss/components/home/HomeModal.module.scss";
import { useSelector } from "react-redux";
const FilterModal = ({ modalOpener }) => {
  const supportInfo = useSelector((state) => state.supportInfo);
  const [step, setStep] = useState(0);
  const btnStep = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setStep(value);
  };
  const tooltipOpen = (e) => {
    e.stopPropagation();
    console.log(e.target.dataset.text);
  };

  return (
    <div className={`modalWrap ${styles.FilterModal}`}>
      <div className="modalInner">
        <ul className={styles.btnStepWrap}>
          <li>
            <button
              type="button"
              value={0}
              onClick={btnStep}
              className={styles.btnStep}
            >
              <span data-selected={step == 0 ? "selected" : null}>
                지원분야
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              value={1}
              onClick={btnStep}
              className={styles.btnStep}
            >
              <span data-selected={step == 1 ? "selected" : null}>
                기술분야
                <i onClick={tooltipOpen} data-text="Hi">
                  i
                </i>
              </span>
            </button>
          </li>
          <li>
            <button
              type="button"
              value={2}
              onClick={btnStep}
              className={styles.btnStep}
            >
              <span data-selected={step == 2 ? "selected" : null}>지역</span>
            </button>
          </li>
        </ul>
        <div className={styles.contArea}>
          {step == 0 ? (
            <div className={styles.tabCont}>
              <div className={styles.title}>
                <h5 className={styles.required}>지원분야</h5>
                <span>(중복가능)</span>
              </div>
              <ul className={styles.itemWrap}>
                <li className={styles.item}>
                  <button type="button">전체</button>
                </li>
                <li className={styles.item}>
                  <button type="button">사업화 지원</button>
                </li>
                <li className={styles.item}>
                  <button type="button">시설공간</button>
                </li>
                <li className={styles.item}>
                  <button type="button">인건비 지원</button>
                </li>
                <li className={styles.item}>
                  <button type="button">마케팅 홍보</button>
                </li>
                <li className={styles.item}>
                  <button type="button">멘토링·교육</button>
                </li>
                <li className={styles.item}>
                  <button type="button">대출·융자</button>
                </li>
                <li className={styles.item}>
                  <button type="button">R&D</button>
                </li>
                <li className={styles.item}>
                  <button type="button">행사</button>
                </li>
                <li className={styles.item}>
                  <button type="button">기타</button>
                </li>
              </ul>
            </div>
          ) : step == 1 ? (
            <div className={styles.tabCont}>
              <div className={styles.title}>
                <h5 className={styles.required}>사업분야</h5>
                <span>(중복가능)</span>
              </div>
              <ul className={styles.itemWrap}>
                <li className={styles.item}>
                  <button type="button">전체</button>
                </li>
                <li className={styles.item}>
                  <button type="button">제조</button>
                </li>
                <li className={styles.item}>
                  <button type="button">지식서비스</button>
                </li>
                <li className={styles.item}>
                  <button type="button">융합</button>
                </li>
              </ul>
              <div className={styles.title}>
                <h5 className={styles.required}>기술분야</h5>
                <span>(중복가능)</span>
              </div>
              <ul className={styles.itemWrap}>
                <li className={styles.item}>
                  <button type="button">전체</button>
                </li>
                <li className={styles.item}>
                  <button type="button">딥테크</button>
                </li>
                <li className={styles.item}>
                  <button type="button">ICT</button>
                </li>
                <li className={styles.item}>
                  <button type="button">제조/하드웨어</button>
                </li>
                <li className={styles.item}>
                  <button type="button">푸드/농업</button>
                </li>
                <li className={styles.item}>
                  <button type="button">커머스</button>
                </li>
                <li className={styles.item}>
                  <button type="button">물류/유통</button>
                </li>
                <li className={styles.item}>
                  <button type="button">헬스케어/바이오</button>
                </li>
                <li className={styles.item}>
                  <button type="button">환경/에너지</button>
                </li>
                <li className={styles.item}>
                  <button type="button">3D 프린팅</button>
                </li>
                <li className={styles.item}>
                  <button type="button">R&D</button>
                </li>
                <li className={styles.item}>
                  <button type="button">교육</button>
                </li>
                <li className={styles.item}>
                  <button type="button">홈리빙/펫</button>
                </li>
                <li className={styles.item}>
                  <button type="button">여행/레저/스포츠</button>
                </li>
                <li className={styles.item}>
                  <button type="button">금융/보험/핀테크</button>
                </li>
                <li className={styles.item}>
                  <button type="button">자동차/모빌리티/교통</button>
                </li>
                <li className={styles.item}>
                  <button type="button">통신/보안/데이터</button>
                </li>
                <li className={styles.item}>
                  <button type="button">공예/디자인</button>
                </li>
                <li className={styles.item}>
                  <button type="button">기타</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.tabCont}>
              <div className={styles.title}>
                <h5>지역선택</h5>
                <span>(중복가능)</span>
              </div>
              <ul className={styles.itemWrap}>
                <li className={styles.item}>
                  <button type="button">전국</button>
                </li>
                <li className={styles.item}>
                  <button type="button">서울</button>
                </li>
                <li className={styles.item}>
                  <button type="button">경기</button>
                </li>
                <li className={styles.item}>
                  <button type="button">인천</button>
                </li>
                <li className={styles.item}>
                  <button type="button">강원</button>
                </li>
                <li className={styles.item}>
                  <button type="button">부산</button>
                </li>
                <li className={styles.item}>
                  <button type="button">대구</button>
                </li>
                <li className={styles.item}>
                  <button type="button">대전</button>
                </li>
                <li className={styles.item}>
                  <button type="button">광주</button>
                </li>
                <li className={styles.item}>
                  <button type="button">경북</button>
                </li>
                <li className={styles.item}>
                  <button type="button">경남</button>
                </li>
                <li className={styles.item}>
                  <button type="button">충북</button>
                </li>
                <li className={styles.item}>
                  <button type="button">충남</button>
                </li>
                <li className={styles.item}>
                  <button type="button">전북</button>
                </li>
                <li className={styles.item}>
                  <button type="button">전남</button>
                </li>
                <li className={styles.item}>
                  <button type="button">울산</button>
                </li>
                <li className={styles.item}>
                  <button type="button">세종</button>
                </li>
                <li className={styles.item}>
                  <button type="button">제주</button>
                </li>
                <li className={styles.item}>
                  <button type="button">전체</button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className={styles.confirmArea}>
          <button
            type="button"
            name="Modal1"
            className={styles.btnClose}
            value={false}
            onClick={modalOpener}
          >
            닫기
          </button>
          <button type="button" className={styles.btnSubmit}>
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default FilterModal;
