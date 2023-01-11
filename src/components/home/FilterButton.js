import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "scss/components/FilterButton.module.scss";
import Tooltip from "components/Tooltip";

const FilterButton = ({ item, onClick, idx, baseObj }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const supportInfo = useSelector((state) => state.supportInfo);
  const disabled = !isLoggedIn;
  const [hasToolTip, setHasToolTip] = useState(false);
  const [hastooltipCont, setTooltipCont] = useState("");
  const [notReady, setNotReady] = useState(
    (item.ctg_cd == "prd_cd" || item.ctg_cd == "biz_type_cd") &&
      supportInfo.bizp_type_cd.datas[0].code == "02"
  );
  useEffect(() => {
    setNotReady(
      (item.ctg_cd == "prd_cd" || item.ctg_cd == "biz_type_cd") &&
        supportInfo.bizp_type_cd.datas[0].code == "02"
    );
  }, [supportInfo]);
  const tooltipOpen = (e) => {
    e.stopPropagation();
    const target = e.currentTarget.querySelector(".toolTipBox");
    target.classList.contains("active")
      ? target.classList.remove("active")
      : target.classList.add("active");
  };
  useEffect(() => {
    if (item.ctg_nm == "기술분야" && item.code_nm == "기타") {
      setHasToolTip(true);
      setTooltipCont(
        "뷰티/화장품, 패션, 예술, 광고/마케팅, 화학, 유아/출산, 부동산/건설, 소셜미디어/커뮤니티, 화학, 인사/비지니스/법률 등을 포함합니다."
      );
    }
    if (item.ctg_nm == "기술분야" && item.code_nm == "딥테크") {
      setHasToolTip(true);
      setTooltipCont(
        "AI,자율주행, 블록체인, 나노소재, 5G/6G, 스마트팜, 빅데이터 스마트홈 등을 포함하는 분야입니다."
      );
    }
  }, []);

  return (
    <button
      className={
        styles.filterBtn +
        " " +
        ((baseObj[item.ctg_cd].datas.find(
          (x) => Object.entries(x).toString() == Object.entries(item).toString()
        ) && !notReady
          ? styles.selected
          : "") +
          " " +
          (hasToolTip ? styles.tooltipBtn : ""))
      }
      onClick={(e) => {
        notReady ? alert("예비창업자는 선택할 수 없습니다.") : onClick(item, e);
      }}
      data-disabled={disabled || notReady ? "disabled" : null}
    >
      {item.code_nm}
      {hasToolTip && (
        <i className="btnToolTip" onClick={tooltipOpen}>
          <img
            src={require("assets/img/global/btn/btn_tooltip.png")}
            alt="tooltip"
          />
          <Tooltip cont={hastooltipCont} />
        </i>
      )}
    </button>
  );
};
export default FilterButton;
